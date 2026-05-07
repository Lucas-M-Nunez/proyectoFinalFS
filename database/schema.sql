-- Crear Base de Datos
CREATE DATABASE IF NOT EXISTS pos_cafeteria;
USE pos_cafeteria;

-- Tabla Producto
CREATE TABLE IF NOT EXISTS Producto (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  activo BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Stock
CREATE TABLE IF NOT EXISTS Stock (
  id_stock INT PRIMARY KEY AUTO_INCREMENT,
  id_producto INT NOT NULL UNIQUE,
  cantidad INT DEFAULT 0,
  stock_minimo INT DEFAULT 5,
  FOREIGN KEY (id_producto) REFERENCES Producto(id_producto) ON DELETE CASCADE
);

-- Tabla Usuario
CREATE TABLE IF NOT EXISTS Usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50),
  rol ENUM('dueño', 'cajero', 'mozo', 'barista') NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  activo BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Mesa
CREATE TABLE IF NOT EXISTS Mesa (
  id_mesa INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL UNIQUE,
  capacidad INT NOT NULL,
  estado ENUM('disponible', 'ocupada', 'reservada') DEFAULT 'disponible'
);

-- Tabla Pedido
CREATE TABLE IF NOT EXISTS Pedido (
  id_pedido INT PRIMARY KEY AUTO_INCREMENT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) DEFAULT 0,
  estado ENUM('pendiente', 'en_proceso', 'listo', 'completado') DEFAULT 'pendiente',
  id_usuario INT NOT NULL,
  id_mesa INT,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
  FOREIGN KEY (id_mesa) REFERENCES Mesa(id_mesa) ON DELETE SET NULL
);

-- Tabla Promo
CREATE TABLE IF NOT EXISTS Promo (
  id_promo INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  activo BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Detalle (Detalles del Pedido)
CREATE TABLE IF NOT EXISTS Detalle (
  id_detalle INT PRIMARY KEY AUTO_INCREMENT,
  id_pedido INT NOT NULL,
  tipo_item ENUM('producto', 'promo') DEFAULT 'producto',
  id_producto INT,
  id_promo INT,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido) ON DELETE CASCADE,
  FOREIGN KEY (id_producto) REFERENCES Producto(id_producto) ON DELETE SET NULL,
  FOREIGN KEY (id_promo) REFERENCES Promo(id_promo) ON DELETE SET NULL
);

-- Tabla Detalle_Promo (Productos en Promociones)
CREATE TABLE IF NOT EXISTS Detalle_Promo (
  id_detalle_promo INT PRIMARY KEY AUTO_INCREMENT,
  id_producto INT NOT NULL,
  id_promo INT NOT NULL,
  cantidad INT DEFAULT 1,
  FOREIGN KEY (id_producto) REFERENCES Producto(id_producto) ON DELETE CASCADE,
  FOREIGN KEY (id_promo) REFERENCES Promo(id_promo) ON DELETE CASCADE,
  UNIQUE KEY unique_promo_producto (id_promo, id_producto)
);

-- Tabla Factura
CREATE TABLE IF NOT EXISTS Factura (
  id_factura INT PRIMARY KEY AUTO_INCREMENT,
  id_pedido INT NOT NULL UNIQUE,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  tipo ENUM('venta', 'devolución') DEFAULT 'venta',
  FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido) ON DELETE CASCADE
);

-- Tabla Pago
CREATE TABLE IF NOT EXISTS Pago (
  id_pago INT PRIMARY KEY AUTO_INCREMENT,
  id_factura INT NOT NULL,
  metodo ENUM('efectivo', 'tarjeta', 'mercado_pago', 'transferencia') NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_factura) REFERENCES Factura(id_factura) ON DELETE CASCADE
);

-- Crear Índices
CREATE INDEX idx_pedido_estado ON Pedido(estado);
CREATE INDEX idx_pedido_usuario ON Pedido(id_usuario);
CREATE INDEX idx_pedido_fecha ON Pedido(fecha);
CREATE INDEX idx_detalle_pedido ON Detalle(id_pedido);
CREATE INDEX idx_pago_factura ON Pago(id_factura);

-- Datos de prueba: Productos
INSERT INTO Producto (nombre, descripcion, precio) VALUES
('Café Espresso', 'Café espresso tradicional', 2.50),
('Café con Leche', 'Café con leche caliente', 3.00),
('Cappuccino', 'Cappuccino con espuma', 3.50),
('Café Americano', 'Café americano', 2.75),
('Té Negro', 'Té negro caliente', 2.00),
('Té Verde', 'Té verde surtido', 2.00),
('Chocolate Caliente', 'Chocolate caliente', 3.25),
('Croissant', 'Croissant francés', 2.50),
('Medialuna', 'Medialuna de manteca', 1.50),
('Sandwich de Jamón y Queso', 'Sandwich tostado', 4.50),
('Ensalada César', 'Ensalada fresca', 5.50),
('Tarta de Manzana', 'Porción de tarta', 3.75);

-- Datos de prueba: Stock
INSERT INTO Stock (id_producto, cantidad, stock_minimo) VALUES
(1, 50, 5),
(2, 50, 5),
(3, 40, 5),
(4, 45, 5),
(5, 30, 5),
(6, 30, 5),
(7, 35, 5),
(8, 20, 5),
(9, 25, 5),
(10, 15, 5),
(11, 10, 5),
(12, 12, 5);

-- Datos de prueba: Usuarios
INSERT INTO Usuario (nombre, apellido, rol, contraseña) VALUES
('Juan', 'Pérez', 'dueño', 'admin123'),
('María', 'García', 'cajero', 'cajero123'),
('Carlos', 'López', 'mozo', 'mozo123'),
('Ana', 'Martínez', 'barista', 'barista123');

-- Datos de prueba: Mesas
INSERT INTO Mesa (numero, capacidad) VALUES
(1, 2),
(2, 4),
(3, 4),
(4, 6),
(5, 2),
(6, 8);

-- Datos de prueba: Promos
INSERT INTO Promo (nombre, precio) VALUES
('Combo Mañana (Café + Medialuna)', 3.50),
('Promo 2x1 Sándwiches', 4.50),
('Combo Tarde (Té + Tarta)', 5.00);
