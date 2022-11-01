const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModel } = require('../../utils');

class SongsService {
    constructor() {
        this._pool = new Pool();
    }
    

    async addSong({ title, year, performer, genre, duration, albumId }) {
        const id = `song-${nanoid(16)}`;
    
        const query = {
          text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
          values: [id, title, year, performer, genre, duration, albumId],
        };
    
        const result = await this._pool.query(query);
    
        if (!result.rows[0].id) {
          throw new InvariantError('Lagu gagal ditambahkan');
        }
    
        return result.rows[0].id;
      }


      async getSongs() {
        const resultSong = await this._pool.query('SELECT id, title, performer FROM songs');
        return resultSong.rows;
      }
      
    
      // async getSongs({ title, performer }) {
      //   // let filteredSongs = await this._pool.query('SELECT id, title, performer FROM songs');
    
      //   // if (title !== undefined) {
      //   //   const query = {
      //   //     text: 'SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE $1',
      //   //     values: [`%${title}%`],
      //   //   };
      //   //   filteredSongs = await this._pool.query(query);
      //   // }
    
      //   // if (performer !== undefined) {
      //   //   filteredSongs = await this._pool.query(`SELECT id, title, performer FROM songs WHERE LOWER(performer) LIKE '%${performer}%'`);
      //   // }
    
      //   // return filteredSongs.rows.map(mapDBToModel);

      //   //solusi 2
      //   // if (title && performer) {
      //   //     const result = await this._pool.query(
      //   //         `SELECT id, title, performer FROM songs WHERE lower(title) LIKE '%${title}%' AND lower(performer) LIKE '%${performer}%'`
      //   //     );
      //   //     return result.rows;

      //   // }
      //   // if (title || performer) {
      //   //     const result = await this._pool.query(
      //   //         `SELECT id, title, performer FROM songs WHERE lower(title) LIKE '%${title}%' OR lower(performer) LIKE '%${performer}%'`
      //   //     )
      //   //     // return result.rows.map(mapDBToModel);
      //   //     return result.rows;
      //   // } else {
      //   //     const resultSong = await this._pool.query('SELECT id, title, performer FROM songs');
      //   //         return resultSong.rows;
      //   //   }

      //   // solusi 3

      //   // const resultSong = await this._pool.query('SELECT id, title, performer FROM songs');
      //   //     return resultSong.rows.map(mapDBToModel);

      //   //4
      //   let filteredSongs = await this._pool.query('SELECT id, title, performer FROM songs');

      //   if (title !== undefined) {
      //   const query = {
      //       text: 'SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE $1',
      //       values: [`%${title}%`],
      //   };
      //   filteredSongs = await this._pool.query(query);
      //   }

      //   if (performer !== undefined) {
      //   filteredSongs = await this._pool.query(`SELECT id, title, performer FROM songs WHERE LOWER(performer) LIKE '%${performer}%'`);
      //   }

      //   return filteredSongs.rows.map(mapDBToModel); 
      // }
    
      async getSongById(id) {
        const query = {
          text: 'SELECT * FROM songs WHERE id = $1',
          values: [id],
        };
        const resultSong = await this._pool.query(query);
    
        if (!resultSong.rows.length) {
          throw new NotFoundError('Lagu tidak ditemukan');
        }
    
        return resultSong.rows.map(mapDBToModel)[0];
      }
    
      async editSongById(id, { title, year, genre, performer, duration, albumId }) {
        const query = {
          text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id ',
          values: [title, year, genre, performer, duration, albumId, id],
        };
        const resultSong = await this._pool.query(query);
        if (!resultSong.rows.length) {
          throw new NotFoundError('Gagal Memperbarui lagu');
        }
      }
    
      async deleteSongById(id) {
        const query = {
          text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
          values: [id],
        };
        const resultSong = await this._pool.query(query);
    
        if (!resultSong.rows.length) {
          throw new NotFoundError('Lagu gagal dihapus,id tidak ditemukan');
        }
      }
}

module.exports = SongsService;


