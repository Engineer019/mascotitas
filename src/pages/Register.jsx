import { useState } from 'react'

const initialForm = { nombre: '', correo: '', password: '', confirmar: '' }

const fields = [
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'correo', label: 'Correo electrónico', type: 'email' },
  { name: 'password', label: 'Contraseña', type: 'password' },
  { name: 'confirmar', label: 'Confirmar contraseña', type: 'password' },
]

function validate(form) {
  const errors = {}

  if (form.nombre.trim().length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres'
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(form.nombre.trim())) {
    errors.nombre = 'El nombre solo puede tener letras y espacios'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
    errors.correo = 'Escribe un correo válido (ej. nombre@correo.com)'
  }

  if (form.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres'
  } else if (!/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
    errors.password = 'Debe incluir al menos una mayúscula y un número'
  }

  if (form.confirmar !== form.password) {
    errors.confirmar = 'Las contraseñas no coinciden'
  }

  return errors
}

export default function Register() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSuccess(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate(form)
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Demo sin servidor: se guarda solo nombre y correo, NUNCA la contraseña
      localStorage.setItem(
        'usuario',
        JSON.stringify({ nombre: form.nombre.trim(), correo: form.correo })
      )
      setForm(initialForm)
      setSuccess(true)
    }
  }

  return (
    <section className="form-box">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit} noValidate>
        {fields.map((f) => (
          <label key={f.name}>
            {f.label}
            <input
              name={f.name}
              type={f.type}
              value={form[f.name]}
              onChange={handleChange}
            />
            {errors[f.name] && <span className="error">{errors[f.name]}</span>}
          </label>
        ))}
        <button className="btn" type="submit">Registrarme</button>
      </form>
      {success && <p className="success">¡Registro exitoso! Bienvenido a MascotasApp.</p>}
    </section>
  )
}