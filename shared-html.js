/* shared-html.js — inject header + footer, fixed preloader */
(function () {
  const WA = "50371626850";

  const headerHTML = `
  <div id="preloader">
    <div class="pl__scene">
      <div class="pl__mouse-wrap">
        <svg class="pl__mouse" viewBox="0 0 120 70" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="38" rx="32" ry="20" fill="#c8c0b8"/>
          <ellipse cx="88" cy="32" rx="16" ry="13" fill="#c8c0b8"/>
          <ellipse cx="102" cy="36" rx="7" ry="5" fill="#b8a8a0"/>
          <ellipse cx="108" cy="35" rx="3" ry="2.5" fill="#e87a7a"/>
          <circle cx="98" cy="28" r="3" fill="#1a1a1a"/>
          <circle cx="99" cy="27" r="1" fill="white"/>
          <ellipse cx="84" cy="20" rx="5" ry="7" fill="#c8c0b8"/>
          <ellipse cx="84" cy="20" rx="3" ry="5" fill="#f0a0a8"/>
          <ellipse cx="94" cy="19" rx="5" ry="7" fill="#c8c0b8"/>
          <ellipse cx="94" cy="19" rx="3" ry="5" fill="#f0a0a8"/>
          <path class="pl__tail" d="M 30 40 Q 10 20 5 35 Q 0 50 15 45" stroke="#a89888" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <line class="pl__leg pl__leg--1" x1="75" y1="54" x2="68" y2="66" stroke="#a89888" stroke-width="4" stroke-linecap="round"/>
          <line class="pl__leg pl__leg--2" x1="62" y1="57" x2="55" y2="68" stroke="#a89888" stroke-width="4" stroke-linecap="round"/>
          <line class="pl__leg pl__leg--3" x1="50" y1="55" x2="44" y2="67" stroke="#a89888" stroke-width="4" stroke-linecap="round"/>
          <line class="pl__leg pl__leg--4" x1="38" y1="53" x2="32" y2="65" stroke="#a89888" stroke-width="4" stroke-linecap="round"/>
          <line x1="103" y1="32" x2="118" y2="28" stroke="#888" stroke-width="1" stroke-linecap="round"/>
          <line x1="103" y1="35" x2="119" y2="34" stroke="#888" stroke-width="1" stroke-linecap="round"/>
          <line x1="103" y1="38" x2="118" y2="41" stroke="#888" stroke-width="1" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="pl__ground"></div>
      <div class="pl__dust pl__dust--1"></div>
      <div class="pl__dust pl__dust--2"></div>
      <div class="pl__dust pl__dust--3"></div>
    </div>
    <div class="pl__logo">MASTER<span>FUMIGACIONES WD</span></div>
    <div class="pl__bar"></div>
    <p class="pl__tagline">Cargando...</p>
  </div>

  <header class="site-header">
    <nav class="nav">
      <a href="index.html" class="nav__logo">
        <span class="nav__logo-icon"><i class="fas fa-shield-virus" aria-hidden="true"></i></span>
        MASTER FUMIGACIONES&nbsp;<em>WD</em>
      </a>
      <ul class="nav__links" id="navLinks">
        <li><a href="index.html">Inicio</a></li>
        <li><a href="servicios.html">Servicios</a></li>
        <li><a href="nosotros.html">Nosotros</a></li>
        <li><a href="cobertura.html">Cobertura</a></li>
        <li><a href="blog.html">Consejos</a></li>
        <li><a href="contacto.html">Contacto</a></li>
        <li>
          <a href="https://wa.me/${WA}" target="_blank" rel="noopener noreferrer" class="btn btn--wa btn--sm">
            <i class="fab fa-whatsapp" aria-hidden="true"></i> 7162-6850
          </a>
        </li>
      </ul>
      <button class="nav__mobile-btn" id="mobileBtn" aria-label="Abrir menú">
        <i class="fas fa-bars" aria-hidden="true"></i>
      </button>
    </nav>
  </header>

  <a href="https://wa.me/${WA}" class="wa-float" target="_blank" rel="noopener noreferrer" aria-label="Chat por WhatsApp">
    <i class="fab fa-whatsapp" aria-hidden="true"></i>
  </a>`;

  const footerHTML = `
  <footer class="site-footer">
    <div class="footer__grid">
      <div class="footer__brand">
        <a href="index.html" class="nav__logo" style="color:#fff">
          <span class="nav__logo-icon"><i class="fas fa-shield-virus" aria-hidden="true"></i></span>
          MASTER FUMIGACIONES&nbsp;<em style="color:var(--yellow)">WD</em>
        </a>
        <p>Líderes en control de plagas en Soyapango y toda el área metropolitana de San Salvador. Protegemos familias y negocios salvadoreños desde 2016.</p>
        <div class="socials">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://wa.me/${WA}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          <a href="mailto:masterfumigacionesw.d@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
      <div class="footer__col">
        <h4>Servicios</h4>
        <ul>
          <li><a href="servicios.html#insectos">Control de Insectos</a></li>
          <li><a href="servicios.html#roedores">Control de Roedores</a></li>
          <li><a href="servicios.html#termitas">Control de Termitas</a></li>
          <li><a href="servicios.html#fumigacion">Fumigación General</a></li>
          <li><a href="servicios.html#desinfeccion">Desinfección</a></li>
          <li><a href="servicios.html#industrial">Control Industrial</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Empresa</h4>
        <ul>
          <li><a href="index.html">Inicio</a></li>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="cobertura.html">Cobertura</a></li>
          <li><a href="blog.html">Consejos</a></li>
          <li><a href="contacto.html">Contacto</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Contacto</h4>
        <div class="footer__contact-item"><i class="fas fa-map-marker-alt"></i><span>Soyapango, El Salvador</span></div>
        <div class="footer__contact-item"><i class="fab fa-whatsapp"></i><span>7162-6850</span></div>
        <div class="footer__contact-item"><i class="fas fa-envelope"></i><span>masterfumigacionesw.d@gmail.com</span></div>
        <div class="footer__contact-item"><i class="fas fa-clock"></i><span>Lun–Vie: 8am–6pm<br>Emergencias: 24/7</span></div>
      </div>
    </div>
    <div class="footer__bottom">
      <p>&copy; <span id="footerYear"></span> Master Fumigaciones WD. Todos los derechos reservados.</p>
      <div class="footer__certs">
        <span class="footer__cert">Cert. MINSAL</span>
        <span class="footer__cert">Eco-Friendly</span>
        <span class="footer__cert">Garantía Escrita</span>
      </div>
    </div>
  </footer>`;

  // Inject immediately (script runs synchronously in body)
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // --- Preloader: hide after page fully loads (with 1.5s max fallback) ---
  function hidePreloader() {
    var pl = document.getElementById('preloader');
    if (pl) pl.classList.add('gone');
  }

  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 600);
  } else {
    window.addEventListener('load', function () {
      setTimeout(hidePreloader, 600);
    });
    // Failsafe: never stay stuck longer than 2.5 seconds
    setTimeout(hidePreloader, 2500);
  }

})();
