import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)


mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error de Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado de MongoDB');
});

const connection = async () => {
  try {
    console.log('Intentando conectar a MongoDB...');
    console.log('URI:', process.env.MONGODB_URI ? 'Definida' : 'No definida');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 2000,
    });
    
    console.log("MongoDB conectado exitosamente");
    const { host, port, name } = mongoose.connection;
    console.log(`Host: ${host}, Port: ${port}, DB: ${name}`);
  } catch (error) {
    console.error("Error detallado de conexión a MongoDB:");
    console.error(error);
    if (error.name === 'MongoServerError') {
      console.error('Posible error de autenticación o permisos');
    }
  }
};

export default connection;