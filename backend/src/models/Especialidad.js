import { Schema, model } from 'mongoose';

const especialidadSchema = new Schema({
  codigo: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  descripcion: { type: String },
});

export default model('Especialidad', especialidadSchema);
