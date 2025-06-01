// src/routes/driver-standings/+page.server.js

import { getSeasons } from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  // 1) Hole alle verfügbaren Saisons (Array von Zahlen, z.B. [2023,2022,…])
  const seasons = await getSeasons();

  // 2) Übergib die Liste an +page.svelte
  return { seasons };
}
