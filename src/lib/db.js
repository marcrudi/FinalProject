// src/lib/db.js

// =======================================
// MongoDB-Verbindung und Datenzugriffsfunktionen
// für die F1-Applikation.
// =======================================

import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private"; // Liest DB_URI aus deiner .env-Datei

// --- 1) Überprüfen, ob DB_URI gesetzt ist ---
if (!DB_URI) {
  // Falls die Umgebungsvariable fehlt, beenden wir das Programm mit einer Fehlermeldung.
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
    // 2.a) Mit Atlas verbinden (erstmaliges Verbinden)
    await client.connect();

    // 2.b) Die Datenbank "Formula1" wählen.
    //      Wenn du den DB-Namen nicht in der URI angegeben hast, musst du ihn hier angeben.
    //      In deinem Fall lautet er "Formula1".
    _db = client.db("Formula1");
  }
  return _db;
}

/**
 * Helferfunktion, um eine bestimmte Collection zu holen.
 * Diese Funktion ruft getDb() auf und gibt dann db.collection(name) zurück.
 */
export async function getCollection(name) {
  const database = await getDb();
  return database.collection(name);
}

// =======================================
// 3) Zugriffsfunktionen für die Collections
//    (drivers, constructors, races, results)
// =======================================

/**
 * Gibt alle Fahrer-Dokumente zurück, sortiert nach Nachname.
 */
export async function getDrivers() {
  const coll = await getCollection("drivers");
  // Wir sortieren alphabetisch nach dem Feld "lastName"
  return coll.find().sort({ lastName: 1 }).toArray();
}

/**
 * Gibt einen einzelnen Fahrer anhand der ObjectId zurück.
 *
 * @param {string} id - Die _id des Fahrers als String (ObjectId-String).
 * @returns {Promise<Object | null>}
 */
export async function getDriverById(id) {
  const coll = await getCollection("drivers");
  // new ObjectId(id) konvertiert den String in ein MongoDB ObjectId-Objekt
  return coll.findOne({ _id: new ObjectId(id) });
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
 * Gibt einen einzelnen Konstrukteur anhand der ObjectId zurück.
 *
 * @param {string} id - Die _id des Konstrukteurs als String (ObjectId-String).
 * @returns {Promise<Object | null>}
 */
export async function getConstructorById(id) {
  const coll = await getCollection("constructors");
  return coll.findOne({ _id: new ObjectId(id) });
}

/**
 * Gibt alle Rennen zurück, sortiert nach Saison (absteigend) und Runde (aufsteigend).
 *
 * @returns {Promise<Array>}
 */
export async function getRaces() {
  const coll = await getCollection("races");
  // Saison absteigend (neueste zuerst), dann Runde aufsteigend
  return coll.find().sort({ season: -1, round: 1 }).toArray();
}

/**
 * Gibt ein einzelnes Rennen anhand der ObjectId zurück.
 *
 * @param {string} id - Die _id des Rennens als String (ObjectId-String).
 * @returns {Promise<Object | null>}
 */
export async function getRaceById(id) {
  const coll = await getCollection("races");
  return coll.findOne({ _id: new ObjectId(id) });
}

/**
 * Holt alle Rennergebnisse (results) für ein bestimmtes Rennen.
 * Verwendet Aggregation, um driverInfo und constructorInfo per $lookup einzubinden.
 *
 * @param {string} raceId - Die _id des Rennens als String (ObjectId-String).
 * @returns {Promise<Array>}
 */
export async function getResultsByRace(raceId) {
  const coll = await getCollection("results");
  return coll
    .aggregate([
      // 1) Nur Ergebnisse, deren raceId mit dem gesuchten Rennen übereinstimmt
      { $match: { raceId: new ObjectId(raceId) } },
      // 2) Lookup: Fahrer-Daten aus "drivers" einbinden
      {
        $lookup: {
          from: "drivers",            // Collection-Name
          localField: "driverId",     // Foreign key im results-Dokument
          foreignField: "_id",        // Primary key in drivers
          as: "driverInfo"            // Neu erzeugtes Feld im Output
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
 * Berechnet die Driver Championship Standings:
 * Groupiert nach driverId, summiert alle Punkte, und bindet Fahrer-Details ein.
 *
 * @returns {Promise<Array>} - Jedes Objekt enthält driverId, code, name, nationality, totalPoints
 */
export async function getDriverStandings() {
  const coll = await getCollection("results");
  return coll
    .aggregate([
      // 1) Gruppieren nach driverId und Punkte aufsummieren
      {
        $group: {
          _id: "$driverId",
          totalPoints: { $sum: "$points" }
        }
      },
      // 2) Fahrer-Daten per Lookup einbinden
      {
        $lookup: {
          from: "drivers",
          localField: "_id",   // driverId aus dem Group-Step
          foreignField: "_id",
          as: "driverInfo"
        }
      },
      { $unwind: "$driverInfo" },
      // 3) Projektion auf das endgültige Format
      {
        $project: {
          _id: 0,
          driverId: "$_id",
          code: "$driverInfo.code",
          name: { $concat: ["$driverInfo.firstName", " ", "$driverInfo.lastName"] },
          nationality: "$driverInfo.nationality",
          totalPoints: 1
        }
      },
      // 4) Sortierung nach totalPoints absteigend
      { $sort: { totalPoints: -1 } }
    ])
    .toArray();
}

/**
 * Berechnet die Constructor Championship Standings:
 * Groupiert nach constructorId, summiert alle Punkte, und bindet Konstrukteur-Details ein.
 *
 * @returns {Promise<Array>} - Jedes Objekt enthält constructorId, name, nationality, totalPoints
 */
export async function getConstructorStandings() {
  const coll = await getCollection("results");
  return coll
    .aggregate([
      // 1) Gruppieren nach constructorId und Punkte aufsummieren
      {
        $group: {
          _id: "$constructorId",
          totalPoints: { $sum: "$points" }
        }
      },
      // 2) Konstrukteur-Daten per Lookup einbinden
      {
        $lookup: {
          from: "constructors",
          localField: "_id",   // constructorId aus dem Group-Step
          foreignField: "_id",
          as: "constructorInfo"
        }
      },
      { $unwind: "$constructorInfo" },
      // 3) Projektion auf das endgültige Format
      {
        $project: {
          _id: 0,
          constructorId: "$_id",
          name: "$constructorInfo.name",
          nationality: "$constructorInfo.nationality",
          totalPoints: 1
        }
      },
      // 4) Sortierung nach totalPoints absteigend
      { $sort: { totalPoints: -1 } }
    ])
    .toArray();
}

// =======================================
// 4) Exportiere ObjectId, falls du IDs konvertieren möchtest.
//    In anderen Teilen deines Codes kannst du damit neue ObjectIds erzeugen.
// =======================================
export { ObjectId };
