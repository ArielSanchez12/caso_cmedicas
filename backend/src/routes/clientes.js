import express from 'express';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../controllers/clienteController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.get('/', verifyToken, getClientes);
router.post('/', verifyToken, createCliente);
router.put('/:id', verifyToken, updateCliente);
router.delete('/:id', verifyToken, deleteCliente);

export default router;
