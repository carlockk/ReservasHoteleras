const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/reservas.json');

// de aqui saco los datos desde el archivo JSON
const loadReservas = () => JSON.parse(fs.readFileSync(dataPath));
const saveReservas = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// Crear nueva reserva con ID que se incrementa
const createReserva = (req, res) => {
    const { hotel, tipo_habitacion, num_huespedes, fecha_inicio, fecha_fin, estado } = req.body;

    if (!hotel || !tipo_habitacion || !num_huespedes || !fecha_inicio || !fecha_fin || !estado) {
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos.' });
    }

    const reservas = loadReservas();
    const nuevoId = reservas.length > 0 ? reservas[reservas.length - 1].id + 1 : 1;

    const nuevaReserva = {
        id: nuevoId,
        hotel,
        tipo_habitacion,
        num_huespedes,
        fecha_inicio,
        fecha_fin,
        estado
    };

    reservas.push(nuevaReserva);
    saveReservas(reservas);
    res.status(201).json(nuevaReserva);
};

// traigo todas las reservas con filtros
const getAllReservas = (req, res) => {
    let reservas = loadReservas();
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;

    if (hotel) {
        reservas = reservas.filter(r => r.hotel.toLowerCase().includes(hotel.toLowerCase()));
    }
    if (fecha_inicio && fecha_fin) {
        reservas = reservas.filter(r =>
            r.fecha_inicio >= fecha_inicio && r.fecha_fin <= fecha_fin
        );
    }
    if (tipo_habitacion) {
        reservas = reservas.filter(r => r.tipo_habitacion === tipo_habitacion);
    }
    if (estado) {
        reservas = reservas.filter(r => r.estado === estado);
    }
    if (num_huespedes) {
        reservas = reservas.filter(r => parseInt(r.num_huespedes) === parseInt(num_huespedes));
    }

    res.json(reservas);
};

// ver reserva específica
const getReservaById = (req, res) => {
    const reservas = loadReservas();
    const reserva = reservas.find(r => r.id == req.params.id);

    if (!reserva) {
        return res.status(404).json({ mensaje: 'Reserva no encontrada.' });
    }

    res.json(reserva);
};

// Editar y actualizar reserva
const updateReserva = (req, res) => {
    const reservas = loadReservas();
    const index = reservas.findIndex(r => r.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ mensaje: 'Reserva no encontrada.' });
    }

    const { hotel, tipo_habitacion, num_huespedes, fecha_inicio, fecha_fin, estado } = req.body;

    reservas[index] = {
        ...reservas[index],
        hotel: hotel || reservas[index].hotel,
        tipo_habitacion: tipo_habitacion || reservas[index].tipo_habitacion,
        num_huespedes: num_huespedes || reservas[index].num_huespedes,
        fecha_inicio: fecha_inicio || reservas[index].fecha_inicio,
        fecha_fin: fecha_fin || reservas[index].fecha_fin,
        estado: estado || reservas[index].estado,
    };

    saveReservas(reservas);
    res.json(reservas[index]);
};

// Eliminar reserva
const deleteReserva = (req, res) => {
    let reservas = loadReservas();
    const index = reservas.findIndex(r => r.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ mensaje: 'Reserva no encontrada.' });
    }

    const eliminada = reservas.splice(index, 1)[0];
    saveReservas(reservas);
    res.json({ mensaje: 'Reserva eliminada.', eliminada });
};

module.exports = {
    createReserva,
    getAllReservas,
    getReservaById,
    updateReserva,
    deleteReserva
};
