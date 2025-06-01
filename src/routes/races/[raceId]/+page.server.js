// src/routes/races/[raceId]/+page.server.js
import { error } from "@sveltejs/kit";
import { getRaceById, getResultsByRace } from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { raceId } = params;

  // 1) Hole Metadaten zum Rennen
  const race = await getRaceById(raceId);
  if (!race) {
    throw error(404, "Rennen nicht gefunden");
  }

  // 2) Hole alle Rennergebnisse (mit Fahrer- und Team-Infos) aus MongoDB
  let results = await getResultsByRace(raceId);

  // 3) Sortiere JavaScript-seitig so, dass 'position == null' (DNF) ans Ende kommt,
  //    und alle anderen nach aufsteigender Position:
  results.sort((a, b) => {
    // a.position == null, b.position != null → a soll nach b (return +1)
    if (a.position === null && b.position !== null) return 1;
    // a.position != null, b.position == null → a soll vor b (return -1)
    if (a.position !== null && b.position === null) return -1;
    // beide haben entweder eine Zahl oder beides null → positionen vergleichen (null-null → 0)
    return (a.position ?? Infinity) - (b.position ?? Infinity);
  });

  // 4) Gib race + sortierte results ans Template zurück
  return {
    race,
    results,
  };
}
