const pool = require('../config/database');

class Mesa {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Mesa ORDER BY numero'
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
        'SELECT * FROM Mesa WHERE id_mesa = ?',
        [id]
      );
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async create(numero, capacidad) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO Mesa (numero, capacidad, estado) VALUES (?, ?, "disponible")',
        [numero, capacidad]
      );
      return { id_mesa: result.insertId, numero, capacidad, estado: 'disponible' };
    } finally {
      connection.release();
    }
  }

  static async updateStatus(id, estado) {
    const connection = await pool.getConnection();
    try {
      const estados_validos = ['disponible', 'ocupada', 'reservada'];
      
      if (!estados_validos.includes(estado)) {
        throw new Error('Estado no válido');
      }
      
      await connection.query(
        'UPDATE Mesa SET estado = ? WHERE id_mesa = ?',
        [estado, id]
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
        'DELETE FROM Mesa WHERE id_mesa = ?',
        [id]
      );
      return { message: 'Mesa eliminada' };
    } finally {
      connection.release();
    }
  }
}

module.exports = Mesa;
