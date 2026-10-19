import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="hero">
      <h2>Conoce a tu próximo mejor amigo</h2>
      <p>Explora razas de perros con su foto, esperanza de vida y temperamento, y crea tu cuenta.</p>
      <div className="hero-buttons">
        <Link className="btn" to="/razas">Ver razas</Link>
        <Link className="btn btn-outline" to="/registro">Crear cuenta</Link>
      </div>
    </section>
  )
}