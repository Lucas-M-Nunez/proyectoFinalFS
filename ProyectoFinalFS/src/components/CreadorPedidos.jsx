import { useState, useEffect } from 'react';
import APIService from '../services/apiService';

export default function CreadorPedidos() {
  const [pedidoActual, setPedidoActual] = useState(null);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [usuarioActual] = useState(1); // Usuario logueado
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

useEffect(() => {
  APIService.getProductos().then(setProductos);
}, []);

  const crearPedido = async () => {
    const nuevo = await APIService.crearPedido(usuarioActual, mesaSeleccionada);
    setPedidoActual(nuevo);
    setCarrito([]);
  };

const agregarAlCarrito = async (producto) => {
  if (!pedidoActual) {
    alert('Crea un pedido primero');
    return;
  }

  const detalle = await APIService.agregarProductoAlPedido(
    pedidoActual.id_pedido,
    producto.id_producto,
    1,
    producto.precio
  );

  setCarrito([
    ...carrito,
    {
      ...producto,
      id_detalle: detalle.id_detalle
    }
  ]);
};

  const removerDelCarrito = async (id_detalle) => {
    await APIService.removerProductoDePedido(id_detalle);
    setCarrito(carrito.filter(p => p.id_detalle !== id_detalle));
  };

  const total = carrito.reduce((sum, p) => sum + p.precio, 0);

  return (
    <div className="creador-pedidos">
      <div className="panel-productos">
        <h3>📋 Productos Disponibles</h3>
        <div className="grid-productos">
          {productos.map(p => (
            <button
              key={p.id_producto}
              className="btn-producto"
              onClick={() => agregarAlCarrito(p)}
            >
              <div className="nombre">{p.nombre}</div>
              <div className="precio">${p.precio}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="panel-pedido">
        <h3>🛒 Pedido Actual</h3>
        
        {!pedidoActual ? (
          <div className="area-crear">
            <button className="btn-grande btn-verde" onClick={crearPedido}>
              ➕ NUEVO PEDIDO
            </button>
          </div>
        ) : (
          <>
            <div className="info-pedido">
              <p>Pedido: #{pedidoActual.id_pedido}</p>
              <p>Estado: <strong>{pedidoActual.estado}</strong></p>
            </div>

            <div className="lista-carrito">
              {carrito.length === 0 ? (
                <p className="vacio">Sin productos aún</p>
              ) : (
                carrito.map(p => (
                  <div key={p.id_detalle} className="item-carrito">
                    <span>{p.nombre}</span>
                    <span className="precio">${p.precio}</span>
                    <button
                      className="btn-remover"
                      onClick={() => removerDelCarrito(p.id_detalle)}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="total">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>

            <div className="botones-accion">
              <button className="btn-grande btn-verde" onClick={() => {}}>
                ✓ COBRAR
              </button>
              <button className="btn-grande btn-rojo" onClick={() => {
                setPedidoActual(null);
                setCarrito([]);
              }}>
                ✕ CANCELAR
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
