import { Schema, model } from 'mongoose';

const clienteSchema = new Schema({
  cedula: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  ciudad: { type: String, required: true },
  email: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  fecha_nacimiento: { type: Date, required: true },
  dependencia: { type: String, required: true }
});

export default model('Cliente', clienteSchema);
