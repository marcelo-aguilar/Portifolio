(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const smoothstep = (p, e0, e1) => { const t = clamp((p - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  function rng(seed){ let s = seed >>> 0; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }
  const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- wave: every title letter bobs gently, offset along the line ---------- */
  function waveChars(parent, word, start){
    [...word].forEach((ch, j) => {
      const c = document.createElement('span'); c.className = 'c'; c.textContent = ch;
      c.style.setProperty('--ci', start + j);
      parent.appendChild(c);
    });
  }
  function waveSplit(el){
    const text = el.dataset.text;
    el.textContent = '';
    const sr = document.createElement('span'); sr.className = 'sr'; sr.textContent = text; el.appendChild(sr);
    const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
    let ci = 0;
    text.split(' ').forEach((w, i, all) => {
      const ws = document.createElement('span'); ws.className = 'w';
      waveChars(ws, w, ci); ci += w.length + 1;
      vis.appendChild(ws);
      if (i < all.length - 1) vis.appendChild(document.createTextNode(' '));
    });
    el.appendChild(vis);
  }
  const waves = $$('.wave');

  /* ---------- split headlines (re-run when the language changes) ---------- */
  function splitEl(el, n){
    const text = el.dataset.text;
    const r = rng(1234 + n * 97);
    const words = text.split(' ');
    let ci = 0;
    el.textContent = '';
    const sr = document.createElement('span'); sr.className = 'sr'; sr.textContent = text; el.appendChild(sr);
    const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
    words.forEach((w, i) => {
      const ws = document.createElement('span'); ws.className = 'w';
      ws.style.setProperty('--th', (i / words.length * 0.5 + r() * 0.05).toFixed(3));
      waveChars(ws, w, ci); ci += w.length + 1;
      vis.appendChild(ws);
      if (i < words.length - 1) vis.appendChild(document.createTextNode(' '));
    });
    el.appendChild(vis);
  }
  const splits = $$('[data-split]');
  splits.forEach((el, n) => { el.dataset.text = el.textContent.trim(); splitEl(el, n); });

  /* ---------- language: Portuguese lives in the HTML, English lives here ---------- */
  const EN = {
    skip: 'Skip to content', navAbout: 'About', navProj: 'Projects', navHow: 'How I think', navTools: 'Tools',
    kick: 'Software Engineering · Inteli · São Paulo',
    b1sub: 'I open things up to see how they work.',
    b2h: 'Every beautiful screen hides a system.', b2sub: 'That is where I like to work.',
    b3h: 'Screen. Logic. Data.', b3sub: 'I build all three layers.',
    b4h: 'I want to build things people really use.',
    ctaLi: 'Talk to me on LinkedIn', ctaProj: 'See projects', ctaGh: 'See my GitHub', cue: 'scroll to dive in',
    staticSub: 'I open things up to see how they work. And I like building things people really use.',
    pitchCap: 'Pitching at Inteli', altPitch: 'Marcelo pitching an idea with a microphone in front of an audience',
    l1: 'layer 01 · who', aboutH: 'Curious first. Programmer second.',
    aboutP1: 'I study Software Engineering at Inteli, in São Paulo. To me, programming is a way of thinking: take a big problem, break it into small parts, test, fail and improve.',
    aboutP2: 'I like full-stack development, AI and cybersecurity, and I keep exploring all three. Learning new things is part of the job.',
    factOpen: 'Open to new projects',
    l2: 'layer 02 · what I built', projH: 'Two real problems. Two systems live.',
    proj1n: 'project 01', proj2n: 'project 02', built: 'what I built',
    p1prob: 'A 24-hour treadmill relay race needed real-time control.',
    p1built: 'A dashboard with the race clock, each team\'s kilometers live, and separate access for referee, manager and captain.',
    t1a: 'Real time', t1b: 'Access roles', t1c: 'Live dashboard',
    p2prob: 'A barbershop that booked everything through WhatsApp.',
    p2built: 'A website with online booking, a client area with login, and a dashboard where the owner sees revenue and the barber ranking.',
    t2a: 'Booking', t2b: 'Login', t2c: 'Owner dashboard',
    altR1: 'Red Bull 24hrs start screen with total distance and race clock', altR2: 'Dashboard with live kilometers for the red and blue teams',
    altR3: 'Red team operations panel with the treadmills', altR4: 'Profile selection screen: referee, manager and captain',
    altR5: 'Captain view with the team total and latest records',
    altB1: 'Studio Barber home page', altB2: 'Gallery of the barbershop\'s work', altB3: 'Owner dashboard with monthly revenue and barber ranking',
    altB4: 'Service list with prices and duration', altB5: 'Client area sign-up screen',
    prev: 'Previous screen', next: 'Next screen',
    l3: 'layer 03 · how', thinkH: 'Hold to open.', thinkP: 'From the outside, it looks like one block. Inside, this is how I solve a problem.',
    s1h: 'Understand the problem.', s1p: 'Before any code, I ask the people who will use it.',
    s2h: 'Break it into parts.', s2p: 'A big system is a lot of small pieces.',
    s3h: 'Test and improve.', s3p: 'Failing early costs less.',
    veil: 'three closed layers', hold: 'Hold to open the layer', holdDone: 'Layer open.',
    l4: 'layer 04 · with what', toolsH: 'What I use today.', exploring: 'What I am exploring',
    ex1: 'Full-stack development', ex2: 'AI and Machine Learning', ex3: 'Cybersecurity',
    gLang: 'Languages and frameworks', gFront: 'Front-end', gDb: 'Databases', gTools: 'Tools', gAgile: 'Agile methods',
    l5: 'frequent questions', faqH: 'What you might want to know.',
    q1: 'Have you worked on real projects?', a1: 'Yes. I have built projects for real companies and institutions, such as Red Bull, UNIFESP and Cocamar, among many others.',
    q2: 'How do you work in a team?', a2: 'At Inteli we learn through projects with partner companies, always in teams and with Scrum. Presenting, hearing feedback and adjusting is part of the routine.',
    q3: 'What area do you want to work in?', a3: 'I like full-stack, AI and cybersecurity. I want to work close to people who do it well, learn fast and deliver from the first week.',
    q4: 'Where do you live?', a4: 'I live in São Paulo, but I work remotely for anywhere in Brazil or the world.',
    l6: 'last layer', finalH: 'Have a project or an idea? Let\'s talk.',
    title: 'Marcelo Aguilar · Software Engineering',
    desc: 'Portfolio of Marcelo Aguilar, Software Engineering student at Inteli, São Paulo. Full-stack, AI and cybersecurity.'
  };
  const PT = { hold: 'Segure para abrir a camada', holdDone: 'Camada aberta.', title: document.title, desc: document.querySelector('meta[name=description]').content };
  $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (!(k in PT)) PT[k] = el.hasAttribute('data-split') ? el.dataset.text : el.classList.contains('wave') ? el.textContent.trim() : el.innerHTML; });
  $$('[data-i18n-alt]').forEach(el => PT[el.dataset.i18nAlt] = el.alt);
  $$('[data-i18n-aria]').forEach(el => PT[el.dataset.i18nAria] = el.getAttribute('aria-label'));
  waves.forEach(el => { el.dataset.text = el.textContent.trim(); waveSplit(el); });
  let lang = 'pt';
  const t = k => (lang === 'en' ? EN : PT)[k] ?? PT[k];
  const langBox = $('.lang');
  function setLang(l){
    lang = l === 'en' ? 'en' : 'pt';
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.title = t('title');
    document.querySelector('meta[name=description]').content = t('desc');
    $$('[data-i18n]').forEach(el => {
      const v = t(el.dataset.i18n);
      if (el.hasAttribute('data-split')) { if (el.dataset.text !== v){ el.dataset.text = v; splitEl(el, splits.indexOf(el)); } }
      else if (el.classList.contains('wave')) { if (el.dataset.text !== v){ el.dataset.text = v; waveSplit(el); } }
      else if (el.innerHTML !== v) el.innerHTML = v;
    });
    $$('[data-i18n-alt]').forEach(el => el.alt = t(el.dataset.i18nAlt));
    $$('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
    const hlEl = document.querySelector('#hold .hl');
    if (hlEl) hlEl.textContent = document.querySelector('#stack').classList.contains('open') ? t('holdDone') : t('hold');
    langBox.classList.toggle('en', lang === 'en');
    $$('button', langBox).forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false'));
    try { localStorage.setItem('lang', lang); } catch {}
  }
  $$('button', langBox).forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch {}
  if (!saved && !/^pt/i.test(navigator.language || 'pt')) saved = 'en';
  if (saved === 'en') setLang('en');

  /* ---------- hero ---------- */
  const hero = $('.hero'), bg = $('.bg'), flare = $('.flare'), base = $('.base'), cue = $('.cue');
  const panes = $$('.pane').map(el => ({ el, t: +el.dataset.t, last: '' }));
  const bands = $$('.band').map((el, i, all) => ({ el, a: +el.dataset.a, b: +el.dataset.b, ramp: el.dataset.ramp ? +el.dataset.ramp : 0, first: i === 0, last: i === all.length - 1, op: -1, k: -1 }));
  const PASS_T = panes.map(p => p.t);

  function heroProgress(){
    const r = hero.getBoundingClientRect();
    const range = hero.offsetHeight - innerHeight;
    return range > 0 ? clamp(-r.top / range, 0, 1) : 0;
  }

  let loadK = 0, loadStart = 0;
  function updateCaptions(p){
    for (const b of bands){
      const f = Math.min(0.02, (b.b - b.a) / 3);
      const inE = b.first ? 1 : smoothstep(p, b.a, b.a + f);
      const outE = b.last ? 1 : 1 - smoothstep(p, b.b - f, b.b);
      let op = +(inE * outE).toFixed(3);
      let k = clamp((p - b.a) / (b.ramp || Math.min(0.025, (b.b - b.a) * 0.35)), 0, 1);
      if (b.first) k = Math.max(k, loadK);
      k = +k.toFixed(3);
      if (op !== b.op){ b.op = op; b.el.style.opacity = op; b.el.style.visibility = op < 0.01 ? 'hidden' : 'visible'; }
      if (Math.abs(k - b.k) > 0.008 || (k !== b.k && (k === 0 || k === 1))){ b.k = k; b.el.style.setProperty('--k', k); }
    }
  }

  let lastBg = '', lastFlare = -1, lastBase = -1, cueGone = false;
  function renderStage(p){
    // camera descent: the image drifts up as we go down, with a small push-in at the arrival
    const y = 7 - 14 * p;
    const s = 1.14 + 0.08 * smoothstep(p, 0.8, 1);
    const bgT = `translate3d(0,${y.toFixed(2)}vh,0) scale(${s.toFixed(4)})`;
    if (bgT !== lastBg){ lastBg = bgT; bg.style.transform = bgT; }
    // foreground panes pass the lens, closer so faster
    for (const pn of panes){
      const d = pn.t - p;
      const ty = 50 + d * 320;            // vh
      const sc = 1 + Math.max(0, -d) * 2.2 + Math.max(0, d) * -0.6;
      const op = clamp(1 - Math.abs(d) * 4.2, 0, 1) * 0.9;
      const key = ty.toFixed(1) + '|' + sc.toFixed(3) + '|' + op.toFixed(2);
      if (key !== pn.last){
        pn.last = key;
        pn.el.style.transform = `translate3d(0,${ty.toFixed(2)}vh,0) scale(${Math.max(0.3, sc).toFixed(3)})`;
        pn.el.style.opacity = op.toFixed(2);
      }
    }
    // lens flare peaks as each pane crosses the middle
    let fl = 0;
    for (const t of PASS_T){ const d = (p - t) / 0.03; fl = Math.max(fl, Math.exp(-d * d)); }
    fl = +(fl * 0.85).toFixed(2);
    if (fl !== lastFlare){ lastFlare = fl; flare.style.opacity = fl; }
    const bs = +smoothstep(p, 0.74, 1).toFixed(2);
    if (bs !== lastBase){ lastBase = bs; base.style.opacity = bs; }
    const g = p > 0.03;
    if (g !== cueGone){ cueGone = g; cue.classList.toggle('gone', g); }
  }

  let target = 0, shown = 0, rafId = null, lastTick = 0, heroOnScreen = true;
  function tick(now){
    const dt = Math.min(100, now - (lastTick || now));
    lastTick = now;
    if (loadK < 1){ loadK = clamp((now - loadStart) / 1400, 0, 1); loadK = 1 - Math.pow(1 - loadK, 3); }
    shown += (target - shown) * (1 - Math.pow(1 - 0.12, dt / 16.667));
    const converged = Math.abs(target - shown) < 0.0005;
    if (converged) shown = target;
    renderStage(shown);
    updateCaptions(shown);
    if (converged && loadK >= 1){ rafId = null; lastTick = 0; }
    else rafId = requestAnimationFrame(tick);
  }
  function onScroll(){
    target = heroProgress();
    if (rafId === null && heroOnScreen && scrubOn) rafId = requestAnimationFrame(tick);
  }
  new IntersectionObserver(es => { heroOnScreen = es[0].isIntersecting; if (heroOnScreen) onScroll(); }).observe(hero);

  const GATES = [
    '(max-width: 720px)',
    '(orientation: portrait) and (max-width: 1024px)',
    '(orientation: portrait) and (pointer: coarse)',
    '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
    '(prefers-reduced-motion: reduce)'
  ];
  let scrubOn = false;
  function enableScrub(){
    if (scrubOn) return; scrubOn = true;
    if (!loadStart){ loadStart = performance.now(); }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    bands.forEach(b => { b.op = -1; b.k = -1; });
    panes.forEach(p => p.last = '');
    lastBg = ''; lastFlare = -1; lastBase = -1;
    shown = target = heroProgress();
    unpinFinalStates();
    updateCaptions(shown); renderStage(shown);
    rafId = requestAnimationFrame(tick);
  }
  function disableScrub(){
    if (!scrubOn) return; scrubOn = false;
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onScroll);
    if (rafId !== null){ cancelAnimationFrame(rafId); rafId = null; }
    // hand the stage back to CSS
    bg.style.transform = ''; flare.style.opacity = ''; base.style.opacity = '';
    panes.forEach(p => { p.el.style.transform = ''; p.el.style.opacity = ''; });
  }
  function applyHeroMode(){
    if (GATES.some(q => matchMedia(q).matches)) disableScrub(); else enableScrub();
  }
  const MQLS = GATES.map(q => matchMedia(q));
  MQLS.forEach(m => m.addEventListener('change', applyHeroMode));

  /* ---------- nav + depth rail ---------- */
  const nav = $('.nav');
  const railFill = $('.rail .fill'), railRead = $('.rail .read'), marks = $$('.rail .mark');
  const layers = $$('main [data-layer]');
  let lastRail = -1, lastLabel = '', lastLabelAt = 0, navSolid = null, railRaf = null;
  function railUpdate(){
    railRaf = null;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
    const off = +(1 - p).toFixed(3);
    if (off !== lastRail){ lastRail = off; railFill.style.strokeDashoffset = off; }
    let depth = 0;
    for (const s of layers){ if (s.getBoundingClientRect().top < innerHeight * 0.5) depth = +s.dataset.layer; }
    marks.forEach((m, i) => { const on = i <= depth; if (m.classList.contains('on') !== on) m.classList.toggle('on', on); });
    const now = performance.now();
    const label = 'camada 0' + depth;
    if (label !== lastLabel && now - lastLabelAt > 100){ lastLabel = label; lastLabelAt = now; railRead.textContent = label; }
    const solid = scrollY > innerHeight * 0.6;
    if (solid !== navSolid){ navSolid = solid; nav.classList.toggle('solid', solid); }
  }
  addEventListener('scroll', () => { if (railRaf === null) railRaf = requestAnimationFrame(railUpdate); }, { passive: true });
  railUpdate();

  /* ---------- entrances ---------- */
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const t = e.target;
      t.classList.add('in');
      io.unobserve(t);
      setTimeout(() => t.classList.add('settled'), 1600);   // retire the stagger so hovers respond instantly
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  // each block reveals its own .rv children; the tall projects section reveals per project
  $$('main section:not(.projects) .wrap, .final .inner, .split-line, .projects .head, .proj').forEach(el => io.observe(el));

  const live = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('live', e.isIntersecting)));
  $$('main section, .hero').forEach(s => live.observe(s));
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('paused', document.hidden));

  /* ---------- project carousels: rotate on their own, pause on hover, focus, off-screen and reduced motion ---------- */
  const carousels = $$('.viewer').map(v => {
    const root = $('.carousel', v), track = $('.track', v), dots = $$('.dot', v), n = dots.length;
    const c = { i: 0, timer: null, hover: false, visible: false };
    function go(i){
      c.i = (i + n) % n;
      track.style.transform = `translate3d(${-100 * c.i}%,0,0)`;
      dots.forEach((d, j) => d.setAttribute('aria-pressed', j === c.i ? 'true' : 'false'));
      restart();
    }
    function restart(){
      clearTimeout(c.timer); root.classList.remove('run');
      if (c.hover || !c.visible || reduceMQ.matches || document.hidden) return;
      void root.offsetWidth;                    // restart the progress bar animation
      root.classList.add('run');
      c.timer = setTimeout(() => go(c.i + 1), 4500);
    }
    c.restart = restart;
    dots.forEach((d, j) => d.addEventListener('click', () => go(j)));
    $('.prev', v).addEventListener('click', () => go(c.i - 1));
    $('.next', v).addEventListener('click', () => go(c.i + 1));
    root.addEventListener('pointerenter', () => { c.hover = true; restart(); });
    root.addEventListener('pointerleave', () => { c.hover = false; restart(); });
    root.addEventListener('focusin', () => { c.hover = true; restart(); });
    root.addEventListener('focusout', () => { c.hover = false; restart(); });
    let sx = null;
    root.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(c.i + (dx < 0 ? 1 : -1)); sx = null; });
    new IntersectionObserver(es => { c.visible = es[0].isIntersecting; restart(); }, { threshold: 0.35 }).observe(root);
    return c;
  });
  document.addEventListener('visibilitychange', () => carousels.forEach(c => c.restart()));
  reduceMQ.addEventListener('change', () => carousels.forEach(c => c.restart()));

  /* ---------- the one interactive moment: hold to open the layer ---------- */
  const stack = $('#stack'), hold = $('#hold'), hl = $('.hl', hold);
  let hp = 0, holding = false, holdRaf = null, holdLast = 0, opened = false, lastHp = -1;
  function holdTick(now){
    const dt = Math.min(100, now - (holdLast || now)); holdLast = now;
    if (holding) hp = Math.min(1, hp + dt / 1500);
    else hp = Math.max(0, hp - dt / 900 * (0.4 + hp));     // eases back, never snaps
    const v = +hp.toFixed(3);
    if (v !== lastHp){ lastHp = v; hold.style.setProperty('--p', v); stack.style.setProperty('--p', v); }
    if (hp >= 1){ openStack(); holdRaf = null; holdLast = 0; return; }
    if (holding || hp > 0) holdRaf = requestAnimationFrame(holdTick);
    else { holdRaf = null; holdLast = 0; }
  }
  function openStack(){
    if (opened) return; opened = true; holding = false;
    stack.classList.add('open'); stack.style.setProperty('--open', 1); stack.style.setProperty('--p', 0);
    hold.classList.add('done'); hold.style.setProperty('--p', 1); hl.textContent = t('holdDone');
  }
  function closeStackPins(){
    opened = false; hp = 0; lastHp = -1;
    stack.classList.remove('open'); stack.style.setProperty('--open', 0); stack.style.setProperty('--p', 0);
    hold.classList.remove('done'); hold.style.setProperty('--p', 0); hl.textContent = t('hold');
  }
  function startHold(e){
    if (opened) return;
    if (reduceMQ.matches){ openStack(); return; }
    if (e.type === 'pointerdown') hold.setPointerCapture?.(e.pointerId);
    holding = true;
    if (holdRaf === null) holdRaf = requestAnimationFrame(holdTick);
  }
  function endHold(){ holding = false; if (holdRaf === null && hp > 0 && !opened) holdRaf = requestAnimationFrame(holdTick); }
  hold.addEventListener('pointerdown', startHold);
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => hold.addEventListener(t, endHold));
  hold.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat){ e.preventDefault(); startHold(e); } });
  hold.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') endHold(); });
  hold.addEventListener('contextmenu', e => e.preventDefault());

  /* ---------- reduced motion, live in both directions ---------- */
  let pinnedByRM = false;
  function pinToFinalStates(){
    $$('.rv, .split-line, main section .wrap, .final .inner, .projects .head, .proj').forEach(el => el.classList.add('in', 'settled'));
    if (!opened){ openStack(); pinnedByRM = true; }
    railFill.style.strokeDashoffset = 0;
  }
  function unpinFinalStates(){
    if (pinnedByRM){ closeStackPins(); pinnedByRM = false; }
    lastRail = -1; railUpdate();
  }
  reduceMQ.addEventListener('change', e => { if (e.matches) pinToFinalStates(); else applyHeroMode(); });
  if (reduceMQ.matches) pinToFinalStates();

  applyHeroMode();
})();
