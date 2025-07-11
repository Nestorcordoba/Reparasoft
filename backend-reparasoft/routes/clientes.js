const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Crear cliente (si no existe)
router.post('/', async (req, res) => {
  const { nombre, telefono, email, dni } = req.body;

  try {
    const existente = await Cliente.findOne({ dni });
    if (existente) return res.status(200).json(existente);

    const nuevoCliente = new Cliente({ nombre, telefono, email, dni });
    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar clientes por nombre o dni
router.get('/', async (req, res) => {
  const { q } = req.query;
  try {
    const filtro = q
      ? {
          $or: [
            { nombre: { $regex: q, $options: 'i' } },
            { dni: { $regex: q, $options: 'i' } }
          ]
        }
      : {};
    const clientes = await Cliente.find(filtro);
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
