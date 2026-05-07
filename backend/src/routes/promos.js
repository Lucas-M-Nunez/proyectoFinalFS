const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');

router.get('/', promoController.getAll);
router.get('/:id', promoController.getById);
router.post('/', promoController.create);
router.put('/:id', promoController.update);
router.delete('/:id', promoController.delete);

module.exports = router;
