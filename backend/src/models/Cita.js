import { Schema, model } from 'mongoose';

const citaSchema = new Schema({
  codigo: { type: String, required: true, unique: true },
  descripcion: { type: String },
  paciente: { type: Schema.Types.ObjectId, ref: 'Paciente', required: true },
  especialidad: { type: Schema.Types.ObjectId, ref: 'Especialidad', required: true },
});

export default model('Cita', citaSchema);
