import { useState, useEffect } from 'react';
import APIService from '../services/apiService';

export default function PanelComandas({ rol }) {
  const [pedidos, setPedidos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('pendiente');

  useEffect(() => {
    cargarPedidos();
    const interval = setInterval(cargarPedidos, 3000); // Actualizar cada 3 segundos
    return () => clearInterval(interval);
  }, [filtroEstado]);

  const cargarPedidos = async () => {
    const datos = await APIService.getPedidos(filtroEstado);
    setPedidos(datos);
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    await APIService.cambiarEstadoPedido(id, nuevoEstado);
    cargarPedidos();
  };

  const estadosSiguientes = {
    'pendiente': 'en_proceso',
    'en_proceso': 'listo',
    'listo': 'completado'
  };

  return (
    <div className="panel-comandas">
      <h2>📊 Panel de Comandas</h2>

      <div className="filtros">
        {['pendiente', 'en_proceso', 'listo', 'completado'].map(estado => (
          <button
            key={estado}
            className={`btn-filtro ${filtroEstado === estado ? 'activo' : ''}`}
            onClick={() => setFiltroEstado(estado)}
          >
            {estado.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid-comandas">
        {pedidos.length === 0 ? (
          <p className="sin-pedidos">Sin pedidos en estado: {filtroEstado}</p>
        ) : (
          pedidos.map(pedido => (
            <div key={pedido.id_pedido} className="tarjeta-comanda">
              <div className="encabezado">
                <strong>#{pedido.id_pedido}</strong>
                <span className={`estado ${pedido.estado}`}>{pedido.estado.toUpperCase()}</span>
              </div>

              <div className="contenido">
                <p><strong>Total:</strong> ${pedido.total.toFixed(2)}</p>
                <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleTimeString()}</p>
              </div>

              <div className="detalles">
                {pedido.detalles && pedido.detalles.map(d => (
                  <div key={d.id_detalle} className="detalle-item">
                    x{d.cantidad} - ${(d.subtotal).toFixed(2)}
                  </div>
                ))}
              </div>

              {rol === 'barista' && pedido.estado !== 'completado' && (
                <button
                  className="btn-grande btn-verde"
                  onClick={() => cambiarEstado(pedido.id_pedido, estadosSiguientes[pedido.estado])}
                >
                  SIGUIENTE ESTADO →
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
