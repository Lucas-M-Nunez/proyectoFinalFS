const Pago = require('../models/Pago');

exports.getAll = async (req, res) => {
  try {
    const pagos = await Pago.getAll();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByFactura = async (req, res) => {
  try {
    const pagos = await Pago.getByFactura(req.params.id_factura);
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { id_factura, metodo, monto } = req.body;
    
    if (!id_factura || !metodo || !monto) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos' });
    }
    
    const metodos_validos = ['efectivo', 'tarjeta', 'mercado_pago', 'transferencia'];
    if (!metodos_validos.includes(metodo)) {
      return res.status(400).json({ error: 'Método de pago no válido' });
    }
    
    const pago = await Pago.create(id_factura, metodo, monto);
    res.status(201).json(pago);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFactura = async (req, res) => {
  try {
    const { id_pedido } = req.body;
    const { tipo } = req.body;
    
    if (!id_pedido) {
      return res.status(400).json({ error: 'id_pedido es requerido' });
    }
    
    const factura = await Pago.createFactura(id_pedido, tipo || 'venta');
    res.status(201).json(factura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
