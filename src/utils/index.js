/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */

const mapDBToModel = ({ id, title, year, performer, genre, duration, album_id }) => ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    albumId: album_id,
  });
  
  module.exports = { mapDBToModel };
