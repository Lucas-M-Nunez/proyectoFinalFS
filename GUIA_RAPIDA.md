# 🚀 GUÍA RÁPIDA DE INICIO

## 1️⃣ CONFIGURACIÓN INICIAL (5 minutos)

### Base de Datos
```bash
# Abrir MySQL Workbench o terminal MySQL
mysql -u root -p

# Ejecutar script
SOURCE database/schema.sql;

# Verificar
USE pos_cafeteria;
SHOW TABLES;
```

### Backend
```bash
cd backend

# Crear .env
copy .env.example .env

# Editar .env con tu contraseña MySQL
# DB_PASSWORD=tu_contraseña

# Instalar y ejecutar
npm install
npm run dev
```

✅ Backend en: http://localhost:3001/api/health

### Frontend
```bash
cd ProyectoFinalFS

npm install
npm run dev
```

✅ Frontend en: http://localhost:5173

---

## 2️⃣ PRIMER INICIO (3 minutos)

1. Abre http://localhost:5173
2. Selecciona rol **CAJERO** (para pruebas rápidas)
3. Haz clic en **🛒 Nuevo Pedido**
4. Agrega productos haciendo clic en los botones
5. Haz clic en **✓ COBRAR** para finalizar

---

## 3️⃣ EXPLORAR FUNCIONES

### Como DUEÑO 👑
- **Gestión de Productos**: Agrega, edita, elimina bebidas/comidas
- **Mesas**: Crea mesas y cambia su estado
- **Usuarios**: Crea empleados con diferentes roles
- **Comandas**: Ve todos los pedidos en tiempo real

### Como BARISTA ☕
- Ve comandas pendientes
- Cambia estado: Pendiente → En Proceso → Listo → Completado

### Como MOZO 🚶
- Crea pedidos asociados a mesas
- Ve estado de los pedidos

---

## 4️⃣ DATOS DE PRUEBA

**Usuarios creados automáticamente**:
- Juan Pérez (Dueño)
- María García (Cajero)
- Carlos López (Mozo)
- Ana Martínez (Barista)

**Productos de ejemplo**: 12 bebidas y alimentos

**Mesas**: 6 mesas de diferentes capacidades

**Promos**: 3 combinaciones básicas

---

## 5️⃣ PRUEBAS RECOMENDADAS

✅ Crear pedido → Agregar productos → Cambiar estado → Ver en Panel
✅ Crear producto nuevo → Agregarlo al pedido
✅ Cambiar entre roles → Ver diferencias de funciones
✅ Ver actualizaciones en tiempo real (abre en 2 pestañas)

---

## ⚡ COMANDOS RÁPIDOS

```bash
# Backend
cd backend && npm run dev

# Frontend  
cd ProyectoFinalFS && npm run dev

# Abrir ambos al mismo tiempo (Windows - Power Shell)
Start-Process npm -ArgumentList "run dev" -WorkingDirectory "./backend"
Start-Process npm -ArgumentList "run dev" -WorkingDirectory "./ProyectoFinalFS"
```

---

## 🆘 PROBLEMAS COMUNES

| Problema | Solución |
|----------|----------|
| No conecta a BD | Verificar MySQL está activo: `net start MySQL80` |
| Error CORS | Revisar FRONTEND_URL en backend/.env |
| Puerto ocupado | Cambiar en .env o: `netstat -ano \| findstr :3001` |
| Módulos no encontrados | Ejecutar `npm install` en backend y ProyectoFinalFS |

---

## 📞 ¿Necesitas ayuda?

- Revisa los READMEs en cada carpeta
- Verifica la consola del navegador (F12)
- Revisa logs del servidor backend
- Consulta la documentación de API en README_COMPLETO.md
