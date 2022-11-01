const ClientError = require('../../exceptions/ClientError');
const autoBind = require('auto-bind');
const { NotificationResponseMessage } = require('pg-protocol/dist/messages');


class AlbumsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;


        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
        this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
        this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);

    }

    async postAlbumHandler(request, h) {
        try {
            this._validator.validateAlbumPayload(request.payload);
            const { name ='untitled', year } = request.payload;

            const albumId = await this._service.addAlbum({ name, year });

            const response = h.response({
                status: 'success',
                message: 'Album berhasil ditambahkan',
                data: {
                    albumId,
            },
            });
            response.code(201);
            console.log(response);
            return response;
        } catch(error) {
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
                message: 'Maaf, sedang terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            console.log(response)
            return response;
        }
    }

    // async getAlbumsHandler(){
    //     const albums = await this._service.getAlbums();
    //     return{
    //         status: 'success',
    //         data: {
    //             albums,
    //         }
    //     }
    // }

    async getAlbumByIdHandler(request, h) {
        try {
          const { id } = request.params;
          const album = await this._service.getAlbumById(id);
          return {
            status: 'success',
            data: {
              album,
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

    // async getAlbumByIdHandler(request, h) {
    //   try {
    //     const {id} = request.params;
    //     const album = await this._service.getAlbumsById(id);
    //     const songs = await this._service.getSongsInAlbum(id);
    //     const getDetailAlbumWichContainsSongs = {...album, songs};
    //     return {
    //       status: 'success',
    //       data: {
    //         album: getDetailAlbumWichContainsSongs,
    //       },
    //     };
    //   } catch (error) {
    //     if (error instanceof ClientError) {
    //       const response = h.response({
    //         status: 'fail',
    //         message: error.message,
    //       });
    //       response.code(error.statusCode);
    //       return response;
    //     }
  
    //     // Server ERROR!
    //     const response = h.response({
    //       status: 'error',
    //       message: 'Maaf, terjadi kegagalan pada server kami.',
    //     });
    //     response.code(500);
    //     console.error(error);
    //     return response;
    //   }
    // }
    
      async putAlbumByIdHandler(request, h) {
        try {
          this._validator.validateAlbumPayload(request.payload);
          const { id } = request.params;
          await this._service.editAlbumById(id, request.payload);
          return {
            status: 'success',
            message: 'Album berhasil diperbarui',
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
    
      async deleteAlbumByIdHandler(request, h) {
        try {
          const { id } = request.params;
          await this._service.deleteAlbumById(id);
          return {
            status: 'success',
            message: 'Album berhasil dihapus',
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


module.exports = AlbumsHandler;





