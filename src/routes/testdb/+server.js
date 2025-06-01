// src/routes/testdb/+server.js
import { json } from "@sveltejs/kit";
import { getDrivers } from "$lib/db.js";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
  // Ruft kurz die ersten 5 Fahrer aus MongoDB ab
  const drivers = await getDrivers();
  return json({ firstFiveDrivers: drivers.slice(0, 5) });
}
