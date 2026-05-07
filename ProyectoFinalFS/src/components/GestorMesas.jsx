import { useState, useEffect } from 'react';
import APIService from '../services/apiService';

export default function GestorMesas() {
  const [mesas, setMesas] = useState([]);
  const [numeroNueva, setNumeroNueva] = useState('');
  const [capacidadNueva, setCapacidadNueva] = useState('');

  useEffect(() => {
    cargarMesas();
  }, []);

  const cargarMesas = async () => {
    const datos = await APIService.getMesas();
    setMesas(datos);
  };

  const crear = async () => {
    if (!numeroNueva || !capacidadNueva) {
      alert('Completa los campos');
      return;
    }
    await APIService.crearMesa(parseInt(numeroNueva), parseInt(capacidadNueva));
    setNumeroNueva('');
    setCapacidadNueva('');
    cargarMesas();
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    await APIService.cambiarEstadoMesa(id, nuevoEstado);
    cargarMesas();
  };

  const colorEstado = {
    'disponible': '#4CAF50',
    'ocupada': '#FF9800',
    'reservada': '#2196F3'
  };

  return (
    <div className="gestor-mesas">
      <h2>🪑 Gestión de Mesas</h2>

      <div className="crear-mesa">
        <input
          type="number"
          placeholder="Número de mesa"
          value={numeroNueva}
          onChange={(e) => setNumeroNueva(e.target.value)}
        />
        <input
          type="number"
          placeholder="Capacidad"
          value={capacidadNueva}
          onChange={(e) => setCapacidadNueva(e.target.value)}
        />
        <button className="btn-grande btn-verde" onClick={crear}>
          ➕ CREAR MESA
        </button>
      </div>

      <div className="grid-mesas">
        {mesas.map(mesa => (
          <div
            key={mesa.id_mesa}
            className="tarjeta-mesa"
            style={{ borderColor: colorEstado[mesa.estado] }}
          >
            <div className="numero-mesa">Mesa {mesa.numero}</div>
            <div className="capacidad">👥 {mesa.capacidad} personas</div>
            <div className="estado-actual" style={{ backgroundColor: colorEstado[mesa.estado] }}>
              {mesa.estado.toUpperCase()}
            </div>
            <div className="botones-estado">
              {['disponible', 'ocupada', 'reservada'].map(estado => (
                <button
                  key={estado}
                  className={`btn-estado ${mesa.estado === estado ? 'activo' : ''}`}
                  onClick={() => cambiarEstado(mesa.id_mesa, estado)}
                >
                  {estado.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
