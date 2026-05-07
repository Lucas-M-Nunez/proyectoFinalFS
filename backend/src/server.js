const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const productRoutes = require('./routes/productos');
const usuarioRoutes = require('./routes/usuarios');
const mesaRoutes = require('./routes/mesas');
const pedidoRoutes = require('./routes/pedidos');
const pagoRoutes = require('./routes/pagos');
const promoRoutes = require('./routes/promos');

// Usar rutas
app.use('/api/productos', productRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/mesas', mesaRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/promos', promoRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend POS funcionando correctamente', timestamp: new Date() });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor POS corriendo en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`✅ CORS habilitado para: ${process.env.FRONTEND_URL}`);
});
