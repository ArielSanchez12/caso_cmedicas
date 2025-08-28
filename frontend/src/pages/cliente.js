import React, { useEffect, useState } from 'react';

function EspecialidadesPage() {
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState({ codigo: '', nombre: '', descripcion: '' });
  const [editId, setEditId] = useState(null);
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const token = localStorage.getItem('token');

  const fetchEspecialidades = async () => {
    const res = await fetch('https://cmedicasbackend.vercel.app/api/especialidades', { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setEspecialidades(data);
  };

  useEffect(() => { fetchEspecialidades(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `https://cmedicasbackend.vercel.app/api/especialidades/${editId}` : `https://cmedicasbackend.vercel.app/api/especialidades`;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    setForm({ codigo: '', nombre: '', descripcion: '' });
    setEditId(null);
    fetchEspecialidades();
  };

  const handleEdit = especialidad => {
    setForm(especialidad);
    setEditId(especialidad._id);
  };

  const handleDelete = async id => {
    await fetch(`https://cmedicasbackend.vercel.app/api/especialidades/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchEspecialidades();
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>Bienvenido - {usuario?.nombre}</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={() => window.location.href = '/dashboard'}>Regresar al Dashboard</button>
        <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('usuario'); window.location.href = '/'; }} style={{ background: '#e74c3c', color: 'white' }}>Salir</button>
      </div>
      <h3>Especialidades</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="codigo" placeholder="Código" value={form.codigo} onChange={handleChange} required />
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ codigo: '', nombre: '', descripcion: '' }); }}>Cancelar</button>}
      </form>
      <table border="1" cellPadding="5" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Código</th><th>Nombre</th><th>Descripción</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(especialidades) && especialidades.map(e => (
            <tr key={e._id}>
              <td>{e.codigo}</td><td>{e.nombre}</td><td>{e.descripcion}</td>
              <td>
                <button onClick={() => handleEdit(e)}>Editar</button>
                <button onClick={() => handleDelete(e._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EspecialidadesPage;
