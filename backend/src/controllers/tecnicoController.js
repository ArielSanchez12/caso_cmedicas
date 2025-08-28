import Tecnico from '../models/Tecnico.js';

export const getTecnicos = async (req, res) => {
  try {
    const tecnicos = await Tecnico.find();
    if (!Array.isArray(tecnicos)) {
      return res.json([]);
    }
    res.json(tecnicos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tecnicos.' });
  }
};

export const createTecnico = async (req, res) => {
  try {
    const tecnico = new Tecnico(req.body);
    await tecnico.save();
    res.status(201).json(tecnico);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear tecnico.' });
  }
};

export const updateTecnico = async (req, res) => {
  try {
    const tecnico = await Tecnico.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tecnico);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar tecnico.' });
  }
};

export const deleteTecnico = async (req, res) => {
  try {
    await Tecnico.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tecnico eliminado.' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar tecnico.' });
  }
};
