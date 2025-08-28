import React, { useEffect, useState } from 'react';

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nombre: '', apellido: '', cedula: '', ciudad: '', fecha_nacimiento: '', dependencia: '', direccion: '', telefono: '', email: '' });
  const [editId, setEditId] = useState(null);
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const token = localStorage.getItem('token');

  const fetchClientes = async () => {
    const res = await fetch('https://cmedicasbackend.vercel.app/api/clientes', { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setClientes(data);
  };

  useEffect(() => { fetchClientes(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `https://cmedicasbackend.vercel.app/api/clientes/${editId}` : `https://cmedicasbackend.vercel.app/api/clientes`;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    setForm({ nombre: '', apellido: '', cedula: '', ciudad: '', fecha_nacimiento: '', dependencia: '', direccion: '', telefono: '', email: '' });
    setEditId(null);
    fetchClientes();
  };

  const handleEdit = cliente => {
    setForm(cliente);
    setEditId(cliente._id);
  };

  const handleDelete = async id => {
    await fetch(`https://cmedicasbackend.vercel.app/api/clientes/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchClientes();
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Bienvenido - {usuario?.nombre}</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={() => window.location.href = '/dashboard'}>Regresar al Dashboard</button>
        <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('usuario'); window.location.href = '/'; }} style={{ background: '#e74c3c', color: 'white' }}>Salir</button>
      </div>
      <h3>Clientes</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
        <input name="cedula" placeholder="Cédula" value={form.cedula} onChange={handleChange} required />
        <input name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required />
        <input name="fecha_nacimiento" type="date" placeholder="Fecha de Nacimiento" value={form.fecha_nacimiento} onChange={handleChange} required />
        <input name="dependencia" placeholder="Dependencia" value={form.dependencia} onChange={handleChange} required />
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nombre: '', apellido: '', cedula: '', ciudad: '', fecha_nacimiento: '', dependencia: '', direccion: '', telefono: '', email: '' }); }}>Cancelar</button>}
      </form>
      <table border="1" cellPadding="5" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Nombre</th><th>Apellido</th><th>Cédula</th><th>Ciudad</th><th>Fecha de Nacimiento</th><th>Dependencia</th><th>Dirección</th><th>Teléfono</th><th>Email</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(clientes) && clientes.map(c => (
            <tr key={c._id}>
              <td>{c.nombre}</td><td>{c.apellido}</td><td>{c.cedula}</td><td>{c.ciudad}</td><td>{c.fecha_nacimiento}</td><td>{c.dependencia}</td><td>{c.direccion}</td><td>{c.telefono}</td><td>{c.email}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Editar</button>
                <button onClick={() => handleDelete(c._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientesPage;
