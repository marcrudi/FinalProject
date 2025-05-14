import db from '$lib/db.js';

export const actions = {
    create: async ({request}) => {
        const data = await request.formData();
        //console.log(data);
        let artist = {
            name: data.get("name"),
            origin: data.get("origin"),
        }
        await db.createArtist(artist);
        return { success: true }
    }
}