import pg from 'pg';

export class FotoModel {

  static async getCount() {
    const connection = new pg.Client(process.env.DATABASE_HOST);
    try {
      await connection.connect();
        // SELECT reltuples::bigint AS total_filas FROM pg_class WHERE relname = 'nombre_tabla';
      const count = await connection.query('SELECT COUNT(*) AS total_filas FROM fotosdb;');
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
      const foto = await connection.query('SELECT * FROM fotosdb WHERE id = ($1);', [id] );
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
      const fotos = await connection.query('SELECT * FROM fotosdb');
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
    const { foto } = input;
    try {
      await connection.connect();
      const newFoto = await connection.query(`INSERT INTO fotosdb (foto) VALUES ($1)`, [foto]);
      return newFoto;
    } catch (err) {
      console.error("Error");
    } finally {
      await connection.end();
    }
  }

  static async deleteById (id) {
    const connection = new pg.Client(process.env.DATABASE_HOST);
    try {
      await connection.connect();
      const success = await connection.query(`DELETE FROM fotosdb WHERE id=($1);`, [id]);
      return success;
    } catch (err) {
      console.error('Error');
    } finally {
      await connection.end();
    }
  }

  static async deleteAll () {
    const connection = new pg.Client(process.env.DATABASE_HOST);
    try {
      await connection.connect();
      const success = await connection.query(`DELETE FROM fotosdb;`);
      return success;
    } catch (err) {
      console.error('Error');
    } finally {
      await connection.end();
    }
  }
}