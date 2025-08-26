import Paciente from '../models/Paciente.js';

export const getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    if (!Array.isArray(pacientes)) {
      return res.json([]);
    }
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener pacientes.' });
  }
};

export const createPaciente = async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    await paciente.save();
    res.status(201).json(paciente);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear paciente.' });
  }
};

export const updatePaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(paciente);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar paciente.' });
  }
};

export const deletePaciente = async (req, res) => {
  try {
    await Paciente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Paciente eliminado.' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar paciente.' });
  }
};
