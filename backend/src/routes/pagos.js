const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

router.get('/', pagoController.getAll);
router.get('/factura/:id_factura', pagoController.getByFactura);
router.post('/', pagoController.create);
router.post('/factura', pagoController.createFactura);

module.exports = router;
