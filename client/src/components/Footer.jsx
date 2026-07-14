import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row justify-between gap-6">
        <div>
          <Link to="/" className="flex items-center gap-2 text-primary font-semibold">
            <img src={logo} alt="Legaltech" className="h-6 w-auto" />
            Legaltech
          </Link>
          <p className="mt-2 text-xs text-gray-500 max-w-xs">
            Legaltech · Proyecto académico/educativo · No sustituye la consulta con un abogado colegiado
          </p>
        </div>

        <div className="flex items-start">
          <a href="/#aviso-legal" className="text-sm text-gray-600 hover:text-primary">
            Aviso Legal
          </a>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-gray-400">
          <span>© {year} Legaltech Perú</span>
          <span>Impulsado por Llama 3.3 (Groq API)</span>
        </div>
      </div>
    </footer>
  )
}
