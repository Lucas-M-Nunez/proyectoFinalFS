import { useState } from 'react'
import './App.css'
import CreadorPedidos from './components/CreadorPedidos'
import PanelComandas from './components/PanelComandas'
import GestorProductos from './components/GestorProductos'
import GestorMesas from './components/GestorMesas'
import GestorUsuarios from './components/GestorUsuarios'

function App() {
  const [usuarioActual, setUsuarioActual] = useState(null)
  const [rol, setRol] = useState('cajero') // opciones: dueño, cajero, mozo, barista
  const [seccionActual, setSeccionActual] = useState('pedidos')
  // const [loginFormulario, setLoginFormulario] = useState({ usuario: '', password: '' })

  // Simular login (en producción, esto vendría del backend)
  const handleLogin = (rolSeleccionado) => {
    setRol(rolSeleccionado)
    setUsuarioActual({ id: 1, nombre: 'Usuario', rol: rolSeleccionado })
    // setLoginFormulario({ usuario: '', password: '' })
  }

  const handleLogout = () => {
    setUsuarioActual(null)
    setRol(null)
  }

  // Si no está logueado, mostrar login
  if (!usuarioActual) {
    return (
      <div className="pantalla-login">
        <div className="contenedor-login">
          <h1>☕ POS CAFETERÍA</h1>
          <p>Sistema de Comandas</p>
          
          <div className="opciones-rol">
            <h3>Selecciona tu rol:</h3>
            <button className="btn-login" onClick={() => handleLogin('dueño')}>
              👑 DUEÑO
            </button>
            <button className="btn-login" onClick={() => handleLogin('cajero')}>
              💵 CAJERO
            </button>
            <button className="btn-login" onClick={() => handleLogin('mozo')}>
              🚶 MOZO
            </button>
            <button className="btn-login" onClick={() => handleLogin('barista')}>
              ☕ BARISTA
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Menú según rol
  const menuPorRol = {
    dueño: [
      { label: '📦 Productos', id: 'productos' },
      { label: '🪑 Mesas', id: 'mesas' },
      { label: '👥 Usuarios', id: 'usuarios' },
      { label: '📊 Comandas', id: 'comandas' }
    ],
    cajero: [
      { label: '🛒 Nuevo Pedido', id: 'pedidos' },
      { label: '📊 Comandas', id: 'comandas' }
    ],
    mozo: [
      { label: '🛒 Nuevo Pedido', id: 'pedidos' },
      { label: '📊 Comandas', id: 'comandas' }
    ],
    barista: [
      { label: '📊 Comandas', id: 'comandas' }
    ]
  }

  return (
    <div className="app-container">
      {/* Encabezado */}
      <header className="encabezado">
        <div className="logo-header">
          <h1>☕ POS CAFETERÍA</h1>
        </div>
        <div className="usuario-info">
          <span className="rol-badge">{rol.toUpperCase()}</span>
          <button className="btn-logout" onClick={handleLogout}>🚪 Salir</button>
        </div>
      </header>

      {/* Menú Lateral */}
      <div className="contenedor-principal">
        <nav className="menu-lateral">
          <h3>Menú</h3>
          {menuPorRol[rol].map(item => (
            <button
              key={item.id}
              className={`menu-item ${seccionActual === item.id ? 'activo' : ''}`}
              onClick={() => setSeccionActual(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Contenido Principal */}
        <main className="contenido-principal">
          {seccionActual === 'pedidos' && <CreadorPedidos />}
          {seccionActual === 'comandas' && <PanelComandas rol={rol} />}
          {seccionActual === 'productos' && rol === 'dueño' && <GestorProductos />}
          {seccionActual === 'mesas' && rol === 'dueño' && <GestorMesas />}
          {seccionActual === 'usuarios' && rol === 'dueño' && <GestorUsuarios />}
        </main>
      </div>
    </div>
  )
}

export default App
