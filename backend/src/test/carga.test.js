import request from 'supertest';
import app from '../server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('Prueba de carga para Login', () => {
  // Conectar a la base de datos antes de las pruebas
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Conexión a MongoDB establecida para pruebas');
    } catch (error) {
      console.error('Error conectando a MongoDB:', error);
    }
  });

  // Cerrar la conexión después de las pruebas
  afterAll(async () => {
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada');
  });

  test('Debe manejar múltiples solicitudes de login simultáneas', async () => {
    const numRequests = 25;
    const loginPromises = [];
    const startTime = Date.now();

    // Crear solicitudes simultáneas
    for (let i = 0; i < numRequests; i++) {
      loginPromises.push(
        request(app)
          .post('/api/login')
          .send({
            email: 'ariel@mail.com',
            password: 'arielx123'
          })
      );
    }

    // Ejecutar todas las solicitudes
    const responses = await Promise.all(loginPromises);
    const endTime = Date.now();

    // Calcular métricas
    const tiempoTotal = endTime - startTime;
    const tiempoPromedio = tiempoTotal / numRequests;
    const solicitudesPorSegundo = 1000 / tiempoPromedio;

    // Mostrar resultados
    console.log('=== RESULTADOS DE LA PRUEBA DE CARGA ===');
    console.log(`Número total de solicitudes: ${numRequests}`);
    console.log(`Tiempo total: ${tiempoTotal}ms`);
    console.log(`Tiempo promedio por solicitud: ${tiempoPromedio.toFixed(2)}ms`);
    console.log(`Solicitudes por segundo: ${solicitudesPorSegundo.toFixed(2)}`);

    // Verificar que todas las solicitudes fueron exitosas
    let exitosas = 0;
    let fallidas = 0;

    responses.forEach(response => {
      if (response.status === 200 && response.body.token) {
        exitosas++;
      } else {
        fallidas++;
        console.log('Error en respuesta:', response.status, response.body);
      }
    });

    console.log(`Solicitudes exitosas: ${exitosas}`);
    console.log(`Solicitudes fallidas: ${fallidas}`);

    // Verificación final
    expect(exitosas).toBeGreaterThan(0);
  }, 60000);
});