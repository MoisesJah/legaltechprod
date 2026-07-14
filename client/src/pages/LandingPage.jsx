import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import banner from '../assets/legaltech-banner.png'
import { WarningIcon } from '../components/icons'

function ScaleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M5 7h14" />
      <path d="M5 7 2 13a3 3 0 0 0 6 0L5 7Z" />
      <path d="M19 7l-3 6a3 3 0 0 0 6 0l-3-6Z" />
    </svg>
  )
}

function BriefcaseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="3" y1="13" x2="21" y2="13" />
    </svg>
  )
}

function CartIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.8h8.6a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  )
}

function HomeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
    </svg>
  )
}

function UsersIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 14a5 5 0 0 1 5.5 5" />
    </svg>
  )
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function ArrowIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

const AREAS = [
  {
    icon: BriefcaseIcon,
    title: 'Derecho laboral',
    desc: 'Contratos, despidos, vacaciones, beneficios sociales y hostigamiento en el trabajo.'
  },
  {
    icon: CartIcon,
    title: 'Consumidor',
    desc: 'Reclamos por productos o servicios, garantías, publicidad engañosa y libro de reclamaciones.'
  },
  {
    icon: HomeIcon,
    title: 'Arrendamiento',
    desc: 'Contratos de alquiler, desalojos, depósitos de garantía y obligaciones entre arrendador e inquilino.'
  },
  {
    icon: UsersIcon,
    title: 'Familia (básico)',
    desc: 'Nociones generales sobre alimentos, tenencia y régimen de visitas, sin sustituir asesoría especializada.'
  }
]

const STEPS = [
  {
    title: 'Escribe tu consulta',
    desc: 'Describe tu situación legal en lenguaje simple, sin necesidad de conocer términos jurídicos.'
  },
  {
    title: 'Recibe una orientación clara',
    desc: 'El asistente responde en español, explicando conceptos generales de forma sencilla y estructurada.'
  },
  {
    title: 'Consulta a un abogado si lo necesitas',
    desc: 'Para casos complejos o de alto riesgo, el asistente te recomendará siempre acudir a un abogado colegiado.'
  }
]

const CHECKLIST = [
  'Gratuito, con fines educativos',
  'Disponible 24/7',
  'Basado en normativa peruana vigente'
]

const USERS = [
  {
    icon: UsersIcon,
    title: 'Ciudadanía en general',
    desc: 'Personas con dudas legales cotidianas que no cuentan con los recursos para pagar un abogado desde el primer momento.'
  },
  {
    icon: BriefcaseIcon,
    title: 'Trabajadores',
    desc: 'Empleados que buscan entender sus derechos laborales antes de tomar una decisión o presentar un reclamo.'
  },
  {
    icon: CartIcon,
    title: 'Consumidores',
    desc: 'Personas con reclamos por productos o servicios que desconocen qué proceso o entidad les corresponde.'
  },
  {
    icon: HomeIcon,
    title: 'Inquilinos y arrendadores',
    desc: 'Personas con dudas sobre contratos de alquiler, depósitos de garantía y obligaciones entre las partes.'
  }
]

const BENEFITS = [
  'Acceso gratuito e inmediato a orientación legal básica',
  'Disponible las 24 horas, sin necesidad de agendar cita',
  'Lenguaje simple, sin tecnicismos jurídicos',
  'Reduce la barrera inicial de acceso a la justicia',
  'Ayuda a preparar mejor una consulta antes de ver a un abogado real'
]

const LIMITATIONS = [
  'No sustituye la asesoría de un abogado colegiado',
  'No garantiza precisión en artículos o normas específicas',
  'No analiza documentos, contratos ni evidencia del caso',
  'No debe usarse para decisiones de alto riesgo o con plazos judiciales',
  'La calidad de la respuesta depende de cómo se formule la pregunta'
]

const MARKET_ADOPTERS = [
  'Consultorios jurídicos gratuitos y clínicas legales universitarias',
  'ONGs y programas de acceso a la justicia',
  'Colegios de abogados, como herramienta de orientación previa',
  'Estudios legales pequeños, como primer filtro de consultas frecuentes',
  'Municipalidades y plataformas de atención al ciudadano'
]

export default function LandingPage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <div>
      <section id="inicio" className="relative bg-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #dbe3ef 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 40%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 30%, black 40%, transparent 85%)'
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 py-20 sm:py-28 text-center">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-primary text-xs font-medium tracking-wide px-3 py-1.5 rounded-full">
            <ScaleIcon className="w-3.5 h-3.5" />
            ASISTENTE LEGAL VIRTUAL PERUANO
          </span>
          <h1 className="mt-6 text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Orientación legal clara, en lenguaje simple
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Legaltech es un asistente virtual que responde consultas legales básicas sobre derecho
            peruano: laboral, consumidor, arrendamiento y familia. Rápido, claro y gratuito.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-medium px-6 py-3 rounded-md hover:bg-slate-800 transition-colors w-full sm:w-auto"
            >
              Iniciar consulta gratuita
              <ArrowIcon className="w-4 h-4" />
            </Link>
            <a
              href="#aviso-legal"
              className="text-sm text-gray-600 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Leer aviso legal
            </a>
          </div>
        </div>
      </section>

      <section id="areas" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
            Áreas legales cubiertas
          </h2>
          <p className="mt-2 text-center text-gray-600 max-w-xl mx-auto">
            El asistente está orientado a un rango acotado de temas frecuentes en la vida cotidiana del ciudadano peruano.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AREAS.map(area => (
              <div key={area.title} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-3">
                  <area.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">{area.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="usuarios" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
          ¿Para quién es Legaltech?
        </h2>
        <p className="mt-2 text-center text-gray-600 max-w-xl mx-auto">
          Pensado para personas que necesitan una primera orientación legal, sin barreras de costo ni de tiempo.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USERS.map(user => (
            <div key={user.title} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-3">
                <user.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900">{user.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{user.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Cómo funciona el proceso
            </h2>
            <div className="mt-8 space-y-6">
              {STEPS.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-semibold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-[11px] text-gray-500 tracking-wide font-medium">INTERFAZ DE CONSULTA</span>
            </div>
            <div className="p-4 space-y-3 bg-gray-50">
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 max-w-[85%] shadow-sm">
                  ¡Hola! Soy tu asistente legal. ¿En qué puedo orientarte hoy sobre derecho peruano?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-white rounded-lg p-3 text-sm max-w-[85%] shadow-sm">
                  Mi empleador no me ha pagado la liquidación después de 48 horas de haber renunciado. ¿Qué debo hacer?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 max-w-[85%] shadow-sm">
                  Según la ley peruana, el pago de beneficios sociales debe realizarse dentro de las 48 horas del cese. Te sugiero enviar una carta notarial requiriendo el pago o acudir a SUNAFIL para iniciar una conciliación.
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 p-3 flex gap-2 bg-white">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-400">
                Escribe tu consulta legal aquí...
              </div>
              <span className="bg-primary text-white text-xs font-medium px-3 py-2 rounded">Enviar</span>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
          Beneficios, limitaciones y mercado peruano
        </h2>
        <p className="mt-2 text-center text-gray-600 max-w-2xl mx-auto">
          Legaltech no busca reemplazar al abogado, sino reducir la brecha de acceso a la información
          legal básica en un contexto donde gran parte de la población no cuenta con asesoría accesible.
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold">
              <CheckIcon className="w-5 h-5" />
              Beneficios
            </div>
            <ul className="mt-4 space-y-3">
              {BENEFITS.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <XIcon className="w-5 h-5" />
              Limitaciones
            </div>
            <ul className="mt-4 space-y-3">
              {LIMITATIONS.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <XIcon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6 sm:p-8">
          <h3 className="font-semibold text-gray-900">Aplicación práctica en el mercado legal peruano</h3>
          <p className="mt-2 text-sm text-gray-600 max-w-3xl">
            El modelo puede integrarse como una capa de orientación inicial dentro de distintos actores
            del ecosistema legal peruano:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {MARKET_ADOPTERS.map(item => (
              <span
                key={item}
                className="inline-flex items-center bg-white border border-blue-200 text-xs text-gray-700 px-3 py-1.5 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">¿Listo para resolver tus dudas?</h2>
            <p className="mt-3 text-slate-300 max-w-md">
              Accede ahora a nuestro asistente virtual. Sin registros complicados, sin esperas.
              Orientación inmediata sobre temas legales frecuentes en Perú.
            </p>
            <ul className="mt-5 space-y-2">
              {CHECKLIST.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckIcon className="w-4 h-4 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/chat"
              className="mt-8 inline-block bg-white text-slate-900 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Empezar ahora
            </Link>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img src={banner} alt="Legaltech - confianza institucional" className="w-full h-64 sm:h-80 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <p className="font-semibold">Confianza institucional</p>
              <p className="text-sm text-slate-200">Desarrollado para facilitar el acceso a la justicia.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="aviso-legal" className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 sm:p-8 max-w-3xl mx-auto flex gap-4">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
            <WarningIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-orange-900">Aviso Legal</h2>
            <p className="mt-2 text-sm text-orange-900/90 leading-relaxed">
              Legaltech es un <strong>prototipo educativo</strong> desarrollado con fines académicos.
              Las respuestas generadas por el asistente virtual <strong>no constituyen asesoría legal
              profesional</strong> y no reemplazan la consulta presencial con un abogado colegiado.
            </p>
            <p className="mt-2 text-sm text-orange-900/90 leading-relaxed">
              Para casos complejos, urgentes o de alto riesgo, siempre se recomienda acudir a un
              profesional del derecho habilitado por el Colegio de Abogados.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
