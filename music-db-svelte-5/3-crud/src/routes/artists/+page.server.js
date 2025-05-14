import db from "$lib/db";

export async function load() {
  return {
    artists: await db.getArtists(),
  }
}

export const actions = {
    delete: async ({request}) => {
        const data = await request.formData();
        // console.log(data);
        await db.deleteArtist(data.get("id"));
    }
}