const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservas.controller');

router.post('/', controller.createReserva);
router.get('/', controller.getAllReservas);
router.get('/:id', controller.getReservaById);
router.put('/:id', controller.updateReserva);
router.delete('/:id', controller.deleteReserva);

module.exports = router;
