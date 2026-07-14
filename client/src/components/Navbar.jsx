import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const NAV_LINKS = [
  { label: 'Inicio', to: '/#inicio' },
  { label: 'Áreas legales', to: '/#areas' },
  { label: 'Cómo funciona', to: '/#como-funciona' },
  { label: 'Aviso legal', to: '/#aviso-legal' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const goToSection = (to) => {
    setOpen(false)
    const [path, hash] = to.split('#')
    if (window.location.pathname !== (path || '/')) {
      navigate(to)
      return
    }
    if (hash) {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary font-semibold text-lg">
          <img src={logo} alt="Legaltech" className="h-9 w-auto" />
          Legaltech
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => goToSection(link.to)}
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/chat"
            className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded hover:bg-slate-800 transition-colors"
          >
            Iniciar consulta
          </Link>
        </div>

        <button
          className="md:hidden text-gray-600 p-2"
          aria-label="Abrir menú"
          onClick={() => setOpen(o => !o)}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => goToSection(link.to)}
              className="text-left text-sm text-gray-600 hover:text-primary py-2"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/chat"
            onClick={() => setOpen(false)}
            className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded text-center mt-1"
          >
            Iniciar consulta
          </Link>
        </div>
      )}
    </header>
  )
}
