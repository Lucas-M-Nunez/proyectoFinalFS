const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/mesaController');

router.get('/', mesaController.getAll);
router.get('/:id', mesaController.getById);
router.post('/', mesaController.create);
router.put('/:id/status', mesaController.updateStatus);
router.delete('/:id', mesaController.delete);

module.exports = router;
