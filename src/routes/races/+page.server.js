// src/routes/races/+page.server.js

import { getRaces } from "$lib/db.js"; 
// Diese Funktion holt alle Rennen aus der MongoDB-Collection "races".

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  // 1) Alle Rennen aus der DB abrufen (sortiert nach Datum, neueste zuerst)
  const races = await getRaces();

  // 2) Das Array "races" dem +page.svelte unter "data.races" zur Verfügung stellen
  return { races };
}
