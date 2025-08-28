import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, borderRadius: 10, background: 'linear-gradient(135deg, #f9fafc 60%, #ffe5b4 100%)', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', position: 'relative'}}>
      <h2>Bienvenido - {usuario?.nombre}</h2>
      <h3>Seleccione un módulo:</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={() => navigate('/pacientes')}>Tecnicos</button>
        <button onClick={() => navigate('/especialidades')}>Clientes</button>
        <button onClick={() => navigate('/citas')}>Tickets</button>
        <button onClick={handleLogout} style={{ marginTop: 20, background: '#e74c3c', color: 'white' }}>Salir</button>
      </div>
    </div>
  );
}

export default DashboardPage;
