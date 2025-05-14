export function load({params}) {
    return {
        artist: {
            _id: params.artist_id,
            name: "-",
            origin: "-",
        },
    };
}