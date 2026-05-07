const Usuario = require('../models/Usuario');

exports.getAll = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const usuario = await Usuario.getById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByRole = async (req, res) => {
  try {
    const { rol } = req.params;
    const usuarios = await Usuario.getByRole(rol);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre, apellido, rol, contraseña } = req.body;
    
    if (!nombre || !rol || !contraseña) {
      return res.status(400).json({ error: 'Nombre, rol y contraseña son requeridos' });
    }
    
    const roles_validos = ['dueño', 'cajero', 'mozo', 'barista'];
    if (!roles_validos.includes(rol)) {
      return res.status(400).json({ error: 'Rol no válido' });
    }
    
    const usuario = await Usuario.create(nombre, apellido || '', rol, contraseña);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { nombre, apellido, rol } = req.body;
    
    if (!nombre || !rol) {
      return res.status(400).json({ error: 'Nombre y rol son requeridos' });
    }
    
    const usuario = await Usuario.update(req.params.id, nombre, apellido || '', rol);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Usuario.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
