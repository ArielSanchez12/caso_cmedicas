import React, { useEffect, useState } from 'react';

function TecnicosPage() {
  const [tecnicos, setTecnicos] = useState([]);
  const [form, setForm] = useState({ nombre: '', apellido: '', cedula: '', fecha_nacimiento: '', genero: '', direccion: '', telefono: '', email: '' });
  const [editId, setEditId] = useState(null);
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const token = localStorage.getItem('token');

  const fetchTecnicos = async () => {
    const res = await fetch('https://cmedicasbackend.vercel.app/api/tecnicos', { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setTecnicos(data);
  };

  useEffect(() => { fetchTecnicos(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const cedulaValida = /^\d{10}$/.test(form.cedula);
    const telefonoValido = /^\d{10}$/.test(form.telefono);
    if (!cedulaValida || !telefonoValido) {
      alert('La cédula y el teléfono deben tener exactamente 10 números.');
      return;
    }
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `https://cmedicasbackend.vercel.app/api/tecnicos/${editId}` : `https://cmedicasbackend.vercel.app/api/tecnicos`;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    setForm({ nombre: '', apellido: '', cedula: '', fecha_nacimiento: '', genero: '', direccion: '', telefono: '', email: '' });
    setEditId(null);
    fetchTecnicos();
  };

  const handleEdit = tecnico => {
    setForm(tecnico);
    setEditId(tecnico._id);
  };

  const handleDelete = async id => {
    await fetch(`https://cmedicasbackend.vercel.app/api/tecnicos/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchTecnicos();
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Bienvenido - {usuario?.nombre}</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={() => window.location.href = '/dashboard'}>Regresar al Dashboard</button>
        <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('usuario'); window.location.href = '/'; }} style={{ background: '#e74c3c', color: 'white' }}>Salir</button>
      </div>
      <h3>Técnicos</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
        <input name="cedula" placeholder="Cédula" value={form.cedula} onChange={handleChange} required />
        <input name="fecha_nacimiento" type="date" placeholder="Fecha Nacimiento" value={form.fecha_nacimiento} onChange={handleChange} required />
        <input name="genero" placeholder="Género" value={form.genero} onChange={handleChange} required />
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nombre: '', apellido: '', cedula: '', fecha_nacimiento: '', genero: '', direccion: '', telefono: '', email: '' }); }}>Cancelar</button>}
      </form>
      <table border="1" cellPadding="5" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Nombre</th><th>Apellido</th><th>Fecha Nacimiento</th><th>Género</th><th>Cédula</th><th>Dirección</th><th>Teléfono</th><th>Email</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tecnicos) && tecnicos.map(p => (
            <tr key={p._id}>
              <td>{p.nombre}</td><td>{p.apellido}</td><td>{p.fecha_nacimiento?.slice(0, 10)}</td><td>{p.genero}</td><td>{p.cedula}</td><td>{p.direccion}</td><td>{p.telefono}</td><td>{p.email}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TecnicosPage;
