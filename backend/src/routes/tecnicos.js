import express from 'express';
import { getTecnicos, createTecnico, updateTecnico, deleteTecnico } from '../controllers/tecnicoController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.get('/', verifyToken, getTecnicos);
router.post('/', verifyToken, createTecnico);
router.put('/:id', verifyToken, updateTecnico);
router.delete('/:id', verifyToken, deleteTecnico);

export default router;
