// src/routes/driver-standings/[season]/+page.server.js

import { error } from "@sveltejs/kit";
import { getDriverStandingsBySeason } from "$lib/db.js"; 

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  // Saison-Parameter aus der URL holen und prüfen (z.B. "2023")
  const season = Number(params.season);
  if (isNaN(season)) {
    throw error(400, "Ungültige Saison: bitte eine Jahreszahl verwenden.");
  }

  // Fahrer-Standings dieser Saison abrufen
  const driverStandings = await getDriverStandingsBySeason(season);

  return {
    season,
    driverStandings
  };
}
