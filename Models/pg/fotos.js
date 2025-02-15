import pg from 'pg';

export class FotoModel {

  static async getCount() {
    const connection = new pg.Client(process.env.DATABASE_HOST);
    console.log('a contar');
    
    try {
      await connection.connect();
        // SELECT reltuples::bigint AS total_filas FROM pg_class WHERE relname = 'nombre_tabla';
      const count = await connection.query('SELECT COUNT(*) AS total_filas FROM fotos;');
      return count.rows;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;  // Re-throw the error to be handled by the controller
    } finally {
      await connection.end();
    }
  }

  static async getById(id) {
    const connection = new pg.Client(process.env.DATABASE_HOST);
    try {
      await connection.connect();
      const foto = await connection.query('SELECT * FROM fotos WHERE id = ($1);', [id] );
      return foto.rows;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;  // Re-throw the error to be handled by the controller
    } finally {
      await connection.end();
    }
  }

  static async getAll() {
    const connection = new pg.Client(process.env.DATABASE_HOST);
    try {
      await connection.connect();
      const fotos = await connection.query('SELECT * FROM fotos');
      return fotos.rows;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;  // Re-throw the error to be handled by the controller
    } finally {
      await connection.end();
    }
  }


  static async create (input) {
    const connection = new pg.Client(process.env.DATABASE_HOST);
    const { usuario, foto , mensaje } = input;
    
    try {
      await connection.connect();
      const newFoto = await connection.query(
        `INSERT INTO fotos (usuario, foto, mensaje) VALUES ($1, $2, $3) RETURNING *`,
        [usuario, foto, mensaje]
      );
      return newFoto.rows[0];
    } catch (err) {
      console.error("Error creating foto", err);
      throw err;
    } finally {
      await connection.end();
    }
  }

  static async deleteById (id) {
    const connection = new pg.Client(process.env.DATABASE_HOST);
    try {
      await connection.connect();
      const result = await connection.query(`DELETE FROM fotos WHERE id=$1 RETURNING *`, [id]);
      return result.rowCount > 0;
    } catch (err) {
      console.error('Error deleting foto', err);
      throw err;
    } finally {
      await connection.end();
    }
  }

  static async deleteAll () {
    const connection = new pg.Client(process.env.DATABASE_HOST);
    try {
      await connection.connect();
      const success = await connection.query(`DELETE FROM fotos;`);
      return success;
    } catch (err) {
      console.error('Error deleting all fotos', err);
      throw err;
    } finally {
      await connection.end();
    }
  }

  static async getLast() {
    const connection = new pg.Client(process.env.DATABASE_HOST);

    try {
      await connection.connect();
      const result = await connection.query(`SELECT * FROM fotos ORDER BY id DESC LIMIT 1`);
      return result.rows[0];
    } catch (err) {
      console.error('Error getting last foto', err);
      throw err;
    } finally {
      await connection.end();
    }
  }
}