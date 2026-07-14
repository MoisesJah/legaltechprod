require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const systemPrompt = require('./systemPrompt');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.warn('WARNING: GROQ_API_KEY no está definida. Define la variable en server/.env');
}

const groq = GROQ_API_KEY ? new Groq({ apiKey: GROQ_API_KEY }) : null;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' });
  }

  if (!groq) {
    return res.status(503).json({
      error: 'GROQ_API_KEY no configurada en el servidor. Revisa server/.env'
    });
  }

  try {
    const messages = [{ role: 'system', content: systemPrompt }];
    if (Array.isArray(history)) {
      history.forEach(m => {
        if (m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string') {
          messages.push({ role: m.role, content: m.content });
        }
      });
    }
    messages.push({ role: 'user', content: message });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.4,
      max_tokens: 1024
    });

    const assistantText = completion?.choices?.[0]?.message?.content
      || 'Lo siento, no pude generar una respuesta. Intenta reformular tu consulta.';

    return res.json({ reply: assistantText });
  } catch (err) {
    console.error('Error llamando a Groq API:', err?.message || err);
    return res.status(502).json({
      error: 'Hubo un error comunicándose con el servicio de LLM. Intenta de nuevo más tarde.'
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
