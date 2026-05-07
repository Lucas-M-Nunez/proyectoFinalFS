import { useState, useEffect } from 'react';
import APIService from '../services/apiService';

export default function GestorProductos() {
  const [productos, setProductos] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: '', descripcion: '', precio: '' });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const datos = await APIService.getProductos();
    setProductos(datos);
  };

  const guardar = async () => {
    if (!formulario.nombre || !formulario.precio) {
      alert('Completa nombre y precio');
      return;
    }

    if (editando) {
      await APIService.actualizarProducto(
        editando,
        formulario.nombre,
        formulario.descripcion,
        parseFloat(formulario.precio)
      );
      setEditando(null);
    } else {
      await APIService.crearProducto(
        formulario.nombre,
        formulario.descripcion,
        parseFloat(formulario.precio)
      );
    }

    setFormulario({ nombre: '', descripcion: '', precio: '' });
    cargarProductos();
  };

  const eliminar = async (id) => {
    if (confirm('¿Eliminar producto?')) {
      await APIService.eliminarProducto(id);
      cargarProductos();
    }
  };

  const editar = (producto) => {
    setFormulario({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio
    });
    setEditando(producto.id_producto);
  };

  return (
    <div className="gestor-productos">
      <h2>📦 Gestión de Productos</h2>

      <div className="formulario-producto">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={formulario.nombre}
          onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={formulario.descripcion}
          onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={formulario.precio}
          onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })}
          step="0.01"
        />
        <button className="btn-grande btn-verde" onClick={guardar}>
          {editando ? '✎ ACTUALIZAR' : '➕ CREAR'}
        </button>
        {editando && (
          <button className="btn-grande btn-gris" onClick={() => {
            setEditando(null);
            setFormulario({ nombre: '', descripcion: '', precio: '' });
          }}>
            CANCELAR
          </button>
        )}
      </div>

      <div className="tabla-productos">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id_producto}>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>${p.precio}</td>
                <td>
                  <button className="btn-pequeño btn-azul" onClick={() => editar(p)}>
                    ✎ Editar
                  </button>
                  <button className="btn-pequeño btn-rojo" onClick={() => eliminar(p.id_producto)}>
                    ✕ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
