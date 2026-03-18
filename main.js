/* ============================================================
   MASTER FUMIGACIONES WD — SHARED JS
============================================================ */

const WA_NUMBER = "50371626850";
const CURRENT_PAGE = window.location.pathname.split('/').pop() || 'index.html';

/* ---- Active nav link ---- */
document.querySelectorAll('.nav__links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href && (CURRENT_PAGE === href || (CURRENT_PAGE === '' && href === 'index.html'))) {
    a.classList.add('active');
  }
});

/* ---- Mobile menu ---- */
const mBtn   = document.getElementById('mobileBtn');
const nLinks = document.getElementById('navLinks');
if (mBtn && nLinks) {
  mBtn.addEventListener('click', () => {
    const open = nLinks.classList.toggle('open');
    mBtn.innerHTML = open ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  nLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nLinks.classList.remove('open');
    mBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }));
}

/* ---- Scroll reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- Counter animation ---- */
function animateCounter(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.floor(eased * target);
    el.textContent = val.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.counters-trigger').forEach(el => counterObserver.observe(el));

/* ---- FAQ Accordion ---- */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ---- Form submission (Formspree) ---- */
const form    = document.getElementById('mainForm');
const fStatus = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn  = form.querySelector('[type=submit]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando…';
    btn.disabled  = true;
    try {
      const res = await fetch(form.action, {
        method:'POST',
        body: new FormData(form),
        headers:{ 'Accept':'application/json' }
      });
      if (res.ok) {
        if (fStatus) {
          fStatus.textContent = '✅ ¡Mensaje recibido! Te contactamos pronto.';
          fStatus.style.color = 'var(--green)';
          fStatus.style.display = 'block';
        }
        form.reset();
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
        btn.style.background = 'var(--green-l)';
      } else { throw new Error(); }
    } catch {
      if (fStatus) {
        fStatus.textContent = '❌ Error al enviar. Escríbenos por WhatsApp.';
        fStatus.style.color = 'var(--red)';
        fStatus.style.display = 'block';
      }
      btn.innerHTML = orig;
    } finally {
      btn.disabled = false;
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        if (fStatus) fStatus.style.display = 'none';
      }, 5500);
    }
  });
}

/* ---- Footer year ---- */
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- Smooth anchor scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior:'smooth', block:'start' });
    }
  });
});
