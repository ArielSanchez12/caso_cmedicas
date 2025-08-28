import React, { useEffect, useState } from 'react';

function CitasPage() {
  const [citas, setCitas] = useState([]);
  const [form, setForm] = useState({ codigo: '', descripcion: '', paciente: '', especialidad: '' });
  const [editId, setEditId] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const token = localStorage.getItem('token');

  // Verificar token en consola
  useEffect(() => {
    console.log("Token en frontend:", token);
    if (!token) {
      console.error("⚠️ No hay token en localStorage, redirigiendo al login...");
      window.location.href = '/'; 
      return;
    }
    fetchCitas();
    fetchPacientes();
    fetchEspecialidades();
  }, [token]);

  const fetchCitas = async () => {
    try {
      const res = await fetch('https://cmedicasbackend.vercel.app/api/citas', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (!res.ok) throw new Error("Error en fetchCitas: " + res.status);
      const data = await res.json();
      console.log('Citas recibidas:', data);
      setCitas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error obteniendo citas:", err);
    }
  };

  const fetchPacientes = async () => {
    try {
      const res = await fetch('https://cmedicasbackend.vercel.app/api/pacientes', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (!res.ok) throw new Error("Error en fetchPacientes: " + res.status);
      const data = await res.json();
      console.log('Pacientes recibidos:', data);
      setPacientes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
      setPacientes([]);
    }
  };

  const fetchEspecialidades = async () => {
    try {
      const res = await fetch('https://cmedicasbackend.vercel.app/api/especialidades', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (!res.ok) throw new Error("Error en fetchEspecialidades: " + res.status);
      const data = await res.json();
      console.log('Especialidades recibidas:', data);
      setEspecialidades(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al obtener especialidades:', error);
      setEspecialidades([]);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId 
      ? `https://cmedicasbackend.vercel.app/api/citas/${editId}` 
      : `https://cmedicasbackend.vercel.app/api/citas`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Error en submit: " + res.status);
      setForm({ codigo: '', descripcion: '', paciente: '', especialidad: '' });
      setEditId(null);
      fetchCitas();
    } catch (err) {
      console.error("Error guardando cita:", err);
    }
  };

  const handleEdit = cita => {
    setForm({
      codigo: cita.codigo,
      descripcion: cita.descripcion,
      paciente: cita.paciente?._id || '',
      especialidad: cita.especialidad?._id || ''
    });
    setEditId(cita._id);
  };

  const handleDelete = async id => {
    try {
      await fetch(`https://cmedicasbackend.vercel.app/api/citas/${id}`, { 
        method: 'DELETE', 
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchCitas();
    } catch (err) {
      console.error("Error eliminando cita:", err);
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

      <h3>Citas</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="codigo" placeholder="Código" value={form.codigo} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        <select name="paciente" value={form.paciente} onChange={handleChange} required>
          <option value="">Seleccione paciente</option>
          {pacientes.map(p => <option key={p._id} value={p._id}>{p.nombre} {p.apellido}</option>)}
        </select>
        <select name="especialidad" value={form.especialidad} onChange={handleChange} required>
          <option value="">Seleccione especialidad</option>
          {especialidades.map(e => <option key={e._id} value={e._id}>{e.nombre}</option>)}
        </select>
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        {editId && <button type="button" onClick={() => { 
          setEditId(null); 
          setForm({ codigo: '', descripcion: '', paciente: '', especialidad: '' }); 
        }}>Cancelar</button>}
      </form>

      <table border="1" cellPadding="5" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Código</th><th>Descripción</th><th>Paciente</th><th>Especialidad</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map(cita => (
            <tr key={cita._id}>
              <td>{cita.codigo}</td>
              <td>{cita.descripcion}</td>
              <td>{cita.paciente?.nombre} {cita.paciente?.apellido}</td>
              <td>{cita.especialidad?.nombre}</td>
              <td>
                <button onClick={() => handleEdit(cita)}>Editar</button>
                <button onClick={() => handleDelete(cita._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CitasPage;
