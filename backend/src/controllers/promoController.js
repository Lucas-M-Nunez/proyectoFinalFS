const Promo = require('../models/Promo');

exports.getAll = async (req, res) => {
  try {
    const promos = await Promo.getAll();
    res.json(promos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const promo = await Promo.getById(req.params.id);
    if (!promo) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }
    res.json(promo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    
    if (!nombre || !precio) {
      return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }
    
    const promo = await Promo.create(nombre, precio);
    res.status(201).json(promo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    
    if (!nombre || !precio) {
      return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }
    
    const promo = await Promo.update(req.params.id, nombre, precio);
    if (!promo) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }
    res.json(promo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Promo.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
