# ☕ POS CAFETERÍA - Sistema de Comandas

Sistema de gestión de pedidos (comandas) para cafeterías y carritos de café, desarrollado con **React.js + Vite** (Frontend) y **Node.js + Express** (Backend), con base de datos **MySQL**.

## 📋 Descripción General

Aplicación web POS (Point of Sale) minimalista y funcional diseñada para uso interno en cafeterías pequeñas, carritos de café o establecimientos de comida rápida.

### ✨ Características Principales

- **Gestión de Pedidos**: Crear, editar y seguimiento de comandas en tiempo real
- **Control de Productos**: Catálogo dinámico de bebidas, alimentos y promociones
- **Panel de Comandas**: Visualización por estados (pendiente, en proceso, listo)
- **Roles de Usuario**: Dueño, Cajero, Mozo, Barista
- **Sistema de Pagos**: Múltiples métodos (efectivo, tarjeta, Mercado Pago)
- **Gestión de Mesas**: Control de disponibilidad y estado
- **Interfaz Táctil**: Diseño optimizado para tablets y dispositivos móviles
- **Tiempo Real**: Actualizaciones automáticas de estados
- **Historial**: Registro de pedidos completados

---

## 🏗️ Estructura del Proyecto

```
proyectoFinalFS/
├── backend/                    # Servidor Express.js
│   ├── src/
│   │   ├── config/            # Configuración de BD
│   │   ├── controllers/       # Lógica de negocio
│   │   ├── models/           # Modelos de datos
│   │   ├── routes/           # Rutas API
│   │   └── server.js         # Punto de entrada
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── ProyectoFinalFS/           # Frontend React + Vite
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── services/         # Servicios API
│   │   ├── App.jsx          # Componente principal
│   │   ├── App.css          # Estilos
│   │   ├── index.css        # Estilos globales
│   │   └── main.jsx         # Punto de entrada
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── database/
│   └── schema.sql           # Script SQL para crear BD

└── README.md               # Este archivo
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- **Node.js** v16+ ([Descargar](https://nodejs.org/))
- **MySQL** 8.0+ ([Descargar](https://www.mysql.com/downloads/mysql/))
- **Git** (opcional)

### Paso 1: Configurar Base de Datos

1. **Abrir MySQL Workbench** o línea de comandos de MySQL
2. **Ejecutar el script SQL**:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
3. **Verificar** que se creó la base de datos `pos_cafeteria`

### Paso 2: Configurar Backend

1. **Navegar a carpeta backend**:
   ```bash
   cd backend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Crear archivo `.env`**:
   ```bash
   cp .env.example .env
   ```

4. **Editar `.env` con tus credenciales**:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña_mysql
   DB_NAME=pos_cafeteria
   DB_PORT=3306
   SERVER_PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. **Iniciar servidor backend** (desde carpeta `backend`):
   ```bash
   # Desarrollo (con nodemon)
   npm run dev

   # Producción
   npm start
   ```
   
   ✅ Backend activo en: `http://localhost:3001`

### Paso 3: Configurar Frontend

1. **Navegar a carpeta frontend** (en otra terminal):
   ```bash
   cd ProyectoFinalFS
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar servidor Vite**:
   ```bash
   npm run dev
   ```

   ✅ Frontend activo en: `http://localhost:5173`

---

## 📱 Uso del Sistema

### Acceso a la Aplicación

Abrir en el navegador: **http://localhost:5173**

### Pantalla de Login

Seleccionar rol:
- **👑 DUEÑO**: Acceso completo (productos, usuarios, mesas, comandas)
- **💵 CAJERO**: Crear pedidos y ver comandas
- **🚶 MOZO**: Crear pedidos desde mesas y ver comandas
- **☕ BARISTA**: Ver comandas y cambiar estados

### Funcionalidades por Rol

#### 🏪 DUEÑO
- 📦 **Gestión de Productos**: Crear, editar, eliminar
- 🪑 **Gestión de Mesas**: Crear mesas, cambiar estado
- 👥 **Gestión de Usuarios**: Crear cajeros, mozos, baristas
- 📊 **Panel de Comandas**: Ver todos los pedidos

#### 💵 CAJERO
- 🛒 **Nuevo Pedido**: Crear pedidos de mostrador
- 📊 **Ver Comandas**: Monitorear estado

#### 🚶 MOZO
- 🛒 **Nuevo Pedido**: Crear pedidos desde mesas
- 📊 **Ver Comandas**: Monitorear estado
- 🪑 **Seleccionar Mesa**: Asociar pedido a mesa

#### ☕ BARISTA
- 📊 **Panel de Comandas**: Ver pedidos pendientes
- ↔️ **Cambiar Estados**: pendiente → en_proceso → listo → completado

---

## 🔌 API REST - Endpoints Principales

### Productos
```
GET    /api/productos              # Listar todos
POST   /api/productos              # Crear
PUT    /api/productos/:id          # Actualizar
DELETE /api/productos/:id          # Desactivar
```

### Pedidos
```
GET    /api/pedidos                # Listar (con filtro estado)
POST   /api/pedidos                # Crear nuevo
GET    /api/pedidos/:id            # Obtener detalles
POST   /api/pedidos/:id/productos  # Agregar producto
PUT    /api/pedidos/:id/status     # Cambiar estado
DELETE /api/pedidos/detalle/:id    # Remover producto
```

### Usuarios
```
GET    /api/usuarios               # Listar todos
POST   /api/usuarios               # Crear
GET    /api/usuarios/rol/:rol      # Listar por rol
PUT    /api/usuarios/:id           # Actualizar
DELETE /api/usuarios/:id           # Desactivar
```

### Mesas
```
GET    /api/mesas                  # Listar todas
POST   /api/mesas                  # Crear
PUT    /api/mesas/:id/status       # Cambiar estado
DELETE /api/mesas/:id              # Eliminar
```

### Pagos & Facturas
```
GET    /api/pagos                  # Listar pagos
POST   /api/pagos                  # Registrar pago
POST   /api/pagos/factura          # Crear factura
```

---

## 🎨 Diseño UI/UX

### Colores
- 🟢 **Verde (#4CAF50)**: Acciones, confirmaciones
- 🔴 **Rojo (#f44336)**: Cancelar, eliminar
- 🔵 **Azul (#2196F3)**: Información
- ⚫ **Gris (#757575)**: Neutral

### Características de Diseño
- Interfaz minimalista tipo POS
- Botones grandes y táctiles (tablet-friendly)
- Flujo rápido con pocos clics
- Sin distracciones visuales
- Responsive para móvil, tablet y desktop

---

## 📊 Base de Datos

### Entidades Principales

| Tabla | Descripción |
|-------|-------------|
| **Producto** | Bebidas, alimentos disponibles |
| **Stock** | Cantidad y mínimo de productos |
| **Usuario** | Empleados con roles |
| **Mesa** | Mesas del establecimiento |
| **Pedido** | Comandas creadas |
| **Detalle** | Líneas de cada pedido |
| **Promo** | Promociones y combos |
| **Factura** | Comprobantes de pago |
| **Pago** | Métodos y montos pagados |

### Relaciones
```
Producto → Stock (1:1)
Usuario → Pedido (1:N)
Mesa → Pedido (1:N)
Pedido → Detalle (1:N)
Pedido → Factura (1:1)
Factura → Pago (1:N)
```

---

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 18** - Librería UI
- **Vite** - Build tool y dev server
- **CSS Puro** - Estilos sin dependencias
- **Fetch API** - Llamadas HTTP

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL 2/Promise** - Driver MySQL asíncrono
- **CORS** - Comunicación cross-origin
- **Dotenv** - Gestión de variables de entorno

### Base de Datos
- **MySQL 8.0+**
- **Relaciones normalizadas**
- **Índices optimizados**

---

## 🚀 Funcionalidades Futuras (Roadmap)

- [ ] **Firebase Integration**: Autenticación y sincronización en tiempo real
- [ ] **WebSocket**: Actualizaciones en vivo para múltiples usuarios
- [ ] **Estadísticas Dashboard**: Reportes y gráficos de ventas
- [ ] **Impresoras Remotas**: Imprimir comandas en cocina
- [ ] **Notificaciones**: Avisos para baristas y mozos
- [ ] **Multi-idioma**: Soporte EN/ES/PT
- [ ] **Backup Automático**: Respaldos de BD diarios
- [ ] **App Móvil Native**: React Native o Flutter

---

## 📝 Comandos Útiles

### Frontend
```bash
cd ProyectoFinalFS

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa de build
npm run preview

# Linting
npm run lint
```

### Backend
```bash
cd backend

# Instalar dependencias
npm install

# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

### Base de Datos
```bash
# Conectar a MySQL
mysql -u root -p

# Usar base de datos
USE pos_cafeteria;

# Ver tablas
SHOW TABLES;

# Respaldar BD
mysqldump -u root -p pos_cafeteria > backup.sql

# Restaurar BD
mysql -u root -p pos_cafeteria < backup.sql
```

---

## 🐛 Resolución de Problemas

### Error de conexión a BD
- **Problema**: `ECONNREFUSED` en puerto 3306
- **Solución**: Verificar que MySQL está corriendo
  ```bash
  # Windows
  net start MySQL80
  
  # Mac/Linux
  sudo service mysql start
  ```

### Error CORS
- **Problema**: `Access to XMLHttpRequest blocked`
- **Solución**: Verificar que `FRONTEND_URL` en `.env` del backend coincide con URL del frontend

### Puerto 3001/5173 en uso
- **Problema**: `EADDRINUSE`
- **Solución**: Cambiar puerto en `.env` o matar proceso:
  ```bash
  # Windows
  netstat -ano | findstr :3001
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:3001 | xargs kill -9
  ```

---

## 👨‍💻 Desarrolladores

- **Frontend**: React Developer
- **Backend**: Node.js Developer
- **Database**: DBA
- **UX/UI**: Design Team

---

## 📄 Licencia

Este proyecto está bajo licencia **MIT**. Libre para usar en proyectos personales y comerciales.

---

## 📞 Soporte

Para reportar bugs o sugerencias:
- 📧 Email: desarrolladores@cafeteria-pos.com
- 💬 GitHub Issues: [repo/issues]
- 🐦 Twitter: [@CafeteriaPOS]

---

## 📅 Historial de Cambios

### v1.0.0 (Inicial)
- ✅ Sistema básico de comandas
- ✅ Gestión de productos
- ✅ Roles de usuario
- ✅ Panel de comandas en tiempo real
- ✅ Sistema de pagos

---

**Última actualización**: 1 de Mayo de 2026

**Estado**: ✅ Funcional y Producción Ready
