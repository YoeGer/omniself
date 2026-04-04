import express from 'express';
import cors from 'cors';
import translateRoutes from './routes/translate.routes.js';
import protocolRoutes from './routes/protocol.routes.js';
import avatarRoutes from './routes/avatar.routes.js';

const app = express();

// --- MIDDLEWARES ---
app.use(cors()); // Seguridad: permite que tu Frontend hable con el Backend
app.use(express.json()); // Formato: permite recibir datos en JSON

// --- RUTAS ---
// Todas las rutas de traducción empezarán con /api
app.use('/api/translate', translateRoutes); 
app.use('/api/protocols', protocolRoutes);
app.use('/api/avatar', avatarRoutes);

// --- MANEJO DE ERRORES GLOBAL  ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Algo salió mal en el servidor 🧬' });
});

export default app;