/* ============================================================
   MASTER FUMIGACIONES WD — CHATBOT (compartido en todas las páginas)
   Se inyecta a sí mismo en el DOM, así que basta con incluir
   <script src="chatbot.js"></script> en cualquier página.
============================================================ */

// ─── WIDGET HTML (se inyecta al final del <body>) ────────────
(function cbInjectWidget() {
  if (document.getElementById('chatbot')) return; // evita duplicados
  var html =
    '<div id="chatbot" class="cb-wrap" aria-live="polite">' +
      '<button class="cb-toggle" id="cbToggle" onclick="cbToggleOpen()" aria-label="Abrir asistente">' +
        '<i class="fas fa-comment-dots cb-toggle__icon--open"></i>' +
        '<i class="fas fa-times cb-toggle__icon--close" style="display:none"></i>' +
        '<span class="cb-badge" id="cbBadge">1</span>' +
      '</button>' +
      '<div class="cb-box" id="cbBox" style="display:none">' +
        '<div class="cb-header">' +
          '<div class="cb-header__avatar"><img src="LOGO_MASTER.png" alt="Master WD" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"></div>' +
          '<div>' +
            '<strong>Asistente Master WD</strong>' +
            '<span class="cb-online"><span class="cb-dot"></span>En línea ahora</span>' +
          '</div>' +
          '<button class="cb-close" onclick="cbToggleOpen()" aria-label="Cerrar asistente"><i class="fas fa-times"></i></button>' +
        '</div>' +
        '<div class="cb-messages" id="cbMessages"></div>' +
        '<div class="cb-options" id="cbOptions"></div>' +
      '</div>' +
    '</div>';
  document.body.insertAdjacentHTML('beforeend', html);
})();

// ─── CHATBOT DATA ───────────────────────────────────────────
var CB = {
  phone: '50371626850',
  delay: 600,
  storageKey: 'mfwd_cb_state_v1',
  maxAgeMs: 6 * 60 * 60 * 1000, // 6 horas: pasado eso, empieza de cero
  state: { step: null, data: {}, history: [], messages: [] },

  flow: [
    {
      id: 'start',
      msg: '👋 ¡Hola! Soy el asistente de <strong>Master Fumigaciones WD</strong>.<br>¿En qué te puedo ayudar hoy?',
      opts: [
        { label: '🐛 Tengo una plaga', next: 'tipo_plaga' },
        { label: '💰 Quiero una cotización', next: 'tipo_plaga' },
        { label: '🚨 Es una emergencia', next: 'emergencia' },
        { label: 'ℹ️ Información general', next: 'info' },
        { label: '✍️ Otra pregunta', next: 'free_text' }
      ]
    },
    {
      id: 'tipo_plaga',
      msg: '¿Qué tipo de plaga tienes?',
      opts: [
        { label: '🪳 Cucarachas / Insectos', val: 'Control de Insectos', next: 'lugar' },
        { label: '🐀 Ratas / Ratones', val: 'Control de Roedores', next: 'lugar' },
        { label: '🪵 Termitas', val: 'Control de Termitas', next: 'lugar' },
        { label: '🦟 Zancudos / Moscas', val: 'Fumigación General', next: 'lugar' },
        { label: '🔬 No sé / Otra', val: 'Inspección General', next: 'lugar' }
      ]
    },
    {
      id: 'lugar',
      msg: '¿Dónde tienes el problema?',
      opts: [
        { label: '🏠 Casa / Apartamento', val: 'Residencial', next: 'zona' },
        { label: '🍽️ Restaurante / Negocio', val: 'Comercial', next: 'zona' },
        { label: '🏭 Industria / Bodega', val: 'Industrial', next: 'zona' }
      ]
    },
    {
      id: 'zona',
      msg: '¿En qué municipio o departamento estás?',
      opts: [
        { label: '📍 Soyapango', val: 'Soyapango', next: 'urgencia' },
        { label: '📍 San Salvador', val: 'San Salvador', next: 'urgencia' },
        { label: '📍 Mejicanos', val: 'Mejicanos', next: 'urgencia' },
        { label: '📍 Ilopango', val: 'Ilopango', next: 'urgencia' },
        { label: '📍 Ciudad Delgado', val: 'Ciudad Delgado', next: 'urgencia' },
        { label: '📍 Apopa', val: 'Apopa', next: 'urgencia' },
        { label: '📍 San Marcos', val: 'San Marcos', next: 'urgencia' },
        { label: '📍 Antiguo Cuscatlán', val: 'Antiguo Cuscatlán', next: 'urgencia' },
        { label: '📍 Santa Tecla', val: 'Santa Tecla', next: 'urgencia' },
        { label: '📍 Cuscatancingo', val: 'Cuscatancingo', next: 'urgencia' },
        { label: '📍 San Martín', val: 'San Martín', next: 'urgencia' },
        { label: '📍 Tonacatepeque', val: 'Tonacatepeque', next: 'urgencia' },
        { label: '📍 Colón (La Libertad)', val: 'Colón', next: 'urgencia' },
        { label: '📍 Ciudad Arce', val: 'Ciudad Arce', next: 'urgencia' },
        { label: '📍 Quezaltepeque', val: 'Quezaltepeque', next: 'urgencia' },
        { label: '📍 Zaragoza', val: 'Zaragoza', next: 'urgencia' },
        { label: '📍 San Juan Opico', val: 'San Juan Opico', next: 'urgencia' },
        { label: '📍 La Libertad', val: 'La Libertad', next: 'urgencia' },
        { label: '📍 Olocuilta', val: 'Olocuilta', next: 'urgencia' },
        { label: '📍 Zacatecoluca', val: 'Zacatecoluca', next: 'urgencia' },
        { label: '📍 Cojutepeque', val: 'Cojutepeque', next: 'urgencia' },
        { label: '📍 Suchitoto', val: 'Suchitoto', next: 'urgencia' },
        { label: '📍 Santa Ana', val: 'Santa Ana', next: 'urgencia' },
        { label: '📍 Chalchuapa', val: 'Chalchuapa', next: 'urgencia' },
        { label: '📍 Sonsonate', val: 'Sonsonate', next: 'urgencia' },
        { label: '📍 Acajutla', val: 'Acajutla', next: 'urgencia' },
        { label: '📍 San Miguel', val: 'San Miguel', next: 'urgencia' },
        { label: '📍 Usulután', val: 'Usulután', next: 'urgencia' },
        { label: '📍 La Unión', val: 'La Unión', next: 'urgencia' },
        { label: '📍 Santa Rosa de Lima', val: 'Santa Rosa de Lima', next: 'urgencia' },
        { label: '📍 Chalatenango', val: 'Chalatenango', next: 'urgencia' },
        { label: '📍 Sensuntepeque', val: 'Sensuntepeque', next: 'urgencia' },
        { label: '📍 Ilobasco', val: 'Ilobasco', next: 'urgencia' },
        { label: '📍 San Francisco Gotera', val: 'San Francisco Gotera', next: 'urgencia' },
        { label: '📍 Ahuachapán', val: 'Ahuachapán', next: 'urgencia' },
        { label: '📍 San Vicente', val: 'San Vicente', next: 'urgencia' },
        // "Otro municipio" ya NO fija un valor genérico: ahora pide el nombre real.
        { label: '📍 Otro municipio', next: 'zona_otro' }
      ]
    },
    {
      id: 'zona_otro',
      msg: '📍 Escríbeme el nombre de tu municipio, cantón o colonia:',
      captureField: 'zona',
      nextAfter: 'urgencia'
    },
    {
      id: 'urgencia',
      msg: '¿Qué tan urgente es?',
      opts: [
        { label: '🚨 Urgente – hoy mismo', val: 'URGENTE – hoy mismo', next: 'datos' },
        { label: '📅 Esta semana', val: 'Esta semana', next: 'datos' },
        { label: '🗓️ Cuando puedan', val: 'Sin urgencia', next: 'datos' }
      ]
    },
    {
      id: 'emergencia',
      msg: '⚡ ¡Entendido! Atendemos emergencias en <strong>menos de 2 horas</strong> en el área metropolitana.<br><br>Te voy a conectar de inmediato con un técnico.',
      opts: [
        { label: '📲 Llamar ahora: 7162-6850', action: 'call' },
        { label: '💬 WhatsApp de emergencia', action: 'wa_emergency' }
      ]
    },
    {
      id: 'info',
      msg: '¿Sobre qué quieres más información?',
      opts: [
        { label: '💰 Precios y cotizaciones', next: 'precio_info' },
        { label: '📜 Certificaciones MINSAL/MAG', next: 'cert_info' },
        { label: '🔒 Garantía del servicio', next: 'garantia_info' },
        { label: '⏰ Horarios de atención', next: 'horario_info' }
      ]
    },
    {
      id: 'precio_info',
      msg: '💰 Los precios varían según el tipo de plaga, tamaño del lugar y frecuencia del servicio.<br><br>La <strong>inspección inicial es gratuita</strong> y sin compromiso. ¿Quieres agendar una?',
      opts: [
        { label: '✅ Sí, quiero una inspección gratis', next: 'tipo_plaga' },
        { label: '💬 Preguntar por WhatsApp', action: 'wa_info' },
        { label: '🏠 Volver al menú', action: 'restart' }
      ]
    },
    {
      id: 'cert_info',
      msg: '📜 Master Fumigaciones WD cuenta con:<br>• <strong>Permiso Sanitario MINSAL</strong><br>• <strong>Certificación técnica MAG</strong><br>Operamos bajo plena regulación gubernamental.',
      opts: [
        { label: '🐛 Solicitar servicio certificado', next: 'tipo_plaga' },
        { label: '💬 Más preguntas por WhatsApp', action: 'wa_info' }
      ]
    },
    {
      id: 'garantia_info',
      msg: '🔒 Ofrecemos <strong>garantía escrita de 6 meses</strong>.<br><br>Si la plaga regresa dentro del período, volvemos sin costo adicional. Lo ponemos por escrito en el contrato.',
      opts: [
        { label: '✅ Quiero este servicio', next: 'tipo_plaga' },
        { label: '💬 Hablar con un técnico', action: 'wa_info' },
        { label: '🏠 Volver al menú', action: 'restart' }
      ]
    },
    {
      id: 'horario_info',
      msg: '⏰ Nuestros horarios:<br>• <strong>Lun–Vie:</strong> 8am – 6pm<br>• <strong>Sábados:</strong> 8am – 12pm<br>• <strong>Emergencias:</strong> 24/7<br><br>Número: <strong>7162-6850</strong>',
      opts: [
        { label: '🐛 Solicitar servicio', next: 'tipo_plaga' },
        { label: '💬 Escribir por WhatsApp', action: 'wa_info' },
        { label: '🏠 Volver al menú', action: 'restart' }
      ]
    },
    {
      id: 'free_text',
      msg: '✍️ Cuéntame con tus palabras qué necesitas. Te conecto directo con un técnico real por WhatsApp con tu mensaje ya escrito.',
      freeText: true
    },
    {
      id: 'free_text_sent',
      msg: '✅ ¡Listo! Abrí WhatsApp con tu mensaje. Si no se abrió automáticamente, escríbenos al <strong>7162-6850</strong>.',
      opts: [
        { label: '🔄 Empezar de nuevo', action: 'restart' }
      ]
    },
    {
      id: 'datos',
      msg: '📝 Casi listo. ¿Puedes dejarnos tu nombre y teléfono para que el técnico te contacte?<br><small style="color:#888">(Opcional — puedes saltar si prefieres)</small>',
      opts: [],
      input: true
    },
    {
      id: 'final',
      msg: '✅ ¡Perfecto! Tengo toda la información.<br><br>📋 <strong>Resumen:</strong><br>🔧 Servicio: <strong>{servicio}</strong><br>🏠 Lugar: <strong>{lugar}</strong><br>📍 Municipio: <strong>{zona}</strong><br>⚡ Urgencia: <strong>{urgencia}</strong><br><br>Toca el botón para enviar todo por WhatsApp y confirmar tu cita.',
      opts: [
        { label: '💬 Enviar por WhatsApp', action: 'wa_final' },
        { label: '🔄 Empezar de nuevo', action: 'restart' }
      ]
    }
  ]
};

// ─── ENGINE ─────────────────────────────────────────────────
var cbOpen = false;
var cbStarted = false;

function cbEscape(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cbSaveState() {
  try {
    localStorage.setItem(CB.storageKey, JSON.stringify({
      step: CB.state.step,
      data: CB.state.data,
      history: CB.state.history,
      messages: CB.state.messages,
      started: cbStarted,
      open: cbOpen,
      ts: Date.now()
    }));
  } catch (e) {
    // localStorage no disponible (modo privado, cuota llena, etc.) — no es crítico
  }
}

function cbClearState() {
  try { localStorage.removeItem(CB.storageKey); } catch (e) {}
}

function cbToggleOpen() {
  cbOpen = !cbOpen;
  var box   = document.getElementById('cbBox');
  var badge = document.getElementById('cbBadge');
  var iconO = document.querySelector('.cb-toggle__icon--open');
  var iconC = document.querySelector('.cb-toggle__icon--close');
  box.style.display   = cbOpen ? 'flex' : 'none';
  iconO.style.display = cbOpen ? 'none' : 'block';
  iconC.style.display = cbOpen ? 'block' : 'none';
  badge.style.display = 'none';
  // Oculta el botón flotante de WhatsApp mientras el chat está abierto
  // en pantallas chicas, para que no se asome detrás del widget.
  var waFloat = document.querySelector('.wa-float');
  if (waFloat && window.innerWidth <= 600) {
    waFloat.style.display = cbOpen ? 'none' : 'flex';
  }
  if (cbOpen && !cbStarted) {
    cbStarted = true;
    setTimeout(function () { cbShowStep('start'); }, 400);
  }
  cbSaveState();
}

// Reemplaza los {placeholders} del mensaje final con los datos recopilados
function cbResolveStep(step) {
  if (step.id !== 'final') return step;
  var d = CB.state.data;
  var copy = JSON.parse(JSON.stringify(step));
  copy.msg = copy.msg
    .replace('{servicio}', d.servicio || '–')
    .replace('{lugar}', d.lugar || '–')
    .replace('{zona}', d.zona || '–')
    .replace('{urgencia}', d.urgencia || '–');
  return copy;
}

function cbShowStep(id) {
  var raw = CB.flow.find(function (s) { return s.id === id; });
  if (!raw) return;
  var step = cbResolveStep(raw);
  CB.state.step = id;
  cbAddMessage('bot', step.msg);
  setTimeout(function () {
    cbRenderControls(step);
  }, CB.delay);
}

// Avanza guardando el paso actual en el historial, para poder volver con "Atrás"
function cbNavigateForward(nextId) {
  CB.state.history = CB.state.history || [];
  if (CB.state.step) CB.state.history.push(CB.state.step);
  cbShowStep(nextId);
}

function cbGoBack() {
  if (!CB.state.history || !CB.state.history.length) return;
  var prevId = CB.state.history.pop();
  var raw = CB.flow.find(function (s) { return s.id === prevId; });
  if (!raw) return;
  var step = cbResolveStep(raw);
  CB.state.step = prevId;
  cbRenderControls(step);
  cbSaveState();
}

function cbAppendBackButton() {
  if (!CB.state.history || !CB.state.history.length) return;
  var container = document.getElementById('cbOptions');
  var btn = document.createElement('button');
  btn.className = 'cb-opt cb-opt--back';
  btn.innerHTML = '⬅️ Atrás';
  btn.onclick = cbGoBack;
  container.appendChild(btn);
}

// Decide qué tipo de control mostrar (opciones, formulario, texto libre o captura) + botón Atrás
function cbRenderControls(step) {
  var container = document.getElementById('cbOptions');
  container.innerHTML = '';
  if (step.freeText) {
    cbShowFreeTextForm();
  } else if (step.captureField) {
    cbShowCaptureField(step);
  } else if (step.input) {
    cbShowInputForm();
  } else {
    cbShowOptions(step.opts || []);
  }
  cbAppendBackButton();
  cbSaveState();
}

function cbShowInputForm() {
  var container = document.getElementById('cbOptions');
  var wrap = document.createElement('div');
  wrap.className = 'cb-input-group';
  wrap.innerHTML =
    '<input type="text" id="cbNombre" placeholder="Tu nombre" class="cb-input">' +
    '<input type="tel" id="cbTelefono" placeholder="Teléfono: 7XXX-XXXX" class="cb-input">' +
    '<div style="display:flex;gap:.4rem;margin-top:.2rem;">' +
      '<button class="cb-opt cb-opt--send" id="cbDatosSend">✅ Continuar</button>' +
      '<button class="cb-opt cb-opt--skip" id="cbDatosSkip">⏭️ Saltar</button>' +
    '</div>';
  container.appendChild(wrap);
  document.getElementById('cbDatosSend').onclick = cbSubmitDatos;
  document.getElementById('cbDatosSkip').onclick = cbSkipDatos;
  setTimeout(function () { var el = document.getElementById('cbNombre'); if (el) el.focus(); }, 100);
}

function cbSubmitDatos() {
  var nombre   = (document.getElementById('cbNombre')   || {}).value || '';
  var telefono = (document.getElementById('cbTelefono') || {}).value || '';
  nombre   = nombre.trim();
  telefono = telefono.trim();
  if (nombre)   CB.state.data.nombre   = nombre;
  if (telefono) CB.state.data.telefono = telefono;
  var resumen = nombre || telefono
    ? '👤 ' + cbEscape(nombre || '–') + ' · 📞 ' + cbEscape(telefono || '–')
    : '(sin datos)';
  cbAddMessage('user', resumen);
  document.getElementById('cbOptions').innerHTML = '';
  setTimeout(function () { cbShowStep('final'); }, 400);
}

function cbSkipDatos() {
  cbAddMessage('user', '⏭️ Prefiero no dejarlo');
  document.getElementById('cbOptions').innerHTML = '';
  setTimeout(function () { cbShowStep('final'); }, 400);
}

// Campo de texto libre genérico (ej. nombre de municipio) que continúa el flujo normal
function cbShowCaptureField(step) {
  var container = document.getElementById('cbOptions');
  var wrap = document.createElement('div');
  wrap.className = 'cb-input-group';
  wrap.innerHTML =
    '<input type="text" id="cbCaptureInput" placeholder="Escribe aquí..." class="cb-input">' +
    '<div style="display:flex;gap:.4rem;margin-top:.2rem;">' +
      '<button class="cb-opt cb-opt--send" id="cbCaptureSend">✅ Continuar</button>' +
    '</div>';
  container.appendChild(wrap);
  document.getElementById('cbCaptureSend').onclick = function () { cbSubmitCapture(step); };
  var input = document.getElementById('cbCaptureInput');
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') cbSubmitCapture(step);
  });
  setTimeout(function () { input.focus(); }, 100);
}

function cbSubmitCapture(step) {
  var input = document.getElementById('cbCaptureInput');
  var val = ((input && input.value) || '').trim();
  if (!val) { if (input) input.focus(); return; }
  CB.state.data[step.captureField] = val;
  cbAddMessage('user', cbEscape(val));
  document.getElementById('cbOptions').innerHTML = '';
  setTimeout(function () { cbNavigateForward(step.nextAfter); }, 400);
}

// Texto libre: cuando ninguna opción del menú encaja, el usuario escribe lo que necesita
// y se abre WhatsApp con ese mensaje ya redactado.
function cbShowFreeTextForm() {
  var container = document.getElementById('cbOptions');
  var wrap = document.createElement('div');
  wrap.className = 'cb-input-group';
  wrap.innerHTML =
    '<textarea id="cbFreeText" class="cb-input cb-textarea" rows="3" placeholder="Escribe tu pregunta o lo que necesitas..."></textarea>' +
    '<div style="display:flex;gap:.4rem;margin-top:.2rem;">' +
      '<button class="cb-opt cb-opt--send" id="cbFreeTextSend">💬 Enviar por WhatsApp</button>' +
    '</div>';
  container.appendChild(wrap);
  document.getElementById('cbFreeTextSend').onclick = cbSubmitFreeText;
  var ta = document.getElementById('cbFreeText');
  setTimeout(function () { ta.focus(); }, 100);
}

function cbSubmitFreeText() {
  var ta = document.getElementById('cbFreeText');
  var txt = ((ta && ta.value) || '').trim();
  if (!txt) { if (ta) ta.focus(); return; }
  cbAddMessage('user', cbEscape(txt));
  document.getElementById('cbOptions').innerHTML = '';
  window.open('https://wa.me/' + CB.phone + '?text=' + encodeURIComponent(txt), '_blank');
  setTimeout(function () { cbShowStep('free_text_sent'); }, 400);
}

function cbAddMessage(who, html) {
  var msgs = document.getElementById('cbMessages');
  var div = document.createElement('div');
  div.className = 'cb-msg cb-msg--' + who;
  div.innerHTML = '<div class="cb-bubble">' + html + '</div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;

  CB.state.messages = CB.state.messages || [];
  CB.state.messages.push({ who: who, html: html });
  cbSaveState();
}

function cbShowOptions(opts) {
  var container = document.getElementById('cbOptions');

  // Si hay más de 10 opciones, mostrar buscador
  if (opts.length > 10) {
    var searchWrap = document.createElement('div');
    searchWrap.style.cssText = 'padding:.2rem 0 .4rem;';
    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Buscar municipio...';
    searchInput.className = 'cb-input';
    searchInput.style.marginBottom = '.4rem';
    searchWrap.appendChild(searchInput);
    container.appendChild(searchWrap);

    var listWrap = document.createElement('div');
    listWrap.className = 'cb-opts-list';
    container.appendChild(listWrap);

    function renderOpts(filter) {
      listWrap.innerHTML = '';
      var filtered = filter
        ? opts.filter(function (o) { return o.label.toLowerCase().indexOf(filter.toLowerCase()) >= 0; })
        : opts;
      filtered.forEach(function (opt) {
        var btn = document.createElement('button');
        btn.className = 'cb-opt';
        btn.innerHTML = opt.label;
        btn.onclick = function () { cbHandleOpt(opt); };
        listWrap.appendChild(btn);
      });
    }
    renderOpts('');
    searchInput.addEventListener('input', function () { renderOpts(this.value); });
    setTimeout(function () { searchInput.focus(); }, 100);
    return;
  }

  opts.forEach(function (opt) {
    var btn = document.createElement('button');
    btn.className = 'cb-opt';
    btn.innerHTML = opt.label;
    btn.onclick = function () { cbHandleOpt(opt); };
    container.appendChild(btn);
  });
}

function cbHandleOpt(opt) {
  // Mostrar la selección del usuario como burbuja
  cbAddMessage('user', opt.label);
  document.getElementById('cbOptions').innerHTML = '';

  // Guardar dato
  if (opt.val) {
    var step = CB.state.step;
    if (step === 'tipo_plaga') CB.state.data.servicio = opt.val;
    if (step === 'lugar')      CB.state.data.lugar    = opt.val;
    if (step === 'zona')       CB.state.data.zona     = opt.val;
    if (step === 'urgencia')   CB.state.data.urgencia = opt.val;
  }

  // Acciones especiales (llamar, abrir WhatsApp, reiniciar...)
  if (opt.action) {
    setTimeout(function () { cbAction(opt.action); }, 300);
    return;
  }

  setTimeout(function () { cbNavigateForward(opt.next); }, 400);
}

function cbAction(action) {
  if (action === 'call') {
    window.location.href = 'tel:+50371626850';
    setTimeout(function () {
      cbAddMessage('bot', '📲 Marcando al <strong>7162-6850</strong>...<br>Si no conecta, también puede escribirnos por WhatsApp.');
      setTimeout(function () {
        var container = document.getElementById('cbOptions');
        container.innerHTML = '';
        var btn = document.createElement('button'); btn.className = 'cb-opt';
        btn.innerHTML = '💬 WhatsApp de emergencia'; btn.onclick = function () { cbAction('wa_emergency'); };
        container.appendChild(btn);
        var btn2 = document.createElement('button'); btn2.className = 'cb-opt';
        btn2.innerHTML = '🔄 Volver al menú'; btn2.onclick = function () { cbAction('restart'); };
        container.appendChild(btn2);
      }, 400);
    }, 500);
  } else if (action === 'wa_emergency') {
    window.open('https://wa.me/' + CB.phone + '?text=' + encodeURIComponent('🚨 EMERGENCIA: Necesito atención urgente de fumigación. ¿Pueden venir hoy?'), '_blank');
    setTimeout(function () {
      cbAddMessage('bot', '✅ WhatsApp abierto con mensaje de emergencia.<br>¡Respondemos en minutos!');
      setTimeout(function () {
        var container = document.getElementById('cbOptions');
        container.innerHTML = '';
        var btn = document.createElement('button'); btn.className = 'cb-opt';
        btn.innerHTML = '🔄 Volver al menú'; btn.onclick = function () { cbAction('restart'); };
        container.appendChild(btn);
      }, 400);
    }, 500);
  } else if (action === 'wa_info') {
    window.open('https://wa.me/' + CB.phone + '?text=' + encodeURIComponent('Hola, tengo una consulta sobre sus servicios de fumigación.'), '_blank');
    setTimeout(function () {
      cbAddMessage('bot', '✅ WhatsApp abierto. Un asesor te atenderá pronto.<br>También puedes llamar al <strong>7162-6850</strong>.');
      setTimeout(function () {
        var container = document.getElementById('cbOptions');
        container.innerHTML = '';
        var btn = document.createElement('button'); btn.className = 'cb-opt';
        btn.innerHTML = '🔄 Volver al menú'; btn.onclick = function () { cbAction('restart'); };
        container.appendChild(btn);
      }, 400);
    }, 500);
  } else if (action === 'wa_final') {
    var d = CB.state.data;
    var txt =
      '🐛 *SOLICITUD DE SERVICIO*\n' +
      '━━━━━━━━━━━━━━━━━━\n' +
      (d.nombre   ? '👤 *Nombre:* '    + d.nombre   + '\n' : '') +
      (d.telefono ? '📞 *Teléfono:* '  + d.telefono + '\n' : '') +
      '🔧 *Servicio:* '     + (d.servicio || 'Por definir') + '\n' +
      '🏠 *Tipo de lugar:* '+ (d.lugar    || 'Por definir') + '\n' +
      '📍 *Municipio:* '    + (d.zona     || 'Por definir') + '\n' +
      '⚡ *Urgencia:* '     + (d.urgencia || 'Por definir') + '\n' +
      '━━━━━━━━━━━━━━━━━━\n' +
      '_Enviado desde el asistente de masterfumigacioneswd.com_';
    window.open('https://wa.me/' + CB.phone + '?text=' + encodeURIComponent(txt), '_blank');
    setTimeout(function () {
      cbAddMessage('bot', '✅ <strong>¡Listo!</strong> Tu solicitud fue enviada por WhatsApp.<br>Un técnico te contactará pronto al número que indicaste.<br><br>Si WhatsApp no abrió, llámanos al <strong>7162-6850</strong>.');
      setTimeout(function () {
        var container = document.getElementById('cbOptions');
        container.innerHTML = '';
        var btn = document.createElement('button');
        btn.className = 'cb-opt';
        btn.innerHTML = '🔄 Nueva consulta';
        btn.onclick = function () { cbAction('restart'); };
        container.appendChild(btn);
      }, 400);
    }, 500);
  } else if (action === 'restart') {
    CB.state = { step: null, data: {}, history: [], messages: [] };
    document.getElementById('cbMessages').innerHTML = '';
    document.getElementById('cbOptions').innerHTML = '';
    cbClearState();
    cbStarted = true; // ya estamos reiniciando, evita que se duplique el saludo al reabrir
    setTimeout(function () { cbShowStep('start'); }, 300);
  }
}

// ─── RESTAURAR CONVERSACIÓN GUARDADA (si la hay y no expiró) ────
function cbTryRestore() {
  var raw;
  try { raw = localStorage.getItem(CB.storageKey); } catch (e) { raw = null; }
  if (!raw) return;

  var saved;
  try { saved = JSON.parse(raw); } catch (e) { return; }
  if (!saved || !saved.ts || (Date.now() - saved.ts) > CB.maxAgeMs) {
    cbClearState();
    return;
  }

  CB.state.step     = saved.step || null;
  CB.state.data     = saved.data || {};
  CB.state.history  = saved.history || [];
  CB.state.messages = saved.messages || [];
  cbStarted = !!saved.started;

  var msgsEl = document.getElementById('cbMessages');
  CB.state.messages.forEach(function (m) {
    var div = document.createElement('div');
    div.className = 'cb-msg cb-msg--' + m.who;
    div.innerHTML = '<div class="cb-bubble">' + m.html + '</div>';
    msgsEl.appendChild(div);
  });
  if (msgsEl.children.length) msgsEl.scrollTop = msgsEl.scrollHeight;

  if (CB.state.step) {
    var raw2 = CB.flow.find(function (s) { return s.id === CB.state.step; });
    if (raw2) cbRenderControls(cbResolveStep(raw2));
  }

  if (saved.open) {
    cbOpen = false; // para que cbToggleOpen() lo invierta a true correctamente
    cbToggleOpen();
  }
}

// ─── INICIO ─────────────────────────────────────────────────
cbTryRestore();

// Mostrar globo de atención tras 4 seg, solo si es una visita nueva
setTimeout(function () {
  if (!cbOpen && !cbStarted) {
    var badge = document.getElementById('cbBadge');
    if (badge) badge.style.display = 'flex';
  }
}, 4000);
