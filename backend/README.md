# 📂 Backend - Sistema POS Cafetería

## Descripción
Backend Express.js para sistema de gestión de comandas (POS) de cafetería.

## Instalación

### 1. Instalar dependencias
```bash
cd backend
npm install
```

### 2. Configurar base de datos
- Crear archivo `.env` basado en `.env.example`
- Ejecutar script SQL: `database/schema.sql` en MySQL Workbench
- Actualizar credenciales en `.env`

### 3. Iniciar servidor
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js       # Conexión a MySQL
│   ├── controllers/
│   │   ├── productoController.js
│   │   ├── pedidoController.js
│   │   ├── usuarioController.js
│   │   ├── mesaController.js
│   │   ├── pagoController.js
│   │   └── promoController.js
│   ├── models/
│   │   ├── Producto.js
│   │   ├── Pedido.js
│   │   ├── Usuario.js
│   │   ├── Mesa.js
│   │   ├── Pago.js
│   │   └── Promo.js
│   ├── routes/
│   │   ├── productos.js
│   │   ├── pedidos.js
│   │   ├── usuarios.js
│   │   ├── mesas.js
│   │   ├── pagos.js
│   │   └── promos.js
│   └── server.js             # Punto de entrada
├── .env.example
├── package.json
└── README.md
```

## API Endpoints

### Productos
- `GET /api/productos` - Listar todos
- `GET /api/productos/:id` - Obtener uno
- `POST /api/productos` - Crear
- `PUT /api/productos/:id` - Actualizar
- `DELETE /api/productos/:id` - Desactivar

### Pedidos
- `GET /api/pedidos` - Listar todos (con filtro por estado)
- `GET /api/pedidos/:id` - Obtener uno
- `POST /api/pedidos` - Crear nuevo
- `POST /api/pedidos/:id_pedido/productos` - Agregar producto
- `PUT /api/pedidos/:id_pedido/status` - Cambiar estado
- `DELETE /api/pedidos/detalle/:id_detalle` - Remover producto

### Usuarios
- `GET /api/usuarios` - Listar todos
- `GET /api/usuarios/:id` - Obtener uno
- `GET /api/usuarios/rol/:rol` - Listar por rol
- `POST /api/usuarios` - Crear
- `PUT /api/usuarios/:id` - Actualizar
- `DELETE /api/usuarios/:id` - Desactivar

### Mesas
- `GET /api/mesas` - Listar todas
- `GET /api/mesas/:id` - Obtener una
- `POST /api/mesas` - Crear
- `PUT /api/mesas/:id/status` - Cambiar estado
- `DELETE /api/mesas/:id` - Eliminar

### Pagos
- `GET /api/pagos` - Listar todos
- `GET /api/pagos/factura/:id_factura` - Obtener por factura
- `POST /api/pagos` - Crear pago
- `POST /api/pagos/factura` - Crear factura

### Promociones
- `GET /api/promos` - Listar todas
- `GET /api/promos/:id` - Obtener una
- `POST /api/promos` - Crear
- `PUT /api/promos/:id` - Actualizar
- `DELETE /api/promos/:id` - Desactivar

## Tecnologías
- Node.js + Express.js
- MySQL 2 (mysql2/promise)
- CORS habilitado para frontend

## Variables de Entorno (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=pos_cafeteria
DB_PORT=3306
SERVER_PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```
