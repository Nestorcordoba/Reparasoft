
// routes/ordenes.js
// routes/ordenes.js
const express = require('express');
const router = express.Router();
const Orden = require('../models/ordenes');
const Cliente = require('../models/Cliente');


// Obtener todas las órdenes
router.get('/', async (req, res) => {
  try {
    const ordenes = await Orden.find().sort({ fecha: -1 });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las órdenes', error });
  }
});

// Crear una nueva orden
router.post('/', async (req, res) => {
  try {
    const nuevaOrden = new Orden(req.body);
    const guardada = await nuevaOrden.save();
    res.status(201).json(guardada);
    const { cliente } = req.body;

     if (cliente?.dni) {
      let clienteExistente = await Cliente.findOne({ dni: cliente.dni });
      if (!clienteExistente) {
       clienteExistente = new Cliente(cliente);
       await clienteExistente.save();
  }
  req.body.cliente = clienteExistente;
}

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la orden', error });
  }
});

// Eliminar una orden
router.delete('/:id', async (req, res) => {
  try {
    await Orden.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Orden eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la orden', error });
  }
});

// Actualizar una orden
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Orden.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la orden', error });
  }
});

module.exports = router;


