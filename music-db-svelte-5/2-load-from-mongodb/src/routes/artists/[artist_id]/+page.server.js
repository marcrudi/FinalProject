import db from "$lib/db.js";

export async function load({ params }) {
  return {
    artist: await db.getArtist(params.artist_id),
  };
}
