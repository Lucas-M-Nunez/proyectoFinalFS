import { useState, useEffect } from 'react';
import APIService from '../services/apiService';

export default function GestorUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    rol: 'cajero',
    contraseña: ''
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const datos = await APIService.getUsuarios();
    setUsuarios(datos);
  };

  const guardar = async () => {
    if (!formulario.nombre || !formulario.contraseña) {
      alert('Completa nombre y contraseña');
      return;
    }

    await APIService.crearUsuario(
      formulario.nombre,
      formulario.apellido,
      formulario.rol,
      formulario.contraseña
    );

    setFormulario({ nombre: '', apellido: '', rol: 'cajero', contraseña: '' });
    cargarUsuarios();
  };

  return (
    <div className="gestor-usuarios">
      <h2>👥 Gestión de Usuarios</h2>

      <div className="formulario-usuario">
        <input
          type="text"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={formulario.apellido}
          onChange={(e) => setFormulario({ ...formulario, apellido: e.target.value })}
        />
        <select
          value={formulario.rol}
          onChange={(e) => setFormulario({ ...formulario, rol: e.target.value })}
        >
          <option value="cajero">Cajero</option>
          <option value="mozo">Mozo</option>
          <option value="barista">Barista</option>
        </select>
        <input
          type="password"
          placeholder="Contraseña"
          value={formulario.contraseña}
          onChange={(e) => setFormulario({ ...formulario, contraseña: e.target.value })}
        />
        <button className="btn-grande btn-verde" onClick={guardar}>
          ➕ CREAR USUARIO
        </button>
      </div>

      <div className="tabla-usuarios">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id_usuario}>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td><strong>{u.rol}</strong></td>
                <td>{u.activo ? '✓ Activo' : '✕ Inactivo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
