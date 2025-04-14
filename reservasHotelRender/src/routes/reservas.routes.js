const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservas.controller');

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotel:
 *                 type: string
 *               tipo_habitacion:
 *                 type: string
 *               num_huespedes:
 *                 type: integer
 *               fecha_inicio:
 *                 type: string
 *               fecha_fin:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reserva creada
 */
router.post('/', controller.createReserva);

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Reservas]
 *     parameters:
 *       - in: query
 *         name: hotel
 *         schema:
 *           type: string
 *       - in: query
 *         name: tipo_habitacion
 *         schema:
 *           type: string
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *       - in: query
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *       - in: query
 *         name: fecha_fin
 *         schema:
 *           type: string
 *       - in: query
 *         name: num_huespedes
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de reservas
 */
router.get('/', controller.getAllReservas);

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', controller.getReservaById);

/**
 * @swagger
 * /reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Reserva actualizada
 *       404:
 *         description: Reserva no encontrada
 */
router.put('/:id', controller.updateReserva);

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva eliminada
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/:id', controller.deleteReserva);

module.exports = router;
