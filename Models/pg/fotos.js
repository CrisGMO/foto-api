import pg from 'pg';

export class FotoModel {

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