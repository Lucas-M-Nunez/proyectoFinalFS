const pool = require('../config/database');

class Usuario {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT id_usuario, nombre, apellido, rol, activo FROM Usuario WHERE activo = 1'
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
        'SELECT id_usuario, nombre, apellido, rol, activo FROM Usuario WHERE id_usuario = ? AND activo = 1',
        [id]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async getByRole(rol) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT id_usuario, nombre, apellido, rol FROM Usuario WHERE rol = ? AND activo = 1',
        [rol]
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async create(nombre, apellido, rol, contraseña) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO Usuario (nombre, apellido, rol, contraseña, activo) VALUES (?, ?, ?, ?, 1)',
        [nombre, apellido, rol, contraseña]
      );
      return { id_usuario: result.insertId, nombre, apellido, rol, activo: 1 };
    } finally {
      connection.release();
    }
  }

  static async update(id, nombre, apellido, rol) {
    const connection = await pool.getConnection();
    try {
      await connection.query(
        'UPDATE Usuario SET nombre = ?, apellido = ?, rol = ? WHERE id_usuario = ?',
        [nombre, apellido, rol, id]
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
        'UPDATE Usuario SET activo = 0 WHERE id_usuario = ?',
        [id]
      );
      return { message: 'Usuario desactivado' };
    } finally {
      connection.release();
    }
  }
}

module.exports = Usuario;
