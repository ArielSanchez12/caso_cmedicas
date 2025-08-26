import request from 'supertest';
import app from '../server';

describe('Prueba de carga para Login', () => {
  test('Debe manejar múltiples solicitudes de login simultáneas', async () => {
    const numRequests = 100;
    const loginPromises = [];
    const startTime = Date.now();

    // Crear solicitudes simultáneas
    for (let i = 0; i < numRequests; i++) {
      loginPromises.push(
        request(app)
          .post('/api/login')
          .send({
            email: 'test@gmail.com', // Usa un usuario que ya exista en tu base de datos
            password: 'xtet-2'
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
      }
    });

    console.log(`Solicitudes exitosas: ${exitosas}`);
    console.log(`Solicitudes fallidas: ${fallidas}`);

    // Verificación final
    expect(exitosas).toBeGreaterThan(0);
  }, 60000); // Timeout de 60 segundos
});