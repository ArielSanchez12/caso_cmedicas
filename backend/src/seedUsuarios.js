import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Usuario from './models/Usuario.js';

dotenv.config();

const usuarios = [
  { nombre: 'test', apellido: 'test2', email: 'test@gmail.com', password: 'xtet-2' }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  for (const u of usuarios) {
    const hashed = await bcrypt.hash(u.password, 10);
    await Usuario.create({ ...u, password: hashed });
  }

  console.log('Usuarios insertados');
  mongoose.disconnect();
}

seed();