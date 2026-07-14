# Legaltech — Asistente Legal Virtual (prototipo educativo)

Legaltech es un prototipo educativo de asistente legal virtual para Perú. Usa un modelo de lenguaje open source (Llama 3.3 70B, servido a través de la API de Groq) para responder consultas legales básicas en materia laboral, de consumidor, arrendamiento y familia, siempre aclarando que no sustituye la asesoría de un abogado colegiado.

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- Una API key gratuita de Groq (ver más abajo)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <repo-url>
   cd LegalTech
   ```

2. Instala las dependencias del backend:

   ```bash
   npm install --prefix server
   ```

3. Configura tu API key de Groq. El backend lee `GROQ_API_KEY` desde un archivo `.env` ubicado en `/server`:

   ```bash
   cp server/.env.example server/.env
   # edita server/.env y coloca tu GROQ_API_KEY
   ```

## Obtener una API key gratuita de Groq

1. Ve a [https://console.groq.com](https://console.groq.com) y crea una cuenta gratuita.
2. En la sección de API Keys, genera una nueva key.
3. Copia esa key dentro de `server/.env` en la variable `GROQ_API_KEY`.

> La API key **nunca** debe escribirse directamente en el código. Solo se lee desde la variable de entorno `GROQ_API_KEY` mediante `dotenv`.

## Ejecutar en desarrollo

Desde la raíz del proyecto:

```bash
npm run dev
```

Esto levanta un único servidor Express en `http://localhost:4000`, que expone tanto la API (`/api/chat`, `/api/health`) como el frontend estático (HTML/CSS/JS). Abre `http://localhost:4000` en el navegador para usar la aplicación.

## Estructura de carpetas

```
LegalTech/
├── package.json          # Script raíz de conveniencia (dev -> server)
├── .gitignore
├── README.md
├── server/                # Backend Node.js + Express
│   ├── index.js           # Servidor: sirve /client y expone POST /api/chat
│   ├── systemPrompt.js    # Prompt del sistema del asistente legal
│   ├── .env.example       # Variables de entorno de ejemplo
│   ├── .env               # Variables de entorno reales (no versionado)
│   └── package.json
└── client/                # Frontend estático: HTML + CSS + JS (sin build, sin framework)
    ├── index.html         # Landing page
    ├── chat.html          # Página del asistente
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── nav.js          # Menú móvil
    │   └── chat.js         # Lógica del chat (fetch a /api/chat, render de mensajes)
    └── assets/             # Logo, banner, favicon
```

## Stack técnico

- **Backend:** Node.js + Express, usando el SDK oficial `groq-sdk` para consumir el modelo `llama-3.3-70b-versatile` de Groq.
- **Frontend:** HTML, CSS y JavaScript planos, sin frameworks ni paso de compilación. El mismo servidor Express sirve estos archivos estáticos, por lo que no hay que levantar un segundo proceso ni configurar un proxy.

## Notas importantes

- La API key de Groq se lee **exclusivamente** desde la variable de entorno `GROQ_API_KEY` (archivo `server/.env`, nunca subido al repositorio).
- Este proyecto es un **prototipo académico/educativo**. Las respuestas del asistente **no constituyen asesoría legal profesional** y no reemplazan la consulta con un abogado colegiado.
