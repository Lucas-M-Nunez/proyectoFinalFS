// Servicio API
const API_URL = 'http://localhost:3001/api';

class APIService {
  // Productos
  static async getProductos() {
    const res = await fetch(`${API_URL}/productos`);
    return res.json();
  }

  static async crearProducto(nombre, descripcion, precio) {
    const res = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, descripcion, precio })
    });
    return res.json();
  }

  static async actualizarProducto(id, nombre, descripcion, precio) {
    const res = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, descripcion, precio })
    });
    return res.json();
  }

  static async eliminarProducto(id) {
    const res = await fetch(`${API_URL}/productos/${id}`, { method: 'DELETE' });
    return res.json();
  }

  // Pedidos
  static async getPedidos(estado = null) {
    let url = `${API_URL}/pedidos`;
    if (estado) url += `?estado=${estado}`;
    const res = await fetch(url);
    return res.json();
  }

  static async crearPedido(id_usuario, id_mesa = null) {
    const res = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_usuario, id_mesa })
    });
    return res.json();
  }

  static async obtenerPedido(id) {
    const res = await fetch(`${API_URL}/pedidos/${id}`);
    return res.json();
  }

  static async agregarProductoAlPedido(id_pedido, id_producto, cantidad, precio_unitario) {
    const res = await fetch(`${API_URL}/pedidos/${id_pedido}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_producto, cantidad, precio_unitario })
    });
    return res.json();
  }

  static async cambiarEstadoPedido(id_pedido, estado) {
    const res = await fetch(`${API_URL}/pedidos/${id_pedido}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado })
    });
    return res.json();
  }

  static async removerProductoDePedido(id_detalle) {
    const res = await fetch(`${API_URL}/pedidos/detalle/${id_detalle}`, { method: 'DELETE' });
    return res.json();
  }

  // Usuarios
  static async getUsuarios() {
    const res = await fetch(`${API_URL}/usuarios`);
    return res.json();
  }

  static async getUsuariosPorRol(rol) {
    const res = await fetch(`${API_URL}/usuarios/rol/${rol}`);
    return res.json();
  }

  static async crearUsuario(nombre, apellido, rol, contraseña) {
    const res = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, rol, contraseña })
    });
    return res.json();
  }

  // Mesas
  static async getMesas() {
    const res = await fetch(`${API_URL}/mesas`);
    return res.json();
  }

  static async crearMesa(numero, capacidad) {
    const res = await fetch(`${API_URL}/mesas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero, capacidad })
    });
    return res.json();
  }

  static async cambiarEstadoMesa(id, estado) {
    const res = await fetch(`${API_URL}/mesas/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado })
    });
    return res.json();
  }

  // Pagos
  static async crearFactura(id_pedido, tipo = 'venta') {
    const res = await fetch(`${API_URL}/pagos/factura`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_pedido, tipo })
    });
    return res.json();
  }

  static async registrarPago(id_factura, metodo, monto) {
    const res = await fetch(`${API_URL}/pagos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_factura, metodo, monto })
    });
    return res.json();
  }

  static async getPagosPorFactura(id_factura) {
    const res = await fetch(`${API_URL}/pagos/factura/${id_factura}`);
    return res.json();
  }

  // Promociones
  static async getPromos() {
    const res = await fetch(`${API_URL}/promos`);
    return res.json();
  }

  static async crearPromo(nombre, precio) {
    const res = await fetch(`${API_URL}/promos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, precio })
    });
    return res.json();
  }
}

export default APIService;
