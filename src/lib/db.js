// src/lib/db.js

// =======================================
// MongoDB-Verbindung und Datenzugriffsfunktionen
// für die F1-Applikation (mit numerischen IDs).
// =======================================

import { MongoClient } from "mongodb";
import { DB_URI } from "$env/static/private"; // Liest DB_URI aus deiner .env-Datei

// --- 1) Überprüfen, ob DB_URI gesetzt ist ---
if (!DB_URI) {
  throw new Error("Umgebungsvariable DB_URI ist nicht gesetzt! Bitte in .env definieren.");
}

// --- 2) MongoClient erzeugen ---
// Der MongoClient wird mit der URI initialisiert, die auf deinen Atlas-Cluster verweist.
// Achte darauf, dass deine URI am Ende den Datenbanknamen enthält (z. B. "...mongodb.net/Formula1?...").
const client = new MongoClient(DB_URI);

let _db; // Zwischenspeicher für die Datenbank-Instanz

/**
 * Stellt sicher, dass die Verbindung zur Datenbank nur einmal aufgebaut wird.
 * Wenn noch keine Verbindung besteht, wird client.connect() aufgerufen
 * und die _db-Variable mit dem Datenbank-Handle initialisiert.
 *
 * @returns {Promise<import('mongodb').Db>}
 */
export async function getDb() {
  if (!_db) {
    await client.connect();
    // Die Datenbank "Formula1" wählen. Ersetze durch deinen tatsächlichen DB-Namen in Atlas.
    _db = client.db("Formula1");
  }
  return _db;
}

/**
 * Helferfunktion, um eine bestimmte Collection zu holen.
 * Diese Funktion ruft getDb() auf und gibt dann db.collection(name) zurück.
 *
 * @param {string} name - Name der Collection (z.B. "drivers", "races" etc.)
 * @returns {Promise<import('mongodb').Collection>}
 */
export async function getCollection(name) {
  const database = await getDb();
  return database.collection(name);
}

// =======================================
// 3) Zugriffsfunktionen für die Collections
//    (drivers, constructors, races, results)
//    Dabei verwenden wir immer numerische IDs (Number).
// =======================================

/**
 * Gibt alle Fahrer-Dokumente zurück, sortiert nach Nachname.
 *
 * @returns {Promise<Array>}
 */
export async function getDrivers() {
  const coll = await getCollection("drivers");
  // Wir gehen davon aus, dass die Fahrer-Dokumente ein numerisches _id-Feld haben.
  return coll.find().sort({ lastName: 1 }).toArray();
}


/**
 * Gibt alle Konstrukteurs-Dokumente zurück, sortiert nach Name.
 *
 * @returns {Promise<Array>}
 */
export async function getConstructors() {
  const coll = await getCollection("constructors");
  return coll.find().sort({ name: 1 }).toArray();
}


/**
 * Gibt alle Rennen zurück, sortiert nach Datum (absteigend: neueste zuerst).
 *
 * @returns {Promise<Array>}
 */
export async function getRaces() {
  const coll = await getCollection("races");
  // Sortierung nach Feld "date". Wir setzen -1, um die jüngsten Daten zuerst zu holen.
  return coll.find().sort({ date: -1 }).toArray();
}

/**
 * Gibt ein einzelnes Rennen anhand einer numerischen ID zurück.
 *
 * @param {string} idString - Die _id des Rennens als String (z.B. "1098").
 * @returns {Promise<Object | null>}
 */
export async function getRaceById(idString) {
  const coll = await getCollection("races");
  const idNum = Number(idString);
  return coll.findOne({ _id: idNum });
}

/**
 * Holt alle Rennergebnisse (results) für ein bestimmtes Rennen.
 * Verwendet Aggregation, um driverInfo und constructorInfo per $lookup einzubinden.
 * Dabei filtern wir nach numerischem raceId.
 *
 * @param {string} raceIdString - Die _id des Rennens als String (z.B. "1098").
 * @returns {Promise<Array>}
 */
export async function getResultsByRace(raceIdString) {
  const coll = await getCollection("results");
  const raceIdNum = Number(raceIdString);

  return coll
    .aggregate([
      // 1) Nur Ergebnisse, deren raceId mit dem gesuchten numerischen Wert übereinstimmt
      { $match: { raceId: raceIdNum } },
      // 2) Lookup: Fahrer-Daten aus "drivers" einbinden
      {
        $lookup: {
          from: "drivers",            // Collection-Name
          localField: "driverId",     // Numeric-Foreign key im results-Dokument
          foreignField: "_id",        // Numeric-Primary key in drivers
          as: "driverInfo"
        }
      },
      { $unwind: "$driverInfo" },    // Aus dem Array driverInfo ein Objekt machen
      // 3) Lookup: Konstrukteur-Daten aus "constructors" einbinden
      {
        $lookup: {
          from: "constructors",
          localField: "constructorId",
          foreignField: "_id",
          as: "constructorInfo"
        }
      },
      { $unwind: "$constructorInfo" },
      // 4) Sortierung nach Renn-Position
      { $sort: { position: 1 } }
    ])
    .toArray();
}

/**
 * Gibt eine sortierte Liste aller verfügbaren Saisons zurück,
 * basierend auf dem "season"-Feld in der "races"-Collection.
 * Rückgabe: z.B. [2023, 2022, 2021, …]
 */
export async function getSeasons() {
  const collRaces = await getCollection("races");
  // distinct("season") liefert ein Array aller Werte von "season"
  const seasons = await collRaces.distinct("season");
  // Sortiere absteigend (neueste Saison zuerst)
  return seasons.sort((a, b) => b - a);
}

export async function getDriverStandingsBySeason(season) {
  const collResults = await getCollection("results");
  return collResults
    .aggregate([
      { $lookup: { from: "races", localField: "raceId", foreignField: "_id", as: "race" } },
      { $unwind: "$race" },
      { $match: { "race.season": season } },
      { $group: { _id: { driverId: "$driverId" }, totalPoints: { $sum: "$points" } } },
      { $lookup: { from: "drivers", localField: "_id.driverId", foreignField: "_id", as: "driverInfo" } },
      { $unwind: "$driverInfo" },
      { $project: {
          _id: 0,
          driverId:    "$_id.driverId",
          code:        "$driverInfo.code",
          name:        { $concat: ["$driverInfo.firstName", " ", "$driverInfo.lastName"] },
          nationality: "$driverInfo.nationality",
          totalPoints: 1
        }
      },
      { $sort: { totalPoints: -1 } }
    ])
    .toArray();
}

export async function getConstructorStandingsBySeason(season) {
  const collResults = await getCollection("results");
  return collResults
    .aggregate([
      { $lookup: { from: "races", localField: "raceId", foreignField: "_id", as: "race" } },
      { $unwind: "$race" },
      { $match: { "race.season": season } },
      { $group: { _id: { constructorId: "$constructorId" }, totalPoints: { $sum: "$points" } } },
      { $lookup: { from: "constructors", localField: "_id.constructorId", foreignField: "_id", as: "constructorInfo" } },
      { $unwind: "$constructorInfo" },
      { $project: {
          _id: 0,
          constructorId: "$_id.constructorId",
          name:          "$constructorInfo.name",
          nationality:   "$constructorInfo.nationality",
          totalPoints:   1
        }
      },
      { $sort: { totalPoints: -1 } }
    ])
    .toArray();
}

/**
* Erstellt ein neues Rennen in der Collection "races".
 * Weist automatisch eine neue _id zu (nächst­größter numerischer Wert).
 *
 * @param {Object} raceData
 *   Muss folgende Felder enthalten:
 *   { season: number,
 *     round: number,
 *     name: string,
 *     date: string,              // z.B. "2025-07-12"
 *     circuit: {
 *       name: string,
 *       location: string,
 *       country: string
 *     }
 *   }
 * @returns {Promise<Object>} das eingefügte Renn-Objekt inkl. _id
 */

export async function createRace(raceData) {
  // 1) Collection-Handle holen
  const coll = await getCollection("races");

  // 2) Ermitteln der bisher höchsten _id, um eine neue Nummer zu vergeben
  const lastRace = await coll.find().sort({ _id: -1 }).limit(1).toArray();
  let nextId = 1;
  if (lastRace.length > 0) {
    nextId = lastRace[0]._id + 1;
  }

  // 3) Neues Rennen zusammenbauen und automatisch _id setzen
  const newRace = {
    _id: nextId,
    season: raceData.season,
    round: raceData.round,
    name: raceData.name,
    date: raceData.date,
    circuit: {
      name:            raceData.circuit.name,
      location:        raceData.circuit.location,
      country:         raceData.circuit.country
    }
  };

  // 4) Einfügen in die DB
  await coll.insertOne(newRace);
  return newRace;
}