/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable('songs', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: 'true',
      },
      title: {
        type: 'TEXT',
        notNull: true,
      },
      year: {
        type: 'INT',
        notNull: true,
      },
      performer: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      genre: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      duration: {
        type: 'INT',
      },
      album_id: {
        type: 'TEXT',
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('songs');
  };
