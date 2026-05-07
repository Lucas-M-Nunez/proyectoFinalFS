const Mesa = require('../models/Mesa');

exports.getAll = async (req, res) => {
  try {
    const mesas = await Mesa.getAll();
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const mesa = await Mesa.getById(req.params.id);
    if (!mesa) {
      return res.status(404).json({ error: 'Mesa no encontrada' });
    }
    res.json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { numero, capacidad } = req.body;
    
    if (!numero || !capacidad) {
      return res.status(400).json({ error: 'Número y capacidad son requeridos' });
    }
    
    const mesa = await Mesa.create(numero, capacidad);
    res.status(201).json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { estado } = req.body;
    
    if (!estado) {
      return res.status(400).json({ error: 'Estado es requerido' });
    }
    
    const mesa = await Mesa.updateStatus(req.params.id, estado);
    res.json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Mesa.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
