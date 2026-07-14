import React from 'react'
import { PencilIcon, WarningIcon } from './icons'
import banner from '../assets/legaltech-banner.png'

export default function ChatSidebar() {
  return (
    <aside className="lg:w-72 shrink-0 space-y-4">
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-2 text-gray-900 font-semibold">
          <PencilIcon className="w-5 h-5 text-primary" />
          Prototipo Educativo
        </div>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Este chat utiliza inteligencia artificial para fines exclusivamente pedagógicos y
          formativos en el derecho peruano.
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-5">
        <div className="flex items-center gap-2 text-red-700 font-semibold">
          <WarningIcon className="w-5 h-5" />
          Aviso Legal
        </div>
        <p className="mt-2 text-sm text-red-700/90 leading-relaxed">
          Las respuestas generadas no constituyen asesoría legal profesional. No sustituyen la
          consulta con un abogado colegiado. Use esta información como guía académica inicial.
        </p>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-200 h-40 hidden sm:block">
        <img src={banner} alt="" className="w-full h-full object-cover grayscale" />
      </div>
    </aside>
  )
}
