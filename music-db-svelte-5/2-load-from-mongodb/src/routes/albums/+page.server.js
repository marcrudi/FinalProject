import db from "$lib/db";

export async function load() {
  return {
    albums: await db.getAlbums()
  };
}
