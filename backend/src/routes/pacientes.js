import express from 'express';
import { getPacientes, createPaciente, updatePaciente, deletePaciente } from '../controllers/pacienteController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.get('/', verifyToken, getPacientes);
router.post('/', verifyToken, createPaciente);
router.put('/:id', verifyToken, updatePaciente);
router.delete('/:id', verifyToken, deletePaciente);

export default router;
