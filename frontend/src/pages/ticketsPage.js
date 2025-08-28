import React, { useEffect, useState } from 'react';

function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ codigo: '', descripcion: '', tecnico: '', cliente: '' });
  const [editId, setEditId] = useState(null);
  const [tecnicos, setTecnicos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const token = localStorage.getItem('token');

  // Verificar token en consola
  useEffect(() => {
    console.log("Token en frontend:", token);
    if (!token) {
      console.error(" No hay token en localStorage, redirigiendo al login...");
      window.location.href = '/'; 
      return;
    }
    fetchTickets();
    fetchTecnicos();
    fetchClientes();
  }, [token]);

  const fetchTickets = async () => {
    try {
      const res = await fetch('https://cmedicasbackend.vercel.app/api/tickets', {
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (!res.ok) throw new Error("Error en fetchTickets: " + res.status);
      const data = await res.json();
      console.log('Tickets recibidos:', data);
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error obteniendo tickets:", err);
    }
  };

  const fetchTecnicos = async () => {
    try {
      const res = await fetch('https://cmedicasbackend.vercel.app/api/tecnicos', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (!res.ok) throw new Error("Error en fetchTecnicos: " + res.status);
      const data = await res.json();
      console.log('Técnicos recibidos:', data);
      setTecnicos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al obtener técnicos:', error);
      setTecnicos([]);
    }
  };

  const fetchClientes = async () => {
    try {
      const res = await fetch('https://cmedicasbackend.vercel.app/api/clientes', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (!res.ok) throw new Error("Error en fetchClientes: " + res.status);
      const data = await res.json();
      console.log('Clientes recibidos:', data);
      setClientes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      setClientes([]);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId 
      ? `https://cmedicasbackend.vercel.app/api/tickets/${editId}` 
      : `https://cmedicasbackend.vercel.app/api/tickets`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Error en submit: " + res.status);
      setForm({ codigo: '', descripcion: '', tecnico: '', cliente: '' });
      setEditId(null);
      fetchTickets();
    } catch (err) {
      console.error("Error guardando ticket:", err);
    }
  };

  const handleEdit = ticket => {
    setForm({
      codigo: ticket.codigo,
      descripcion: ticket.descripcion,
      tecnico: ticket.tecnico?._id || '',
      cliente: ticket.cliente?._id || ''
    });
    setEditId(ticket._id);
  };

  const handleDelete = async id => {
    try {
      await fetch(`https://cmedicasbackend.vercel.app/api/tickets/${id}`, { 
        method: 'DELETE', 
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchTickets();
    } catch (err) {
      console.error("Error eliminando ticket:", err);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Bienvenido - {usuario?.nombre}</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={() => window.location.href = '/dashboard'}>Regresar al Dashboard</button>
        <button onClick={() => { 
          localStorage.removeItem('token'); 
          localStorage.removeItem('usuario'); 
          window.location.href = '/'; 
        }} style={{ background: '#e74c3c', color: 'white' }}>Salir</button>
      </div>

      <h3>Tickets</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="codigo" placeholder="Código" value={form.codigo} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        <select name="tecnico" value={form.tecnico} onChange={handleChange} required>
          <option value="">Seleccione técnico</option>
          {tecnicos.map(t => <option key={t._id} value={t._id}>{t.nombre} {t.apellido}</option>)}
        </select>
        <select name="cliente" value={form.cliente} onChange={handleChange} required>
          <option value="">Seleccione cliente</option>
          {clientes.map(c => <option key={c._id} value={c._id}>{c.nombre} {c.apellido}</option>)}
        </select>
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { 
          setEditId(null); 
          setForm({ codigo: '', descripcion: '', tecnico: '', cliente: '' }); 
        }}>Cancelar</button>}
      </form>

      <table border="1" cellPadding="5" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Código</th><th>Descripción</th><th>Técnico</th><th>Cliente</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket.codigo}</td>
              <td>{ticket.descripcion}</td>
              <td>{ticket.tecnico?.nombre} {ticket.tecnico?.apellido}</td>
              <td>{ticket.cliente?.nombre} {ticket.cliente?.apellido}</td>
              <td>
                <button onClick={() => handleEdit(ticket)}>Editar</button>
                <button onClick={() => handleDelete(ticket._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketsPage;
