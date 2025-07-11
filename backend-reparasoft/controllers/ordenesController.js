// controllers/ordenesController.js
const Orden = require('../models/ordenes');

exports.crearOrden = async (req, res) => {
  try {
    const nuevaOrden = new Orden(req.body);
    const ordenGuardada = await nuevaOrden.save();
    res.status(201).json(ordenGuardada);
  } catch (error) {
    console.error("Error al crear orden:", error);
    res.status(500).json({ mensaje: 'Error al crear la orden.' });
  }
};

exports.obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.find().sort({ fecha: -1 });
    res.json(ordenes);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    res.status(500).json({ mensaje: 'Error al obtener las órdenes.' });
  }
};

