import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  console.log('==== Inicio de intento de login ====');
  console.log('Headers recibidos:', req.headers);
  console.log('Body recibido:', req.body);
  
  const { email, password } = req.body;
  
  try {
    console.log('Buscando usuario con email:', email);
    const usuario = await Usuario.findOne({ email });
    console.log('Usuario encontrado:', usuario ? 'Sí' : 'No');
    
    if (!usuario) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    console.log('Verificando contraseña...');
    const validPassword = await bcrypt.compare(password, usuario.password);
    console.log('Contraseña válida:', validPassword ? 'Sí' : 'No');

    if (!validPassword) {
      console.log('Contraseña inválida');
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    console.log('Generando token...');
    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Token generado exitosamente');

    res.json({
      token,
      usuario: {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      }
    });
    console.log('Login exitoso');
  } catch (err) {
    console.error('==== Error en login ====');
    console.error('Tipo de error:', err.name);
    console.error('Mensaje:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({
      message: 'Error en el servidor.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};