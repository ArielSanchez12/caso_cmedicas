import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  codigo: { type: String, required: true, unique: true },
  descripcion: { type: String },
  tecnico: { type: Schema.Types.ObjectId, ref: 'Tecnico', required: true },
  cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
});

export default model('Ticket', ticketSchema);
