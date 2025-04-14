const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/reservas.json');

// Utilidades
const load = () => JSON.parse(fs.readFileSync(dataPath));
const save = data => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// Crear
const createReserva = (req, res) => {
  const campos = ['hotel', 'tipo_habitacion', 'num_huespedes', 'fecha_inicio', 'fecha_fin', 'estado'];
  const falta = campos.some(c => !req.body[c]);
  if (falta) return res.status(400).json({ mensaje: 'Todos los campos son requeridos.' });

  const reservas = load();
  const nueva = {
    id: reservas.length ? reservas[reservas.length - 1].id + 1 : 1,
    ...req.body
  };
  reservas.push(nueva);
  save(reservas);
  res.status(201).json(nueva);
};

// Listar con filtros
const getAllReservas = (req, res) => {
  const q = req.query;
  const reservas = load().filter(r =>
    (!q.hotel || r.hotel.toLowerCase().includes(q.hotel.toLowerCase())) &&
    (!(q.fecha_inicio && q.fecha_fin) || (r.fecha_inicio >= q.fecha_inicio && r.fecha_fin <= q.fecha_fin)) &&
    (!q.tipo_habitacion || r.tipo_habitacion.toLowerCase() === q.tipo_habitacion.toLowerCase()) &&
    (!q.estado || r.estado.toLowerCase() === q.estado.toLowerCase()) &&
    (!q.num_huespedes || +r.num_huespedes === +q.num_huespedes)
  );
  res.json(reservas);
};

// Buscar por ID
const getReservaById = (req, res) => {
  const r = load().find(r => r.id == req.params.id);
  r ? res.json(r) : res.status(404).json({ mensaje: 'Reserva no encontrada.' });
};

// Actualizar
const updateReserva = (req, res) => {
  const reservas = load();
  const i = reservas.findIndex(r => r.id == req.params.id);
  if (i === -1) return res.status(404).json({ mensaje: 'Reserva no encontrada.' });

  reservas[i] = { ...reservas[i], ...req.body };
  save(reservas);
  res.json(reservas[i]);
};

// Eliminar
const deleteReserva = (req, res) => {
  const reservas = load();
  const i = reservas.findIndex(r => r.id == req.params.id);
  if (i === -1) return res.status(404).json({ mensaje: 'Reserva no encontrada.' });

  const [eliminada] = reservas.splice(i, 1);
  save(reservas);
  res.json({ mensaje: 'Reserva eliminada.', eliminada });
};

module.exports = {
  createReserva,
  getAllReservas,
  getReservaById,
  updateReserva,
  deleteReserva
};
