const Pedido = require('../models/Pedido');

exports.getAll = async (req, res) => {
  try {
    const { estado } = req.query;
    const pedidos = await Pedido.getAll(estado);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const pedido = await Pedido.getById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { id_usuario, id_mesa } = req.body;
    
    if (!id_usuario) {
      return res.status(400).json({ error: 'id_usuario es requerido' });
    }
    
    const pedido = await Pedido.create(id_usuario, id_mesa || null);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { id_pedido } = req.params;
    const { id_producto, cantidad, precio_unitario } = req.body;
    
    if (!id_producto || !cantidad || !precio_unitario) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos' });
    }
    
    const detalle = await Pedido.addProduct(id_pedido, id_producto, cantidad, precio_unitario);
    res.status(201).json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id_pedido } = req.params;
    const { estado } = req.body;
    
    if (!estado) {
      return res.status(400).json({ error: 'Estado es requerido' });
    }
    
    const pedido = await Pedido.updateStatus(id_pedido, estado);
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { id_detalle } = req.params;
    const result = await Pedido.removeProduct(id_detalle);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
