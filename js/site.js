/**
 * Usari — premium dark corporate site runtime
 * Single vanilla JS file; no frameworks, no build step.
 * Reads global CONTENT object from data/content.js and renders the UI.
 */
(function () {
  'use strict';

  /* ---------- Constants & config ---------- */
  const LANG_KEY = 'usari_lang';
  const DEFAULT_LANG = 'tr';
  const BASE_URL = 'https://usari-website-production.up.railway.app/';

  const NAV = [
    { href: 'index.html', page: 'home', key: 'home' },
    { href: 'hizmetler.html', page: 'services', key: 'services' },
    { href: 'grande-ai.html', page: 'grande', key: 'grande' },
    { href: 'hakkinda.html', page: 'about', key: 'about' },
    { href: 'iletisim.html', page: 'contact', key: 'contact' }
  ];

  /* ---------- Helpers ---------- */
  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function t(obj, lang) {
    if (typeof obj === 'string') return obj;
    if (obj && typeof obj === 'object') {
      if (lang in obj) return obj[lang];
      if ('tr' in obj) return obj.tr;
      return Object.values(obj)[0] || '';
    }
    return '';
  }

  function getLang() {
    const stored = localStorage.getItem(LANG_KEY);
    return stored === 'en' ? 'en' : DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'tr';
    renderAll();
  }

  function gradientLastWords(text, count) {
    count = count || 2;
    const words = text.trim().split(/\s+/);
    if (words.length <= count) return `<span class="grad">${esc(text)}</span>`;
    const head = words.slice(0, -count).join(' ');
    const tail = words.slice(-count).join(' ');
    return `${esc(head)} <span class="grad">${esc(tail)}</span>`;
  }

  function mailtoSubject(prefix, detail) {
    const sub = prefix + (detail ? ' — ' + detail : '');
    return 'mailto:grande26ai@gmail.com?subject=' + encodeURIComponent(sub);
  }

  /* ---------- Icons (stroke SVGs, currentColor) ---------- */
  const ICONS = {
    presentation: '<path d="M2 3h20"/><path d="M12 3v12"/><path d="M8 21l4-6 4 6"/><path d="M5 3l2 12h10l2-12"/>',
    clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
    'check-square': '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    'alert-circle': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    'list-ordered': '<line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>',
    flask: '<path d="M10 2h4"/><path d="M12 2v6"/><path d="M17 14l-2.5 8h-7L5 14"/><path d="M5 14a5 5 0 0 1 14 0Z"/>',
    'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    'file-text': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    repeat: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    'help-circle': '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    server: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
    infinity: '<path d="M13.833 7.833C15.075 6.592 16.925 6.592 18.167 7.833s1.242 3.334 0 4.575-3.334 1.242-4.575 0L10 7.833C8.758 6.592 6.908 6.592 5.667 7.833s-1.242 3.334 0 4.575 3.334 1.242 4.575 0L14 7.833z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    coins: '<circle cx="8" cy="8" r="6"/><path d="M18 8h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2"/><path d="M8 2v4"/><path d="M6 8h4"/>',
    'user-check': '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'
  };

  function iconSvg(name, size) {
    const s = size || 24;
    const path = ICONS[name] || '<circle cx="12" cy="12" r="10"/>';
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  /* ---------- DOM builders ---------- */
  function buildHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const currentPage = document.body.getAttribute('data-page') || 'home';
    const lang = getLang();

    const links = NAV.map(item => {
      const label = t(CONTENT.nav[item.key], lang);
      const current = item.page === currentPage ? ' aria-current="page"' : '';
      return `<li><a class="nav__link" href="${esc(item.href)}"${current}>${esc(label)}</a></li>`;
    }).join('');

    const skipLabel = CONTENT.ui.skipToContent ? t(CONTENT.ui.skipToContent, lang) : (lang === 'en' ? 'Skip to content' : 'İçeriğe atla');
    const navLabel = CONTENT.ui.mainNav ? t(CONTENT.ui.mainNav, lang) : (lang === 'en' ? 'Main menu' : 'Ana menü');

    header.innerHTML = `
      <a class="skip-link" href="#main-content">${esc(skipLabel)}</a>
      <div class="wrap header__wrap">
        <a class="brand" href="index.html" aria-label="${esc(CONTENT.brand.name)}">
          <img class="brand__logo" src="assets/logo-fox-128.png" alt="">
          <span>${esc(CONTENT.brand.name)}</span>
        </a>
        <nav class="nav" id="main-nav" aria-label="${esc(navLabel)}">
          <ul class="nav__list">${links}</ul>
          <div class="nav__controls">
            <button type="button" class="lang-btn" data-set-lang="tr" aria-pressed="${lang === 'tr' ? 'true' : 'false'}">${esc(t(CONTENT.ui.langTr, lang))}</button>
            <button type="button" class="lang-btn" data-set-lang="en" aria-pressed="${lang === 'en' ? 'true' : 'false'}">${esc(t(CONTENT.ui.langEn, lang))}</button>
          </div>
        </nav>
        <button type="button" class="mobile-toggle" id="mobile-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="${esc(t(CONTENT.ui.menu, lang))}">
          <span></span><span></span><span></span>
        </button>
      </div>
    `;
  }

  function buildFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const lang = getLang();
    const rights = t(CONTENT.footer.rights, lang);

    const pageLinks = NAV.map(item => {
      const label = t(CONTENT.nav[item.key], lang);
      return `<a href="${esc(item.href)}">${esc(label)}</a>`;
    }).join('');

    const serviceLinks = (CONTENT.services.items || []).map(item => {
      const label = t(item.title, lang);
      return `<a href="hizmetler.html#${esc(item.id)}">${esc(label)}</a>`;
    }).join('');

    const companyLinks = CONTENT.footer.columns.company.links.map((link, idx) => {
      const label = t(link, lang);
      const href = idx === 2 ? 'grande-ai.html' : (idx === 1 ? 'hakkinda.html#ilkeler' : 'hakkinda.html');
      return `<a href="${esc(href)}">${esc(label)}</a>`;
    }).join('');

    footer.innerHTML = `
      <div class="wrap">
        <div class="footer__grid">
          <div>
            <a class="footer__brand" href="index.html">
              <img src="assets/logo-fox-128.png" alt="">
              <span>${esc(CONTENT.brand.name)}</span>
            </a>
            <p class="footer__tagline">${esc(t(CONTENT.footer.tagline, lang))}</p>
            <div class="footer__social">
              <a href="https://instagram.com/kunitu24" target="_blank" rel="noopener">
                ${iconSvg('instagram', 16)}
                <span>@kunitu24</span>
              </a>
              <a href="mailto:grande26ai@gmail.com">
                ${iconSvg('mail', 16)}
                <span>grande26ai@gmail.com</span>
              </a>
            </div>
          </div>
          <div>
            <div class="footer__col-title">${esc(t(CONTENT.footer.columns.pages.title, lang))}</div>
            <div class="footer__links">${pageLinks}</div>
          </div>
          <div>
            <div class="footer__col-title">${esc(t(CONTENT.footer.columns.services.title, lang))}</div>
            <div class="footer__links">${serviceLinks}</div>
          </div>
          <div>
            <div class="footer__col-title">${esc(t(CONTENT.footer.columns.company.title, lang))}</div>
            <div class="footer__links">${companyLinks}</div>
          </div>
        </div>
        <div class="footer__bottom">
          <span>${esc(rights)}</span>
          <span class="footer__badge">${esc(t(CONTENT.footer.badge, lang))}</span>
          <span>${esc(t(CONTENT.footer.madeWith, lang))}</span>
        </div>
      </div>
    `;
  }

  /* ---------- Inline i18n elements ---------- */
  function applyInlineI18n() {
    const lang = getLang();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), CONTENT);
      if (value !== undefined) {
        el.textContent = t(value, lang);
      }
    });

    document.querySelectorAll('[data-i18n-attr][data-i18n-key]').forEach(el => {
      const attr = el.getAttribute('data-i18n-attr');
      const key = el.getAttribute('data-i18n-key');
      const value = key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), CONTENT);
      if (value !== undefined && attr) {
        el.setAttribute(attr, t(value, lang));
      }
    });
  }

  /* ---------- Page renderers ---------- */
  const observedStatContainers = new Set();

  function renderHome(lang) {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = gradientLastWords(t(CONTENT.home.heroTitle, lang), 2);
    }

    const serviceSummary = document.getElementById('service-summary');
    if (serviceSummary && CONTENT.services.items) {
      serviceSummary.innerHTML = CONTENT.services.items.map(item => `
        <a href="hizmetler.html#${esc(item.id)}" class="service-summary__card reveal">
          <div class="card__icon">${iconSvg(item.icon, 24)}</div>
          <h3>${esc(t(item.title, lang))}</h3>
          <p>${esc(t(item.desc, lang))}</p>
          <span class="service-summary__arrow">${iconSvg('arrow-right', 14)}</span>
        </a>
      `).join('');
    }

    const showcasePill = document.getElementById('showcase-pill');
    if (showcasePill) {
      showcasePill.textContent = t(CONTENT.features.statusPill, lang);
    }

    const showcaseTitle = document.getElementById('showcase-title');
    if (showcaseTitle) {
      showcaseTitle.innerHTML = `<span class="grad">${esc(t(CONTENT.brand.product, lang))}</span>`;
    }

    const valueBento = document.getElementById('value-bento');
    if (valueBento && CONTENT.home.valueProps) {
      valueBento.innerHTML = CONTENT.home.valueProps.map((prop, idx) => `
        <article class="card reveal">
          <div class="value-bento__num">${String(idx + 1).padStart(2, '0')}</div>
          <div class="card__icon">${iconSvg(prop.icon, 22)}</div>
          <h3>${esc(t(prop.title, lang))}</h3>
          <p>${esc(t(prop.desc, lang))}</p>
        </article>
      `).join('');
    }

    renderStats('home-stats', lang);
  }

  function renderServices(lang) {
    const heroTitle = document.getElementById('services-hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = gradientLastWords(t(CONTENT.services.title, lang), 2);
    }

    const bands = document.getElementById('service-bands');
    if (bands && CONTENT.services.items) {
      bands.innerHTML = CONTENT.services.items.map((item, idx) => {
        const voiceExtra = item.id === 'sekreter' ? `
          <div class="service-band__tag">
            ${esc(t(item.voiceTag, lang))}
            <span class="voice-waves" aria-hidden="true">
              <span class="voice-wave voice-wave--1"><span></span><span></span><span></span><span></span><span></span></span>
              <span class="voice-wave voice-wave--2"><span></span><span></span><span></span><span></span><span></span></span>
              <span class="voice-wave voice-wave--3"><span></span><span></span><span></span><span></span><span></span></span>
            </span>
          </div>
        ` : '';

        const imageMap = {
          uygulama: 'service-app.jpg',
          web: 'service-web.jpg',
          sekreter: 'service-voice.jpg'
        };
        const image = imageMap[item.id] || 'service-app.jpg';

        return `
          <section class="service-band" id="${esc(item.id)}">
            <div class="wrap service-band__wrap">
              <div class="service-band__text reveal">
                <div class="service-band__num">${esc(item.no)}</div>
                ${voiceExtra}
                <h2>${esc(t(item.title, lang))}</h2>
                <p>${esc(t(item.desc, lang))}</p>
                <ul class="deliverables">
                  ${(item.deliverables || []).map(d => `<li>${esc(t(d, lang))}</li>`).join('')}
                </ul>
                <a href="${esc(mailtoSubject('Proje görüşmesi', t(item.title, lang)))}" class="btn btn--brand">${esc(t(item.cta, lang))}</a>
              </div>
              <div class="service-band__media reveal">
                <img src="assets/${esc(image)}" alt="" loading="lazy">
              </div>
            </div>
          </section>
        `;
      }).join('');
    }

    const processTimeline = document.getElementById('process-timeline');
    if (processTimeline && CONTENT.services.processSteps) {
      processTimeline.innerHTML = CONTENT.services.processSteps.map(step => `
        <div class="process-step reveal">
          <span class="process-step__dot"></span>
          <div class="process-step__num">${esc(step.step)}</div>
          <h3>${esc(t(step.title, lang))}</h3>
          <p>${esc(t(step.desc, lang))}</p>
        </div>
      `).join('');
    }

    const whyGrid = document.getElementById('why-grid');
    if (whyGrid && CONTENT.services.whyItems) {
      whyGrid.innerHTML = CONTENT.services.whyItems.map(item => `
        <article class="why-card reveal">
          <h3>${esc(t(item.title, lang))}</h3>
          <p>${esc(t(item.desc, lang))}</p>
        </article>
      `).join('');
    }
  }

  function renderGrande(lang) {
    const heroTitle = document.getElementById('grande-hero-title');
    if (heroTitle) {
      heroTitle.textContent = t(CONTENT.features.title, lang);
    }

    const heroPill = document.getElementById('grande-hero-pill');
    if (heroPill) {
      heroPill.textContent = t(CONTENT.features.statusPill, lang);
    }

    renderStats('grande-stats', lang);

    const teacherTools = document.getElementById('teacher-tools');
    if (teacherTools && CONTENT.features.teacherTools) {
      teacherTools.innerHTML = CONTENT.features.teacherTools.map(tool => `
        <article class="card tool-card reveal">
          <div class="card__icon">${iconSvg(tool.icon, 20)}</div>
          <h3>${esc(t(tool.title, lang))}</h3>
          <p>${esc(t(tool.desc, lang))}</p>
        </article>
      `).join('');
    }

    const studentTools = document.getElementById('student-tools');
    if (studentTools && CONTENT.features.studentTools) {
      studentTools.innerHTML = CONTENT.features.studentTools.map(tool => `
        <article class="card tool-card reveal">
          <div class="card__icon">${iconSvg(tool.icon, 20)}</div>
          <h3>${esc(t(tool.title, lang))}</h3>
          <p>${esc(t(tool.desc, lang))}</p>
        </article>
      `).join('');
    }

    const timeline = document.getElementById('grande-timeline');
    if (timeline && CONTENT.home.howSteps) {
      timeline.innerHTML = CONTENT.home.howSteps.map(step => `
        <div class="timeline__item reveal">
          <div class="timeline__num">${esc(step.step)}</div>
          <h3>${esc(t(step.title, lang))}</h3>
          <p>${esc(t(step.desc, lang))}</p>
        </div>
      `).join('');
    }
  }

  function renderAbout(lang) {
    const mission = document.getElementById('mission-text');
    if (mission) {
      mission.innerHTML = gradientLastWords(t(CONTENT.about.mission, lang), 3);
    }

    const pointsGrid = document.getElementById('about-points');
    if (pointsGrid && CONTENT.about.points) {
      pointsGrid.innerHTML = CONTENT.about.points.map((point, idx) => `
        <article class="card reveal">
          <div class="point-num">${String(idx + 1).padStart(2, '0')}</div>
          <div class="card__icon">${iconSvg(point.icon, 22)}</div>
          <h3>${esc(t(point.title, lang))}</h3>
          <p>${esc(t(point.desc, lang))}</p>
        </article>
      `).join('');
    }

    const statusTimeline = document.getElementById('status-timeline');
    if (statusTimeline && CONTENT.about.status) {
      statusTimeline.innerHTML = CONTENT.about.status.map(item => `
        <div class="status-item reveal">
          <h3>${esc(t(item.title, lang))}</h3>
          <p>${esc(t(item.desc, lang))}</p>
        </div>
      `).join('');
    }

    renderStats('about-stats', lang);
  }

  function renderContact(lang) {
    const miniPill = document.getElementById('contact-mini-pill');
    if (miniPill) {
      miniPill.textContent = t(CONTENT.features.statusPill, lang);
    }

    const topics = document.getElementById('contact-topics');
    if (topics && CONTENT.contact.topics) {
      topics.innerHTML = CONTENT.contact.topics.map(topic => `
        <a class="contact-topic" href="${esc(mailtoSubject('Proje görüşmesi', t(topic, lang)))}">${esc(t(topic, lang))}</a>
      `).join('');
    }
  }

  function renderStats(containerId, lang) {
    const container = document.getElementById(containerId);
    if (!container || !CONTENT.home.stats) return;

    const wasObserved = observedStatContainers.has(containerId);
    container.innerHTML = CONTENT.home.stats.map(stat => `
      <div class="stat reveal">
        <span class="stat__value" data-value="${esc(stat.value)}">${wasObserved ? esc(stat.value) : '0'}</span>
        <span class="stat__label">${esc(t(stat.label, lang))}</span>
      </div>
    `).join('');

    if (wasObserved) return;

    if (!window.IntersectionObserver) {
      container.querySelectorAll('.stat__value').forEach(el => {
        el.textContent = el.getAttribute('data-value');
      });
      observedStatContainers.add(containerId);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const values = container.querySelectorAll('.stat__value');
          values.forEach(el => animateCounter(el));
          observedStatContainers.add(containerId);
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(container);
  }

  function animateCounter(el) {
    const raw = el.getAttribute('data-value') || '';
    const match = raw.match(/^([\d.,]*)\s*(.*)$/);
    if (!match) {
      el.textContent = raw;
      return;
    }
    const numStr = match[1].replace(/\./g, '').replace(/,/g, '.');
    const suffix = match[2] || '';
    const target = parseFloat(numStr);
    if (isNaN(target)) {
      el.textContent = raw;
      return;
    }

    const duration = 800;
    const start = performance.now();
    const isFloat = numStr.includes('.');

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      const formatted = isFloat ? current.toFixed(2).replace(/\.00$/, '') : Math.floor(current).toString();
      el.textContent = formatted + suffix;
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = raw;
    }

    requestAnimationFrame(frame);
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!window.IntersectionObserver) {
      elements.forEach(el => el.classList.add('in'));
      return;
    }

    elements.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('in');
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal:not(.in)').forEach(el => observer.observe(el));
  }

  /* ---------- Scroll-scrub sahne (anasayfa) ----------
     Video otomatik OYNAMAZ; sayfa kaydırıldıkça currentTime scroll
     ilerlemesine bağlanır. rAF + lerp ile yumuşatılır. */
  function initScrollScrub() {
    const page = document.body.getAttribute('data-page');
    if (page !== 'home') return;

    const scene = document.querySelector('.scrollscene');
    const video = document.getElementById('scroll-video');
    const hint = document.getElementById('scroll-hint');
    if (!scene || !video) return;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
    const touchOnly = window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    let fellBack = false;
    function fallback() {
      if (fellBack) return;
      fellBack = true;
      scene.classList.add('scrollscene--fallback');
      try { video.pause(); } catch (e) {}
      // İndirmeyi durdur; poster attribute'u fallback arka planında zaten kullanılıyor.
      video.removeAttribute('src');
      try { video.load(); } catch (e) {}
    }

    if (reduced || (small && touchOnly)) {
      fallback();
      return;
    }

    video.addEventListener('error', fallback);
    try { video.pause(); } catch (e) {}

    let duration = 0;
    let target = 0;
    let current = 0;
    let raf = null;

    function sceneProgress() {
      const rect = scene.getBoundingClientRect();
      const total = scene.offsetHeight - window.innerHeight;
      if (total <= 0) return 0;
      return Math.min(1, Math.max(0, -rect.top / total));
    }

    function tick() {
      raf = null;
      if (fellBack) return;
      if (!duration) return; // metadata gelince loadedmetadata -> onScroll yeniden tetikler

      current += (target - current) * 0.18; // lerp: pürüzsüz scrub
      if (Math.abs(target - current) > 0.0005) schedule();
      else current = target;

      const t = current * duration;
      if (Math.abs((video.currentTime || 0) - t) > 0.033) {
        try { video.currentTime = t; } catch (e) {}
      }
      if (hint) hint.style.opacity = String(Math.max(0, 1 - current * 8));
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function onScroll() {
      target = sceneProgress();
      schedule();
    }

    // Metadata çoktan yüklendiyse (önbellek) loadedmetadata bir daha ateşlenmez — iki yolu da kapsa.
    if (video.readyState >= 1 && video.duration) {
      duration = video.duration;
    } else {
      video.addEventListener('loadedmetadata', () => {
        duration = video.duration || 0;
        onScroll();
      }, { once: true });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Page transitions ---------- */
  function initPageTransitions() {
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        document.body.classList.remove('page-exit');
        document.body.style.opacity = '';
      }
    });

    document.body.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      if (!href) return;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('//')) return;
      const cleanPath = href.split('#')[0];
      if (!cleanPath.endsWith('.html')) return;
      // Aynı sayfadaki ankraja gidiliyorsa geçiş uygulama (smooth scroll'a bırak).
      const currentFile = (window.location.pathname.split('/').pop() || 'index.html');
      if (href.includes('#') && cleanPath === currentFile) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      if (link.target === '_blank') return;

      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  }

  /* ---------- Language buttons ---------- */
  function initLangButtons() {
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-set-lang]');
      if (!btn) return;
      setLang(btn.getAttribute('data-set-lang'));
    });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-label', open
        ? t(CONTENT.ui.close, getLang())
        : t(CONTENT.ui.menu, getLang()));
    }

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', (e) => {
      if (e.target.closest('.nav__link')) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- Header solid on scroll ---------- */
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    function update() {
      header.classList.toggle('is-solid', window.scrollY > 20);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    function update() {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    }

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- Main render orchestration ---------- */
  function renderAll() {
    const lang = getLang();
    document.documentElement.lang = lang === 'en' ? 'en' : 'tr';

    buildHeader();
    buildFooter();
    applyInlineI18n();

    const page = document.body.getAttribute('data-page');
    switch (page) {
      case 'home': renderHome(lang); break;
      case 'services': renderServices(lang); break;
      case 'grande': renderGrande(lang); break;
      case 'about': renderAbout(lang); break;
      case 'contact': renderContact(lang); break;
    }

    initMobileMenu();
    initReveal();
  }

  /* ---------- Boot ---------- */
  function boot() {
    if (typeof CONTENT === 'undefined') {
      document.documentElement.classList.add('no-content');
      return;
    }

    renderAll();
    initLangButtons();
    initHeaderScroll();
    initBackToTop();
    initScrollScrub();
    initPageTransitions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
