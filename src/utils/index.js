const mapDBToModelAlbums = ({
    id,
    name,
    year,
    created_at,
    updated_at,
}) => ({
    id,
    name,
    year,
    createdAt: created_at,
    updateAt: updated_at,
})

const mapDBToModelSongs = ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
    created_at,
    updated_at,
}) => ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
    createdAt: created_at,
    updateAt: updated_at,
})


module.exports = { mapDBToModelAlbums, mapDBToModelSongs };
