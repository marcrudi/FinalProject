import db from "$lib/db";

export async function load() {
  return {
    artists: await db.getArtists(),
  }
}
