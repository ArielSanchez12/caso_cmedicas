import Especialidad from '../models/Especialidad.js';

export const getEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.find();
    if (!Array.isArray(especialidades)) {
      return res.json([]);
    }
    res.json(especialidades);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener especialidades.', error: err.message });
  }
};

export const createEspecialidad = async (req, res) => {
  try {
    const especialidad = new Especialidad(req.body);
    await especialidad.save();
    res.status(201).json(especialidad);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear especialidad.' });
  }
};

export const updateEspecialidad = async (req, res) => {
  try {
    const especialidad = await Especialidad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(especialidad);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar especialidad.' });
  }
};

export const deleteEspecialidad = async (req, res) => {
  try {
    await Especialidad.findByIdAndDelete(req.params.id);
    res.json({ message: 'Especialidad eliminada.' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar especialidad.' });
  }
};
