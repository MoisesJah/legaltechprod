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

2. Instala las dependencias (raíz, servidor y cliente):

   ```bash
   npm install
   npm install --prefix server
   npm install --prefix client
   ```

3. Configura tu API key de Groq. El backend lee `GROQ_API_KEY` desde un archivo `.env` ubicado en `/server` (no en la raíz):

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

Esto levanta en paralelo (con `concurrently`):

- Backend (Express) en `http://localhost:4000`
- Frontend (Vite) en `http://localhost:5173`

El frontend usa un proxy de Vite (`/api` → `http://localhost:4000`), así que basta con abrir `http://localhost:5173` en el navegador.

## Estructura de carpetas

```
LegalTech/
├── package.json              # Scripts raíz (dev, con concurrently)
├── .gitignore
├── README.md
├── server/                   # Backend Node.js + Express
│   ├── index.js              # Servidor y endpoint POST /api/chat
│   ├── systemPrompt.js       # Prompt del sistema del asistente legal
│   ├── .env.example          # Variables de entorno de ejemplo
│   ├── .env                  # Variables de entorno reales (no versionado)
│   └── package.json
└── client/                   # Frontend React + Vite + Tailwind
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.cjs
    ├── public/
    │   └── favicon.png
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx           # Enrutamiento y layout general
    │   ├── assets/            # Logo e imágenes
    │   ├── pages/
    │   │   ├── LandingPage.jsx  # Página de inicio (marketing)
    │   │   └── ChatPage.jsx     # Página del asistente
    │   └── components/
    │       ├── Navbar.jsx
    │       ├── Footer.jsx
    │       ├── Chat.jsx         # Interfaz de chat
    │       ├── ChatSidebar.jsx  # Panel lateral de contexto/aviso legal
    │       └── icons.jsx        # Iconos SVG compartidos
    └── package.json
```

## Notas importantes

- La API key de Groq se lee **exclusivamente** desde la variable de entorno `GROQ_API_KEY` (archivo `server/.env`, nunca subido al repositorio).
- Este proyecto es un **prototipo académico/educativo**. Las respuestas del asistente **no constituyen asesoría legal profesional** y no reemplazan la consulta con un abogado colegiado.
