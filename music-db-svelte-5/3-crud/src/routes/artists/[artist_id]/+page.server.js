import db from "$lib/db.js";

export async function load({ params }) {
  return {
    artist: await db.getArtist(params.artist_id),
  };
}

export const actions = {
  update: async ({ request }) => {
    const data = await request.formData();
    //console.log(data);
    let artist = {
      _id: data.get("_id"),
      name: data.get("name"),
      origin: data.get("origin"),
    };
    await db.updateArtist(artist);
    return { success: true };
  },
};
