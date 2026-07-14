(function () {
  var GREETING = 'Hola, soy el asistente educativo de Legaltech. Estoy aquí para ayudarte a comprender conceptos legales y normativas dentro del marco jurídico peruano. ¿En qué puedo orientarte hoy?';

  var messages = [{ role: 'assistant', content: GREETING }];
  var loading = false;

  var messagesEl = document.getElementById('chatMessages');
  var formEl = document.getElementById('chatForm');
  var inputEl = document.getElementById('chatInput');
  var sendBtn = document.getElementById('sendBtn');

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function inlineFormat(text) {
    return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  function renderMarkdownLite(content) {
    var lines = content.split('\n');
    var html = '';
    var i = 0;

    while (i < lines.length) {
      var trimmed = lines[i].trim();

      if (trimmed === '') {
        i++;
        continue;
      }

      if (/^-\s+/.test(trimmed)) {
        var items = [];
        while (i < lines.length && /^-\s+/.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^-\s+/, ''));
          i++;
        }
        html += '<ul>' + items.map(function (it) {
          return '<li>' + inlineFormat(it) + '</li>';
        }).join('') + '</ul>';
        continue;
      }

      if (/^>\s?/.test(trimmed)) {
        var noteLines = [];
        while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
          noteLines.push(lines[i].trim().replace(/^>\s?/, ''));
          i++;
        }
        html += '<div class="note">' + inlineFormat(noteLines.join(' ')) + '</div>';
        continue;
      }

      var paraLines = [];
      while (
        i < lines.length &&
        lines[i].trim() !== '' &&
        !/^-\s+/.test(lines[i].trim()) &&
        !/^>\s?/.test(lines[i].trim())
      ) {
        paraLines.push(lines[i]);
        i++;
      }
      html += '<p>' + inlineFormat(paraLines.join(' ')) + '</p>';
    }

    return html;
  }

  function buildBubble(m) {
    var group = document.createElement('div');
    group.className = 'message-group ' + (m.role === 'user' ? 'user' : 'assistant');

    var label = document.createElement('span');
    label.className = 'role-label';
    label.textContent = m.role === 'user' ? 'TÚ' : 'ASISTENTE IA EDUCATIVO';
    group.appendChild(label);

    var bubble = document.createElement('div');
    bubble.className = 'bubble ' + (m.role === 'user' ? 'user' : 'assistant');
    if (m.role === 'user') {
      bubble.textContent = m.content;
    } else {
      bubble.innerHTML = renderMarkdownLite(m.content);
    }
    group.appendChild(bubble);
    return group;
  }

  function buildTypingIndicator() {
    var group = document.createElement('div');
    group.className = 'message-group assistant typing';
    var label = document.createElement('span');
    label.className = 'role-label';
    label.textContent = 'ASISTENTE IA EDUCATIVO';
    group.appendChild(label);
    var bubble = document.createElement('div');
    bubble.className = 'bubble assistant';
    bubble.textContent = 'Escribiendo...';
    group.appendChild(bubble);
    return group;
  }

  function renderMessages() {
    messagesEl.innerHTML = '';
    messages.forEach(function (m) {
      messagesEl.appendChild(buildBubble(m));
    });
    if (loading) {
      messagesEl.appendChild(buildTypingIndicator());
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function updateSendState() {
    sendBtn.disabled = loading || !inputEl.value.trim();
  }

  function send() {
    var trimmed = inputEl.value.trim();
    if (!trimmed || loading) return;

    var history = messages.slice();
    messages.push({ role: 'user', content: trimmed });
    inputEl.value = '';
    loading = true;
    inputEl.disabled = true;
    updateSendState();
    renderMessages();

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: trimmed, history: history })
    })
      .then(function (resp) {
        return resp.json().then(function (data) {
          return { ok: resp.ok, data: data };
        });
      })
      .then(function (result) {
        var content = result.ok
          ? (result.data.reply || 'Sin respuesta')
          : (result.data.error || 'Ocurrió un error inesperado.');
        messages.push({ role: 'assistant', content: content });
      })
      .catch(function () {
        messages.push({ role: 'assistant', content: 'Error de conexión con el servidor. Intenta de nuevo.' });
      })
      .finally(function () {
        loading = false;
        inputEl.disabled = false;
        updateSendState();
        renderMessages();
        inputEl.focus();
      });
  }

  inputEl.addEventListener('input', updateSendState);
  formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    send();
  });

  renderMessages();
  updateSendState();
})();
