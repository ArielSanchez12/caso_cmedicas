import Cita from '../models/Cita.js';

export const getCitas = async (req, res) => {
  try {
    const count = await Cita.countDocuments();
    console.log("Total de documentos en la colección citas:", count);
    const citas = await Cita.find()
      .populate('paciente')
      .populate('especialidad')
      .lean();  // Convertir a objeto plano de JS

    console.log('Citas encontradas:', citas);

    if (!Array.isArray(citas)) {
      console.log('Las citas no son un array, devolviendo []');
      return res.json([]);
    }

    if (citas.length === 0) {
      console.log('No se encontraron citas');
    } else {
      console.log(`Se encontraron ${citas.length} citas`);
    }

    res.json(citas);
  } catch (err) {
    console.error('Error al obtener citas:', err);
    res.status(500).json({ 
      message: 'Error al obtener citas.', 
      error: err.message 
    });
  }
};

export const createCita = async (req, res) => {
  try {
    const cita = new Cita(req.body);
    await cita.save();
    res.status(201).json(cita);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear cita.' });
  }
};

export const updateCita = async (req, res) => {
  try {
    const cita = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cita);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar cita.' });
  }
};

export const deleteCita = async (req, res) => {
  try {
    await Cita.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cita eliminada.' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar cita.' });
  }
};
