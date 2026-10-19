import { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_DOG_API_KEY
const BASE_URL = 'https://api.thedogapi.com/v1'

export default function Pets() {
  const [breeds, setBreeds] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadBreeds() {
      try {
        const res = await fetch(`${BASE_URL}/breeds`, {
          headers: { 'x-api-key': API_KEY },
        })
        if (!res.ok) throw new Error('No se pudieron cargar las razas')
        const data = await res.json()
        setBreeds(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadBreeds()
  }, [])

  const filtered = breeds.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p>Cargando razas...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <section>
      <h2>Razas de perros</h2>

      <div className="search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca una raza (ej. Husky, Terrier, Bulldog)"
        />
      </div>

      {filtered.length === 0 && <p>No se encontraron razas.</p>}

      <div className="grid">
        {filtered.map((b) => (
          <article className="card" key={b.id}>
            {b.image?.url ? (
              <img src={b.image.url} alt={b.name} loading="lazy" />
            ) : (
              <div className="no-poster">Sin foto</div>
            )}
            <div className="card-body">
              <h3>{b.name}</h3>
              <p>Vida: {b.life_span || 'sin datos'}</p>
              <p>Temperamento: {b.temperament || 'sin datos'}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}