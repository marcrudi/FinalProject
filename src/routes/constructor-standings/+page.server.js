// src/routes/constructor-standings/+page.server.js

import { getSeasons } from "$lib/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  // 1) Hol Dir wieder alle möglichen Saisons
  const seasons = await getSeasons();

  // 2) Übergib sie an das Template
  return { seasons };
}
