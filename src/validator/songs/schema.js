const Joi = require('joi');

// masih ragu ragu salah , karena belum bisa tipe propsnya di dicoding
// karena kutoaa ku habis & wifi kos kosan gak bisa dipake 

const SongPayloadSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number(),
    albumId: Joi.string(),
    
})


module.exports= { SongPayloadSchema };
// title,year, genre, performer, duration, albumId


