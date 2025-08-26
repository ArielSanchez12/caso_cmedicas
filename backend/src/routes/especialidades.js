import express from 'express';
import { getEspecialidades, createEspecialidad, updateEspecialidad, deleteEspecialidad } from '../controllers/especialidadController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.get('/', verifyToken, getEspecialidades);
router.post('/', verifyToken, createEspecialidad);
router.put('/:id', verifyToken, updateEspecialidad);
router.delete('/:id', verifyToken, deleteEspecialidad);

export default router;
