const ClientError = require('../../exceptions/ClientError');
const autoBind= require('auto-bind');
// const { Client } = require('pg');


class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;


        // haruse bind satu persatu handlernya
        autoBind(this);
    }

    async postSongHandler(request, h) {
        try {
          this._validator.validateSongPayload(request.payload);
          const { title, year, performer, genre, duration = null, albumId = null } = request.payload;
          const songId = await this._service.addSong({
            title,
            year,
            performer,
            genre,
            duration,
            albumId,
          });
    
          const response = h.response({
            status: 'success',
            message: 'Song berhasil ditambahkan',
            data: {
              songId,
            },
          });
          response.code(201);
          return response;
        } catch (error) {
          if (error instanceof ClientError) {
            const response = h.response({
              status: 'fail',
              message: error.message,
            });
            response.code(error.statusCode);
            return response;
          }
          // server Error
          const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
          });
          response.code(500);
          console.error(error);
          return response;
        }
      }
    
      // async getSongsHandler(request) {
      //   /**
        
      //   **/
      //    try {
      //       const {title, performer} = request.query;
      //       const songs = await this._service.getSongs(title, performer);
      //       return {
      //         status: 'success',
      //         data: {
      //           songs,
      //         },
      //       };
      //     } catch (error) {
      //       if (error instanceof ClientError) {
      //         const response = h.response({
      //           status: 'fail',
      //           message: error.message,
      //         });
      //         response.code(error.statusCode);
      //         return response;
      //       }
      
      //       // Server ERROR!
      //       const response = h.response({
      //         status: 'error',
      //         message: 'Maaf, terjadi kegagalan pada server kami.',
      //       });
      //       response.code(500);
      //       console.error(error);
      //       return response;
      //     }
      // }


      async getSongsHandler(request, h) {
        try {
          const songs = await this._service.getSongs();
          return {
            status: 'success',
            data: {
              songs,
            },
          };
        } catch (error) {
          if (error instanceof ClientError) {
            const response = h.response({
              status: 'fail',
              message: error.message,
            });
            response.code(error.statusCode);
            return response;
          }
          // Server ERROR!
          const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
          });
          response.code(500);
          console.error(error);
          return response;
        }
      }
    
      async getSongByIdHandler(request, h) {
        try {
          const { id } = request.params;
          const song = await this._service.getSongById(id);
          return {
            status: 'success',
            data: {
              song,
            },
          };
        } catch (error) {
          if (error instanceof ClientError) {
            const response = h.response({
              status: 'fail',
              message: error.message,
            });
            response.code(error.statusCode);
            return response;
          }
          // Server ERROR!
          const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
          });
          response.code(500);
          console.error(error);
          return response;
        }
      }
    
      async editSongByIdHandler(request, h) {
        try {
          this._validator.validateSongPayload(request.payload);
          const { title, year, genre, performer, duration, albumId } = request.payload;
          const { id } = request.params;
          await this._service.editSongById(id, { title, year, genre, performer, duration, albumId });
          return {
            status: 'success',
            message: 'Song berhasil diperbarui',
          };
        } catch (error) {
          if (error instanceof ClientError) {
            const response = h.response({
              status: 'fail',
              message: error.message,
            });
            response.code(error.statusCode);
            return response;
          }
          const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
          });
          response.code(500);
          console.error(error);
          return response;
        }
      }
    
      async deleteSongByIdHandler(request, h) {
        try {
          const { id } = request.params;
          await this._service.deleteSongById(id);
          return {
            status: 'success',
            message: 'Lagu Berhasil dihapus',
          };
        } catch (error) {
          if (error instanceof ClientError) {
            const response = h.response({
              status: 'fail',
              message: error.message,
            });
            response.code(error.statusCode);
            return response;
          }
          // server error
          const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
          });
          response.code(500);
          console.error(error);
          return response;
        }
      }



}




module.exports = SongsHandler;