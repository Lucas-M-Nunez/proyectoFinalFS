const pool = require('../config/database');

class Producto {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Producto WHERE activo = 1 ORDER BY nombre'
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
        'SELECT * FROM Producto WHERE id_producto = ? AND activo = 1',
        [id]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async create(nombre, descripcion, precio) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO Producto (nombre, descripcion, precio, activo) VALUES (?, ?, ?, 1)',
        [nombre, descripcion, precio]
      );
      return { id_producto: result.insertId, nombre, descripcion, precio, activo: 1 };
    } finally {
      connection.release();
    }
  }

  static async update(id, nombre, descripcion, precio) {
    const connection = await pool.getConnection();
    try {
      await connection.query(
        'UPDATE Producto SET nombre = ?, descripcion = ?, precio = ? WHERE id_producto = ?',
        [nombre, descripcion, precio, id]
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
        'UPDATE Producto SET activo = 0 WHERE id_producto = ?',
        [id]
      );
      return { message: 'Producto desactivado' };
    } finally {
      connection.release();
    }
  }
}

module.exports = Producto;
