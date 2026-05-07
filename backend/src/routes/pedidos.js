const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.getAll);
router.get('/:id', pedidoController.getById);
router.post('/', pedidoController.create);
router.put('/:id_pedido/status', pedidoController.updateStatus);
router.post('/:id_pedido/productos', pedidoController.addProduct);
router.delete('/detalle/:id_detalle', pedidoController.removeProduct);

module.exports = router;
