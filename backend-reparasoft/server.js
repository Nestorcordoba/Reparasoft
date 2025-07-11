const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
conectarDB();

// Rutas
app.use('/api/ordenes', require('./routes/ordenes'));

const clientesRoutes = require('./routes/clientes');
app.use('/api/clientes', clientesRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
