import express from 'express';
import { getTickets, createTicket, updateTicket, deleteTicket } from '../controllers/ticketController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.get('/', verifyToken, getTickets);
router.post('/', verifyToken, createTicket);
router.put('/:id', verifyToken, updateTicket);
router.delete('/:id', verifyToken, deleteTicket);

export default router;
