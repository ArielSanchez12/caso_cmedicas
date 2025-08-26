import request from 'supertest';
import app from '../server';
import { findOneAndUpdate } from '../models/Usuario';

describe('Pruebas de carga para Login', () => {
  const numRequests = 100; // Número de solicitudes simultáneas
  
  beforeAll(async () => {
    // Crear usuario de prueba si no existe
    await findOneAndUpdate(
      { email: 'testx@test.com' },
      {
        nombre: 'Test User',
        email: 'testx@test.com',
        password: '123456'
      },
      { upsert: true }
    );
  });

  test('Debe manejar múltiples solicitudes de login simultáneas', async () => {
    const loginPromises = [];
    const startTime = Date.now();

    // Crear array de promesas de login
    for (let i = 0; i < numRequests; i++) {
      loginPromises.push(
        request(app)
          .post('/api/login')
          .send({
            email: 'testx@test.com',
            password: '123456'
          })
      );
    }

    // Ejecutar todas las solicitudes en paralelo
    const responses = await Promise.all(loginPromises);
    const endTime = Date.now();

    // Verificaciones
    const tiempoTotal = endTime - startTime;
    const tiempoPromedio = tiempoTotal / numRequests;

    console.log(`Tiempo total: ${tiempoTotal}ms`);
    console.log(`Tiempo promedio por solicitud: ${tiempoPromedio}ms`);
    console.log(`Solicitudes por segundo: ${1000 / tiempoPromedio}`);

    // Verificar que todas las solicitudes fueron exitosas
    responses.forEach(response => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  }, 30000); // Aumentar timeout a 30 segundos
});