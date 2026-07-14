import React, { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { SendIcon } from './icons'

const GREETING = {
  role: 'assistant',
  content: 'Hola, soy el asistente educativo de Legaltech. Estoy aquí para ayudarte a comprender conceptos legales y normativas dentro del marco jurídico peruano. ¿En qué puedo orientarte hoy?'
}

const markdownComponents = {
  p: ({ children }) => <p className="leading-relaxed mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  ul: ({ children }) => (
    <ul className="my-2 space-y-1.5 [&>li]:flex [&>li]:gap-2 [&>li]:before:content-['✓'] [&>li]:before:text-gray-500 [&>li]:before:font-bold">
      {children}
    </ul>
  ),
  ol: ({ children }) => <ol className="my-2 space-y-1.5 list-decimal list-inside">{children}</ol>,
  blockquote: ({ children }) => (
    <div className="mt-3 border-l-2 border-gray-300 bg-white/70 rounded-r px-3 py-2 text-xs italic text-gray-600">
      {children}
    </div>
  )
}

function MessageBubble({ m }) {
  const isUser = m.role === 'user'
  return (
    <div className={`mb-5 flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <span className="text-[11px] tracking-wide font-medium text-gray-400 mb-1 px-1">
        {isUser ? 'TÚ' : 'ASISTENTE IA EDUCATIVO'}
      </span>
      {isUser ? (
        <div className="bg-slate-900 text-white rounded-xl px-4 py-3 text-sm max-w-[85%] whitespace-pre-wrap">
          {m.content}
        </div>
      ) : (
        <div className="bg-gray-100 text-gray-800 rounded-xl px-4 py-3 text-sm max-w-[95%] sm:max-w-[90%]">
          <ReactMarkdown components={markdownComponents}>{m.content}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

export default function Chat() {
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const send = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return
    const userMsg = { role: 'user', content: trimmed }
    const newHistory = [...messages, userMsg]
    setMessages(newHistory)
    setInput('')
    setLoading(true)
    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content, history: newHistory })
      })
      const data = await resp.json()
      const content = resp.ok
        ? (data.reply || 'Sin respuesta')
        : (data.error || 'Ocurrió un error inesperado.')
      setMessages(prev => [...prev, { role: 'assistant', content }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión con el servidor. Intenta de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    send()
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 overflow-hidden">
      <div ref={scrollRef} className="flex-1 min-h-[400px] max-h-[65vh] overflow-y-auto p-6">
        {messages.map((m, i) => <MessageBubble key={i} m={m} />)}
        {loading && (
          <div className="mb-5 flex flex-col items-start">
            <span className="text-[11px] tracking-wide font-medium text-gray-400 mb-1 px-1">
              ASISTENTE IA EDUCATIVO
            </span>
            <div className="bg-gray-100 text-gray-500 text-sm px-4 py-3 rounded-xl">
              Escribiendo...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="border-t border-gray-200 p-3 flex items-center gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
          placeholder="Escribe tu consulta legal aquí..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          aria-label="Enviar"
          className="shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !input.trim()}
        >
          <SendIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
