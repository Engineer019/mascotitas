import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Pets from './pages/Pets.jsx'

export default function App() {
  return (
    <>
      <header className="navbar">
        <h1 className="logo">Patitas</h1>
        <nav>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/razas">Razas</NavLink>
          <NavLink to="/registro">Registro</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/razas" element={<Pets />} />
          <Route path="/registro" element={<Register />} />
        </Routes>
      </main>

      <footer className="footer">Datos e imágenes proporcionados por The Dog API.</footer>
    </>
  )
}