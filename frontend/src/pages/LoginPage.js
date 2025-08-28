import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://cmedicasbackend.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        navigate('/dashboard'); // Redirige al dashboard
      } else {
        setError(data.message || 'Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error completo:', error);
      setError(`Error de conexión: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login - Tickets</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 10 }} />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 10 }} />
        <button type="submit" style={{ width: '100%' }}>Iniciar Sesion</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </div>
  );
}

export default LoginPage;
