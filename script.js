/* PrintLab — interacciones (JavaScript vanilla) */
(() => {
  'use strict';

  // Cambiá este número por el WhatsApp del negocio (código de país + área, sin + ni espacios).
  const WHATSAPP = '5492954000000';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  $('#year').textContent = new Date().getFullYear();

  /* ---------- Nav: estado al hacer scroll + barra de progreso ---------- */
  const nav = $('#nav');
  const progress = $('.scroll-progress');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      nav.classList.toggle('is-scrolled', y > 30);
      progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú mobile ---------- */
  const menuBtn = $('#menuBtn');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $$('#navLinks a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Link activo según sección ---------- */
  const links = $$('.nav-links a:not(.btn)');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => spy.observe(s));

  /* ---------- Scroll reveal con escalonado ---------- */
  const groups = new Map();
  $$('.reveal').forEach((el) => {
    const parent = el.parentElement;
    const i = groups.get(parent) || 0;
    el.style.setProperty('--d', `${Math.min(i, 6) * 0.09}s`);
    groups.set(parent, i + 1);
  });
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); revealObs.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el) => revealObs.observe(el));

  /* ---------- Contadores ---------- */
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const to = +el.dataset.to;
      const t0 = performance.now();
      const dur = reduced ? 1 : 1600;
      const step = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString('es-AR');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$('.count').forEach((el) => countObs.observe(el));

  /* ---------- Galería: fotos o figura de reemplazo ---------- */
  $$('.card-media img').forEach((img) => {
    const card = img.closest('.card');
    const fail = () => card.classList.add('no-img');
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener('error', fail);
  });

  /* ---------- Filtros de galería ---------- */
  $$('.chip').forEach((chip) => chip.addEventListener('click', () => {
    $$('.chip').forEach((c) => { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-pressed', String(c === chip)); });
    const f = chip.dataset.filter;
    $$('.gallery .card').forEach((card) => card.classList.toggle('is-hidden', f !== 'all' && card.dataset.cat !== f && card.dataset.cat !== 'all'));
  }));

  /* ---------- Tilt 3D en tarjetas ---------- */
  if (finePointer && !reduced) {
    $$('.tilt').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.classList.add('is-tilting');
        card.style.setProperty('--ry', `${(x - 0.5) * 14}deg`);
        card.style.setProperty('--rx', `${(0.5 - y) * 14}deg`);
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.classList.remove('is-tilting');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });

    /* Botones magnéticos */
    $$('.magnetic').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--bx', `${(e.clientX - r.left - r.width / 2) * 0.25}px`);
        btn.style.setProperty('--by', `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
      });
      btn.addEventListener('pointerleave', () => { btn.style.setProperty('--bx', '0px'); btn.style.setProperty('--by', '0px'); });
    });
  }

  /* ---------- Cursor personalizado ---------- */
  if (finePointer && !reduced) {
    document.body.classList.add('has-cursor');
    const cursor = $('.cursor');
    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');
    let mx = -100, my = -100, rx = -100, ry = -100;
    addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; cursor.classList.remove('is-hidden'); }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
    addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    document.addEventListener('pointerover', (e) => {
      cursor.classList.toggle('is-hover', !!e.target.closest('a, button, .card, select, input, textarea'));
    });
    const loop = () => {
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Partículas de fondo (pocas y livianas) ---------- */
  const pc = $('#particles');
  const pctx = pc.getContext('2d');
  let pts = [], pw, ph, dpr;
  const colors = ['34,200,255', '193,60,255', '123,92,255'];
  const resizeParticles = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    pw = innerWidth; ph = innerHeight;
    pc.width = pw * dpr; pc.height = ph * dpr;
    pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(70, (pw * ph) / 22000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * pw, y: Math.random() * ph,
      vx: (Math.random() - 0.5) * 0.15, vy: -Math.random() * 0.25 - 0.05,
      r: Math.random() * 1.6 + 0.4, c: colors[(Math.random() * 3) | 0], a: Math.random() * 0.5 + 0.2,
    }));
  };
  const drawParticles = () => {
    pctx.clearRect(0, 0, pw, ph);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = ph + 10; p.x = Math.random() * pw; }
      if (p.x < -10) p.x = pw + 10; else if (p.x > pw + 10) p.x = -10;
      pctx.beginPath();
      pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pctx.fillStyle = `rgba(${p.c},${p.a})`;
      pctx.fill();
    }
  };

  /* ---------- Holograma: figura 3D de puntos que se "imprime" ---------- */
  const hc = $('#hologram');
  const hctx = hc.getContext('2d');
  const layerNum = $('#layerNum');
  const layerBar = $('#layerBar');
  const model = [];
  (() => {
    // Construye una figura chibi con puntos: cabeza, cuerpo, brazos, piernas y base.
    const add = (x, y, z) => model.push({ x, y, z });
    const sphere = (cx, cy, cz, r, n) => {
      for (let i = 0; i < n; i++) {
        const u = Math.acos(1 - 2 * (i + 0.5) / n), v = Math.PI * (1 + Math.sqrt(5)) * i;
        add(cx + r * Math.sin(u) * Math.cos(v), cy + r * Math.cos(u), cz + r * Math.sin(u) * Math.sin(v));
      }
    };
    const cyl = (cx, cy, cz, r1, r2, h, rings, per) => {
      for (let j = 0; j <= rings; j++) {
        const t = j / rings, r = r1 + (r2 - r1) * t;
        for (let i = 0; i < per; i++) {
          const a = (i / per) * Math.PI * 2 + j * 0.3;
          add(cx + Math.cos(a) * r, cy + h * t, cz + Math.sin(a) * r);
        }
      }
    };
    sphere(0, -0.95, 0, 0.55, 520);           // cabeza
    sphere(-0.2, -0.95, 0.5, 0.07, 14);       // ojo
    sphere(0.2, -0.95, 0.5, 0.07, 14);        // ojo
    cyl(0, -0.4, 0, 0.26, 0.38, 0.72, 10, 30); // torso
    cyl(-0.36, -0.32, 0, 0.09, 0.08, 0.55, 7, 12);
    cyl(0.36, -0.32, 0, 0.09, 0.08, 0.55, 7, 12);
    cyl(-0.15, 0.32, 0, 0.11, 0.1, 0.5, 6, 14); // pierna
    cyl(0.15, 0.32, 0, 0.11, 0.1, 0.5, 6, 14);
    cyl(0, 0.84, 0, 0.62, 0.62, 0.12, 2, 60); // base
    for (let i = 0; i < 90; i++) { const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 0.6; add(Math.cos(a) * r, 0.96, Math.sin(a) * r); }
  })();
  const minY = Math.min(...model.map((p) => p.y)), maxY = Math.max(...model.map((p) => p.y));
  let hw, hh, hdpr;
  const resizeHolo = () => {
    hdpr = Math.min(devicePixelRatio || 1, 2);
    const r = hc.getBoundingClientRect();
    hw = r.width; hh = r.height;
    hc.width = hw * hdpr; hc.height = hh * hdpr;
    hctx.setTransform(hdpr, 0, 0, hdpr, 0, 0);
  };
  let pointerTilt = 0;
  if (finePointer) addEventListener('pointermove', (e) => { pointerTilt = (e.clientY / innerHeight - 0.5) * 0.4; }, { passive: true });

  const CYCLE = 9000; // ms: imprimir + mostrar
  const drawHolo = (t) => {
    hctx.clearRect(0, 0, hw, hh);
    const phase = (t % CYCLE) / CYCLE;
    const printP = reduced ? 1 : Math.min(phase / 0.7, 1);            // 0→1 durante el 70% del ciclo
    const cut = maxY - (maxY - minY) * printP;                          // se imprime de abajo hacia arriba
    const angle = t * 0.0006;
    const tilt = 0.18 + pointerTilt;
    const ca = Math.cos(angle), sa = Math.sin(angle), ct = Math.cos(tilt), st = Math.sin(tilt);
    const scale = Math.min(hw, hh) * 0.36;
    const cx = hw / 2, cy = hh * 0.52;
    hctx.globalCompositeOperation = 'lighter';
    for (const p of model) {
      const x1 = p.x * ca - p.z * sa;
      const z1 = p.x * sa + p.z * ca;
      const y1 = p.y * ct - z1 * st;
      const z2 = p.y * st + z1 * ct;
      const persp = 2.6 / (2.6 + z2);
      const sx = cx + x1 * scale * persp, sy = cy + y1 * scale * persp;
      const depth = (z2 + 1) / 2; // 0 adelante, 1 atrás
      const printed = p.y >= cut;
      const nearCut = Math.abs(p.y - cut) < 0.05 && printP < 1;
      let col, a, size;
      if (nearCut) { col = '193,60,255'; a = 1; size = 2.2; }
      else if (printed) { col = depth < 0.5 ? '34,200,255' : '123,92,255'; a = 0.9 - depth * 0.55; size = 1.5 * persp; }
      else { col = '123,92,255'; a = 0.2; size = 1.1; }
      hctx.fillStyle = `rgba(${col},${a})`;
      hctx.fillRect(sx - size / 2, sy - size / 2, size, size);
    }
    // plano de impresión
    if (printP < 1) {
      const py = cy + cut * scale * ct;
      const g = hctx.createLinearGradient(0, 0, hw, 0);
      g.addColorStop(0, 'rgba(193,60,255,0)'); g.addColorStop(0.5, 'rgba(193,60,255,.7)'); g.addColorStop(1, 'rgba(193,60,255,0)');
      hctx.fillStyle = g;
      hctx.fillRect(hw * 0.15, py, hw * 0.7, 1.5);
    }
    hctx.globalCompositeOperation = 'source-over';
    const layer = Math.round(printP * 240);
    layerNum.textContent = String(layer).padStart(3, '0');
    layerBar.style.transform = `scaleX(${printP})`;
  };

  /* ---------- Un único loop que se pausa fuera de pantalla ---------- */
  let heroVisible = true, running = true;
  new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; }).observe(hc);
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) requestAnimationFrame(frame); });
  function frame(t) {
    if (!running) return;
    if (!reduced) drawParticles();
    if (heroVisible) drawHolo(t);
    if (!reduced || heroVisible) requestAnimationFrame(frame);
  }
  const resize = () => { resizeParticles(); resizeHolo(); if (reduced) { drawParticles(); drawHolo(0); } };
  let rT; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(resize, 150); });
  resize();
  requestAnimationFrame(frame);

  /* ---------- Planes → formulario ---------- */
  const planSelect = $('#planSelect');
  $$('[data-plan]').forEach((b) => b.addEventListener('click', () => { planSelect.value = b.dataset.plan; }));

  /* ---------- Formulario → WhatsApp ---------- */
  const form = $('#orderForm');
  const msg = $('#formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = (data.get('nombre') || '').trim();
    const input = form.elements.nombre;
    if (!nombre) {
      input.setAttribute('aria-invalid', 'true');
      msg.textContent = '> Falta tu nombre para armar el mensaje.';
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');
    msg.textContent = '';
    const text = `Hola PrintLab! Soy ${nombre}. Quiero una figura de: ${data.get('tipo')}. Paquete: ${data.get('plan')}.` +
      (data.get('idea') ? ` Idea: ${data.get('idea').trim()}` : '');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
  form.elements.nombre.addEventListener('input', (e) => { if (e.target.value.trim()) { e.target.removeAttribute('aria-invalid'); msg.textContent = ''; } });
})();
