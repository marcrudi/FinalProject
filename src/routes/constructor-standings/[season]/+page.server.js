// src/routes/constructor-standings/[season]/+page.server.js

import { error } from "@sveltejs/kit";
import { getConstructorStandingsBySeason } from "$lib/db.js"; 

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  // Saison aus URL in Zahl umwandeln
  const season = Number(params.season);
  if (isNaN(season)) {
    throw error(400, "Ungültige Saison: bitte eine Jahreszahl verwenden.");
  }

  // Constructor-Standings dieser Saison abrufen
  const constructorStandings = await getConstructorStandingsBySeason(season);

  return {
    season,
    constructorStandings
  };
}
