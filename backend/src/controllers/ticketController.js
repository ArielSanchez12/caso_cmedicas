import Ticket from '../models/Ticket.js';

export const getTickets = async (req, res) => {
  try {
    const count = await Ticket.countDocuments();
    console.log("Total de documentos en la colección tickets:", count);
    const tickets = await Ticket.find()
      .populate('tecnico')
      .populate('cliente')
      .lean();  // Convertir a objeto plano de JS

    console.log('Tickets encontrados:', tickets);

    if (!Array.isArray(tickets)) {
      console.log('Los tickets no son un array, devolviendo []');
      return res.json([]);
    }

    if (tickets.length === 0) {
      console.log('No se encontraron tickets');
    } else {
      console.log(`Se encontraron ${tickets.length} tickets`);
    }

    res.json(tickets);
  } catch (err) {
    console.error('Error al obtener tickets:', err);
    res.status(500).json({ 
      message: 'Error al obtener tickets.', 
      error: err.message 
    });
  }
};

export const createTicket = async (req, res) => {
  try {
    const { codigo } = req.body;
    const existe = await Ticket.findOne({ codigo });
    if (existe) {
      return res.status(400).json({ message: 'El código de ticket ya existe.' });
    }
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear ticket.' });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar ticket.' });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket eliminado.' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar ticket.' });
  }
};
