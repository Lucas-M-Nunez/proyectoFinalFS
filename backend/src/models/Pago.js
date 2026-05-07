const pool = require('../config/database');

class Pago {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Pago ORDER BY fecha DESC'
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getByFactura(id_factura) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM Pago WHERE id_factura = ?',
        [id_factura]
      );
      return rows;
    } finally {
      connection.release();
    }
  }

  static async create(id_factura, metodo, monto) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO Pago (id_factura, metodo, monto, fecha) VALUES (?, ?, ?, NOW())',
        [id_factura, metodo, monto]
      );
      return { id_pago: result.insertId, id_factura, metodo, monto };
    } finally {
      connection.release();
    }
  }

  static async createFactura(id_pedido, tipo = 'venta') {
    const connection = await pool.getConnection();
    try {
      const [pedido] = await connection.query(
        'SELECT total FROM Pedido WHERE id_pedido = ?',
        [id_pedido]
      );
      
      if (!pedido.length) throw new Error('Pedido no encontrado');
      
      const [result] = await connection.query(
        'INSERT INTO Factura (id_pedido, fecha, total, tipo) VALUES (?, NOW(), ?, ?)',
        [id_pedido, pedido[0].total, tipo]
      );
      
      return { id_factura: result.insertId, id_pedido, total: pedido[0].total };
    } finally {
      connection.release();
    }
  }
}

module.exports = Pago;
