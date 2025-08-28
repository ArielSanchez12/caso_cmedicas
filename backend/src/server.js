import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import loginRoutes from './routes/login.js';
import tecnicoRoutes from './routes/tecnicos.js';
import clienteRoutes from './routes/clientes.js';
import ticketRoutes from './routes/tickets.js';
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: 'https://cmfrontend.vercel.app', // Pon aquí la URL EXACTA de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Permite cookies/autenticación
}));

// JSON parser middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Request body:', req.body);
  next();
});

app.get('/', (req, res) => {
  res.send('API de tickets funcionando');
});

// Routes
app.use('/api/login', loginRoutes);
app.use('/api/tecnicos', tecnicoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/tickets', ticketRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  
  console.error('Error:', err);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.set('port', process.env.PORT || 4000);

export default app;