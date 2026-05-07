const pool = require('../config/database');

class Pedido {
  static async getAll(estado = null) {
    const connection = await pool.getConnection();
    try {
      let query = 'SELECT * FROM Pedido ORDER BY fecha DESC';
      let params = [];
      
      if (estado) {
        query = 'SELECT * FROM Pedido WHERE estado = ? ORDER BY fecha DESC';
        params = [estado];
      }
      
      const [rows] = await connection.query(query, params);
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const connection = await pool.getConnection();
    try {
      const [pedido] = await connection.query(
        'SELECT * FROM Pedido WHERE id_pedido = ?',
        [id]
      );
      
      if (!pedido.length) return null;
      
      const [detalles] = await connection.query(
        'SELECT * FROM Detalle WHERE id_pedido = ?',
        [id]
      );
      
      return { ...pedido[0], detalles };
    } finally {
      connection.release();
    }
  }

  static async create(id_usuario, id_mesa = null) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO Pedido (fecha, total, estado, id_usuario, id_mesa) VALUES (NOW(), 0, "pendiente", ?, ?)',
        [id_usuario, id_mesa]
      );
      return { id_pedido: result.insertId, estado: 'pendiente', total: 0 };
    } finally {
      connection.release();
    }
  }

  static async addProduct(id_pedido, id_producto, cantidad, precio_unitario) {
    const connection = await pool.getConnection();
    try {
      const subtotal = cantidad * precio_unitario;
      
      await connection.query(
        'INSERT INTO Detalle (id_pedido, tipo_item, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, "producto", ?, ?, ?, ?)',
        [id_pedido, id_producto, cantidad, precio_unitario, subtotal]
      );
      
      // Actualizar total del pedido
      const [total] = await connection.query(
        'SELECT SUM(subtotal) as total FROM Detalle WHERE id_pedido = ?',
        [id_pedido]
      );
      
      await connection.query(
        'UPDATE Pedido SET total = ? WHERE id_pedido = ?',
        [total[0].total || 0, id_pedido]
      );
      
      return { id_pedido, id_producto, cantidad, precio_unitario, subtotal };
    } finally {
      connection.release();
    }
  }

  static async updateStatus(id_pedido, estado) {
    const connection = await pool.getConnection();
    try {
      const estados_validos = ['pendiente', 'en_proceso', 'listo', 'completado'];
      
      if (!estados_validos.includes(estado)) {
        throw new Error('Estado no válido');
      }
      
      await connection.query(
        'UPDATE Pedido SET estado = ? WHERE id_pedido = ?',
        [estado, id_pedido]
      );
      
      return await this.getById(id_pedido);
    } finally {
      connection.release();
    }
  }

  static async removeProduct(id_detalle) {
    const connection = await pool.getConnection();
    try {
      const [detalle] = await connection.query(
        'SELECT id_pedido FROM Detalle WHERE id_detalle = ?',
        [id_detalle]
      );
      
      if (!detalle.length) throw new Error('Detalle no encontrado');
      
      const id_pedido = detalle[0].id_pedido;
      
      await connection.query(
        'DELETE FROM Detalle WHERE id_detalle = ?',
        [id_detalle]
      );
      
      // Actualizar total
      const [total] = await connection.query(
        'SELECT SUM(subtotal) as total FROM Detalle WHERE id_pedido = ?',
        [id_pedido]
      );
      
      await connection.query(
        'UPDATE Pedido SET total = ? WHERE id_pedido = ?',
        [total[0].total || 0, id_pedido]
      );
      
      return { message: 'Producto removido del pedido' };
    } finally {
      connection.release();
    }
  }
}

module.exports = Pedido;
