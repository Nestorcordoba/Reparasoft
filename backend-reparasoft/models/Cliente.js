const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: String,
  email: String,
  dni: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
