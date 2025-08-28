import Cliente from '../models/Cliente.js';

export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    if (!Array.isArray(clientes)) {
      return res.json([]);
    }
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener clientes.', error: err.message });
  }
};

export const createCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear cliente.' });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar cliente.' });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cliente eliminado.' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar cliente.' });
  }
};
