const pool = require('../config/database');

class Promo {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Promo WHERE activo = 1 ORDER BY nombre'
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Promo WHERE id_promo = ? AND activo = 1',
        [id]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async create(nombre, precio) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO Promo (nombre, precio, activo) VALUES (?, ?, 1)',
        [nombre, precio]
      );
      return { id_promo: result.insertId, nombre, precio, activo: 1 };
    } finally {
      connection.release();
    }
  }

  static async update(id, nombre, precio) {
    const connection = await pool.getConnection();
    try {
      await connection.query(
        'UPDATE Promo SET nombre = ?, precio = ? WHERE id_promo = ?',
        [nombre, precio, id]
      );
      return await this.getById(id);
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      await connection.query(
        'UPDATE Promo SET activo = 0 WHERE id_promo = ?',
        [id]
      );
      return { message: 'Promoción desactivada' };
    } finally {
      connection.release();
    }
  }
}

module.exports = Promo;
