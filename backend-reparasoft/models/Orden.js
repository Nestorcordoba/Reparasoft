// models/Orden.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  descripcion: String,
  precio: Number,
  cantidad: Number,
  descuento: Number,
  iva: Number,
  total: Number
});

const ordenSchema = new mongoose.Schema({
  fecha: String,
  cliente: {
    nombre: String,
    dni: String,
    telefono: String,
    email: String
  },
  reparacion: {
    marca: String,
    modelo: String,
    patente: String,
    kilometraje: String,
    numeroSerie: String,
    accesorios: String,
    problema: String
  },
  estado: String,
  comentario: String,
  items: [itemSchema]
});

module.exports = mongoose.model('Orden', ordenSchema);
