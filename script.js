/* ==========================================================
   ZEMAR — tienda de una página
   Datos del catálogo, ilustraciones SVG, filtros, búsqueda,
   ficha de producto, bolsa y pedidos por WhatsApp.
   ========================================================== */

const WHATSAPP = '573228913539';
const BAG_KEY = 'zemar-bolsa';

const NARANJA = '#FF5B1F';
const COLORS = {
  negro:        { label: 'negro',        fabric: '#1B1A19', swatch: '#0E0E0E' },
  hueso:        { label: 'hueso',        fabric: '#F1EEE7', swatch: '#F1EEE7' },
  piedra:       { label: 'piedra',       fabric: '#6F6B64', swatch: '#6F6B64' },
  transparente: { label: 'transparente', fabric: 'rgba(241,238,231,.10)', swatch: 'transparent' },
};

const ADULT = ['S', 'M', 'L', 'XL', 'XXL'];
const KIDS = ['4', '6', '8', '10', '12'];

/* Catálogo de arranque.
   OJO: nombres y precios son DE EJEMPLO; el usuario los confirma después.
   img (opcional): ruta a foto propia, o un objeto por color
   { negro: 'assets/productos/cam-noche-negro.jpg', ... }. Si no hay, se dibuja el SVG. */
const PRODUCTS = [
  { id: 'cam-noche', name: 'camiseta noche', cat: 'camisetas', aud: 'adultos', type: 'tee',
    line: 'algodón 100 % · logo pecho', desc: 'la camiseta base de zemar. logo en el pecho y logo grande en la espalda.',
    price: 69900, colors: ['negro', 'hueso', 'piedra'], sizes: ADULT,
    print: 'logo en el pecho; espalda: logo grande', art: { front: 'logo', back: 'biglogo' }, badge: 'más pedida' },
  { id: 'cam-senal', name: 'camiseta señal oversize', cat: 'camisetas', aud: 'adultos', type: 'tee',
    line: 'oversize · ícono pecho', desc: 'corte amplio. ícono pequeño adelante; atrás, el punto naranja de lo que viene.',
    price: 79900, colors: ['hueso', 'negro'], sizes: ADULT,
    print: 'ícono pequeño en el pecho; espalda: punto naranja grande + "lo que viene"', art: { front: 'icon', back: 'senal' } },
  { id: 'cam-yoru', name: 'camiseta yoru 夜', cat: 'camisetas', aud: 'jóvenes', type: 'tee',
    line: 'yoru · noche', desc: '夜 significa noche. grande al frente, con su lectura en mono.',
    price: 69900, colors: ['negro', 'piedra'], sizes: ['S', 'M', 'L', 'XL'],
    print: '夜 grande + "YORU · NOCHE" en mono', art: { front: 'yoru', back: 'neck' }, badge: 'nuevo' },
  { id: 'cam-sigue', name: 'camiseta lo que sigue', cat: 'camisetas', aud: 'adultos', type: 'tee',
    line: 'texto pecho', desc: 'para los que ya están pensando en lo que viene.',
    price: 69900, colors: ['negro', 'hueso'], sizes: ADULT,
    print: 'texto "lo que sigue···"', art: { front: 'text', back: 'neck' }, text: 'lo que sigue···' },
  { id: 'cam-pronto', name: 'camiseta pronto (niños)', cat: 'camisetas', aud: 'niños', type: 'tee',
    line: 'niños · tallas 4 a 12', desc: 'para los más pequeños, que tampoco saben esperar.',
    price: 49900, colors: ['hueso', 'negro'], sizes: KIDS,
    print: 'texto "pronto···"', art: { front: 'text', back: 'neck' }, text: 'pronto···' },
  { id: 'cam-cargando', name: 'camiseta cargando (niños)', cat: 'camisetas', aud: 'niños', type: 'tee',
    line: 'niños · ícono grande', desc: 'los tres puntos, cargando. tallas 4 a 12.',
    price: 49900, colors: ['negro', 'hueso'], sizes: KIDS,
    print: 'ícono de 3 puntos grande', art: { front: 'bigicon', back: 'neck' } },
  { id: 'vaso-20', name: 'vaso térmico 20 oz', cat: 'vasos', aud: 'todos', type: 'tumbler',
    line: 'acero · 20 oz', desc: 'mantiene frío o caliente por horas. tapa con pitillo.',
    price: 54900, colors: ['negro', 'hueso'], sizes: [], print: 'ícono (uv o láser)' },
  { id: 'vaso-vidrio', name: 'vaso de vidrio 16 oz', cat: 'vasos', aud: 'todos', type: 'glass',
    line: 'vidrio · 16 oz', desc: 'vidrio con tapa y pitillo. logo en hueso.',
    price: 29900, colors: ['transparente'], sizes: [], print: 'logo en hueso' },
  { id: 'termo-500', name: 'termo nocturno 500 ml', cat: 'termos', aud: 'todos', type: 'bottle',
    line: 'acero · 500 ml', desc: 'termo de doble pared con aro para llevar. logo en el tercio superior.',
    price: 69900, colors: ['negro', 'piedra'], sizes: [], print: 'logo vertical en el tercio superior' },
  { id: 'taza-11', name: 'taza algo viene 11 oz', cat: 'vasos', aud: 'todos', type: 'mug',
    line: 'cerámica · 11 oz', desc: 'para el café de la espera. "algo viene." en sublimación.',
    price: 34900, colors: ['hueso'], sizes: [], print: '"algo viene." (sublimación)' },
];

const FILTERS = [
  { key: 'todo', label: 'todo' },
  { key: 'camisetas', label: 'camisetas' },
  { key: 'vasos', label: 'vasos y termos' },
  { key: 'niños', label: 'niños' },
  { key: 'jóvenes', label: 'jóvenes' },
  { key: 'adultos', label: 'adultos' },
];

/* ---------- utilidades ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const fmt = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });
const money = (n) => '$' + fmt.format(n);
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const byId = (id) => PRODUCTS.find((p) => p.id === id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function waLink(text) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}
function openWhatsApp(text) {
  window.open(waLink(text), '_blank', 'noopener');
}

/* ==========================================================
   Ilustraciones SVG
   viewBox base 400 × 500; cada forma devuelve su dibujo y el
   punto de enfoque del estampado (para la vista "detalle").
   ========================================================== */
let uid = 0;

function inkFor(color) {
  return color === 'hueso' ? '#0E0E0E' : '#F1EEE7';
}

// logo: zemar + tres puntos que suben; solo el tercero en naranja
function logoMark(cx, y, s, ink) {
  const w = s * 2.72;
  const total = w + s * 0.62;
  const x0 = cx - total / 2;
  let x = x0 + w + s * 0.08;
  const d1 = `<circle cx="${x + s * .045}" cy="${y - s * .045}" r="${s * .045}" fill="${ink}"/>`;
  x += s * .16;
  const d2 = `<circle cx="${x + s * .065}" cy="${y - s * .065 - s * .07}" r="${s * .065}" fill="${ink}"/>`;
  x += s * .2;
  const d3 = `<circle cx="${x + s * .09}" cy="${y - s * .09 - s * .16}" r="${s * .09}" fill="${NARANJA}"/>`;
  return `<text x="${x0}" y="${y}" font-family="Space Grotesk, Arial, sans-serif" font-weight="700" font-size="${s}" letter-spacing="-0.04em" textLength="${w}" lengthAdjust="spacing" fill="${ink}">zemar</text>${d1}${d2}${d3}`;
}

// ícono: tres puntos en diagonal ascendente
function iconMark(cx, cy, s, ink) {
  return `<circle cx="${cx - s * .95}" cy="${cy + s * .8}" r="${s * .3}" fill="${ink}"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${s * .42}" fill="${ink}"/>`
    + `<circle cx="${cx + s * 1.15}" cy="${cy - s * .95}" r="${s * .58}" fill="${NARANJA}"/>`;
}

function monoText(cx, y, s, ink, txt) {
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="${s}" letter-spacing="0.14em" fill="${ink}">${esc(txt)}</text>`;
}

function displayText(cx, y, s, ink, txt) {
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-weight="700" font-size="${s}" letter-spacing="-0.04em" fill="${ink}">${esc(txt)}</text>`;
}

const TEE_ART = {
  logo:    { f: [200, 178], draw: (ink) => logoMark(200, 186, 30, ink) },
  icon:    { f: [238, 176], draw: (ink) => iconMark(238, 178, 9, ink) },
  yoru:    { f: [200, 238], draw: (ink) => `<text x="200" y="280" text-anchor="middle" font-family="'Noto Sans JP','Yu Gothic','Hiragino Sans','Meiryo',sans-serif" font-weight="700" font-size="128" fill="${ink}">夜</text>` + monoText(200, 312, 11, ink, 'YORU · NOCHE') },
  text:    { f: [200, 190], draw: (ink, p) => displayText(200, 200, 25, ink, p.text) },
  bigicon: { f: [200, 230], draw: (ink) => iconMark(198, 238, 34, ink) },
  biglogo: { f: [200, 222], draw: (ink) => logoMark(200, 240, 62, ink) },
  senal:   { f: [200, 240], draw: (ink) => `<circle cx="200" cy="226" r="46" fill="${NARANJA}"/>` + monoText(200, 312, 13, ink, 'LO QUE VIENE') },
  neck:    { f: [200, 150], draw: (ink) => logoMark(200, 152, 16, ink) },
};

function teeShape(p, color, view, sid) {
  const fab = COLORS[color].fabric;
  const ink = inkFor(color);
  const back = view === 'back';
  const neck = back ? 'Q200 104 155 90' : 'Q200 128 155 90';
  const body = `M155 90 L100 108 L42 178 L80 214 L114 188 L114 428 Q200 436 286 428 L286 188 L320 214 L358 178 L300 108 L245 90 ${neck} Z`;
  const line = color === 'hueso' ? 'rgba(14,14,14,.16)' : 'rgba(241,238,231,.12)';
  const fold = color === 'hueso' ? 'rgba(14,14,14,.07)' : 'rgba(241,238,231,.06)';
  const art = TEE_ART[back ? p.art.back : p.art.front];
  const kid = p.aud === 'niños';
  const g = kid ? 'transform="translate(200 270) scale(.86) translate(-200 -270)"' : '';
  let [fx, fy] = art.f;
  if (kid) { fx = 200 + (fx - 200) * .86; fy = 270 + (fy - 270) * .86; }
  const svg = `<g ${g}>
    <path d="${body}" fill="${fab}" stroke="rgba(241,238,231,.1)" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="${body}" fill="url(#${sid})"/>
    <path d="${back ? 'M157 92 Q200 108 243 92' : 'M157 92 Q200 134 243 92'}" fill="none" stroke="${line}" stroke-width="6"/>
    <g fill="none" stroke="${line}" stroke-width="1.2">
      <path d="M102 110 Q110 150 114 188"/><path d="M298 110 Q290 150 286 188"/>
      <path d="M49 170 L86 205"/><path d="M351 170 L314 205"/>
      <path d="M114 416 Q200 424 286 416"/>
    </g>
    <g fill="none" stroke="${fold}" stroke-width="3" stroke-linecap="round">
      <path d="M150 262 Q160 336 146 408"/><path d="M254 236 Q244 322 258 410"/><path d="M118 204 Q140 220 150 256"/>
    </g>
    ${art.draw(ink, p)}
  </g>`;
  return { svg, focus: [fx, fy], shadow: kid ? 112 : 130 };
}

function tumblerShape(p, color, view, sid) {
  const fab = COLORS[color].fabric;
  const ink = inkFor(color);
  const body = 'M136 118 L264 118 L246 420 Q200 428 154 420 Z';
  const svg = `
    <rect x="212" y="26" width="10" height="84" rx="3" fill="#6F6B64" transform="rotate(8 217 70)"/>
    <path d="${body}" fill="${fab}" stroke="rgba(241,238,231,.1)" stroke-width="1.2"/>
    <path d="${body}" fill="url(#${sid})"/>
    <rect x="128" y="90" width="144" height="26" rx="7" fill="${color === 'hueso' ? '#E3DFD6' : '#2B2927'}" stroke="rgba(241,238,231,.12)"/>
    <rect x="136" y="114" width="128" height="6" fill="rgba(0,0,0,.18)"/>
    ${iconMark(198, 262, 20, ink)}`;
  return { svg, focus: [200, 255], shadow: 92 };
}

function glassShape(p, color, view, sid) {
  const body = 'M140 122 L260 122 L248 420 Q200 428 152 420 Z';
  const svg = `
    <rect x="207" y="22" width="10" height="390" rx="4" fill="#9A958C" opacity=".85"/>
    <path d="${body}" fill="rgba(241,238,231,.10)" stroke="rgba(241,238,231,.38)" stroke-width="1.6"/>
    <path d="M152 140 L162 400" stroke="rgba(241,238,231,.22)" stroke-width="5" stroke-linecap="round"/>
    <rect x="207" y="122" width="10" height="290" fill="#23211F" opacity=".35"/>
    <rect x="134" y="100" width="132" height="24" rx="5" fill="#6F6B64"/>
    ${logoMark(200, 278, 30, '#F1EEE7')}`;
  return { svg, focus: [200, 268], shadow: 86 };
}

function bottleShape(p, color, view, sid) {
  const fab = COLORS[color].fabric;
  const ink = inkFor(color);
  const body = 'M140 168 Q140 128 180 128 L220 128 Q260 128 260 168 L260 410 Q260 432 238 432 L162 432 Q140 432 140 410 Z';
  const cap = color === 'piedra' ? '#23211F' : '#2B2927';
  const svg = `
    <ellipse cx="200" cy="56" rx="22" ry="16" fill="none" stroke="${cap}" stroke-width="8"/>
    <rect x="160" y="64" width="80" height="50" rx="9" fill="${cap}" stroke="rgba(241,238,231,.12)"/>
    <rect x="168" y="112" width="64" height="20" fill="${color === 'piedra' ? '#5E5A54' : '#141312'}"/>
    <path d="${body}" fill="${fab}" stroke="rgba(241,238,231,.1)" stroke-width="1.2"/>
    <path d="${body}" fill="url(#${sid})"/>
    ${iconMark(198, 194, 10, ink)}
    ${logoMark(200, 248, 26, ink)}`;
  return { svg, focus: [200, 222], shadow: 88 };
}

function mugShape(p, color, view, sid) {
  const fab = COLORS[color].fabric;
  const ink = inkFor(color);
  const body = 'M108 168 L282 168 L282 378 Q282 396 264 396 L126 396 Q108 396 108 378 Z';
  const svg = `
    <path d="M280 214 C346 214 346 340 280 340" fill="none" stroke="${fab}" stroke-width="24"/>
    <path d="M280 214 C346 214 346 340 280 340" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="24"/>
    <path d="${body}" fill="${fab}" stroke="rgba(241,238,231,.1)" stroke-width="1.2"/>
    <path d="${body}" fill="url(#${sid})"/>
    <ellipse cx="195" cy="168" rx="87" ry="11" fill="#2A2826"/>
    ${displayText(186, 296, 30, ink, 'algo viene')}
    <circle cx="263" cy="294" r="2.6" fill="${ink}"/><circle cx="272" cy="290" r="3.4" fill="${ink}"/><circle cx="283" cy="285" r="4.4" fill="${NARANJA}"/>`;
  return { svg, focus: [200, 282], shadow: 112 };
}

const SHAPES = { tee: teeShape, tumbler: tumblerShape, glass: glassShape, bottle: bottleShape, mug: mugShape };

function productSVG(p, color, view = 'front', cls = '') {
  const sid = 'sh' + (++uid);
  const { svg, focus, shadow } = SHAPES[p.type](p, color, view, sid);
  let vb = '0 0 400 500';
  if (view === 'detail') {
    const w = p.type === 'tee' ? 176 : 150, h = w * 1.25;
    vb = `${focus[0] - w / 2} ${focus[1] - h / 2} ${w} ${h}`;
  }
  const label = `${p.name}, ${COLORS[color].label}${view === 'back' ? ', espalda' : view === 'detail' ? ', detalle del estampado' : ''}`;
  return `<svg class="${cls}" viewBox="${vb}" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="${sid}" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity=".07"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/>
    </linearGradient></defs>
    <ellipse cx="200" cy="452" rx="${shadow}" ry="11" fill="#000" opacity=".38"/>
    ${svg}
  </svg>`;
}

// usa la foto propia si existe; si no, el SVG
function productVisual(p, color, view = 'front', cls = '') {
  const src = p.img && (typeof p.img === 'string' ? p.img : p.img[color]);
  if (src && view === 'front') {
    return `<img class="${cls}" src="${esc(src)}" alt="${esc(p.name + ', ' + COLORS[color].label)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`;
  }
  return productSVG(p, color, view, cls);
}

/* ---------- botones de opción ---------- */
function renderOpts(container, values, current, { swatch = false, onPick }) {
  container.innerHTML = values.map((v) => {
    const label = swatch ? COLORS[v].label : v;
    const sw = swatch ? `<span class="sw" style="background:${COLORS[v].swatch}"></span>` : '';
    return `<button type="button" class="opt" data-v="${esc(v)}" aria-pressed="${v === current}">${sw}${esc(label)}</button>`;
  }).join('');
  container.onclick = (e) => {
    const b = e.target.closest('.opt');
    if (!b) return;
    container.querySelectorAll('.opt').forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    onPick(b.dataset.v);
  };
}

/* ==========================================================
   Portada
   ========================================================== */
const hero = { p: byId('cam-noche'), color: 'negro', size: 'M', view: 'front' };
const VIEWS = [['front', 'frente'], ['back', 'espalda'], ['detail', 'detalle']];

function renderHeroStage() {
  $('#heroStage').innerHTML = productVisual(hero.p, hero.color, hero.view, 'stage-svg');
}
function renderHeroThumbs() {
  $('#heroThumbs').innerHTML = VIEWS.map(([v, label]) =>
    `<button type="button" class="thumb" data-view="${v}" aria-pressed="${v === hero.view}" aria-label="ver ${label}">${productSVG(hero.p, hero.color, v)}</button>`
  ).join('');
}
function initHero() {
  $('#heroPrice').textContent = money(hero.p.price);
  $('#heroChipPrice').textContent = money(hero.p.price);
  renderOpts($('#heroSizes'), hero.p.sizes, hero.size, { onPick: (v) => { hero.size = v; } });
  renderOpts($('#heroColors'), hero.p.colors, hero.color, {
    swatch: true,
    onPick: (v) => { hero.color = v; renderHeroStage(); renderHeroThumbs(); },
  });
  renderHeroStage();
  renderHeroThumbs();
  $('#heroThumbs').addEventListener('click', (e) => {
    const t = e.target.closest('.thumb');
    if (!t) return;
    hero.view = t.dataset.view;
    const i = VIEWS.findIndex(([v]) => v === hero.view);
    $('#heroIdx').textContent = String(i + 1).padStart(2, '0');
    $('#heroBar').style.width = `${((i + 1) / VIEWS.length) * 100}%`;
    $('#heroThumbs').querySelectorAll('.thumb').forEach((b) => b.setAttribute('aria-pressed', String(b === t)));
    renderHeroStage();
  });
  $('#heroBuy').addEventListener('click', () => addToBag(hero.p.id, hero.color, hero.size, 1));
}

/* ==========================================================
   Catálogo: filtros + búsqueda
   ========================================================== */
let filter = 'todo';
let query = '';

function matchesFilter(p, f) {
  if (f === 'todo') return true;
  if (f === 'vasos') return ['vasos', 'termos'].includes(p.cat);
  return p.cat === f || p.aud === f;
}
function matchesQuery(p, q) {
  if (!q) return true;
  const hay = norm([p.name, p.desc, p.line, p.cat, p.aud, p.cat === 'vasos' || p.cat === 'termos' ? 'vasos y termos tazas' : ''].join(' '));
  return norm(q).split(/\s+/).every((w) => hay.includes(w));
}

function renderFilters() {
  $('#filters').innerHTML = FILTERS.map(({ key, label }) => {
    const n = PRODUCTS.filter((p) => matchesFilter(p, key)).length;
    return `<button type="button" class="opt" data-f="${esc(key)}" aria-pressed="${key === filter}">${esc(label)}<span class="n">${n}</span></button>`;
  }).join('');
}

function cardHTML(p) {
  const color = p.colors[0];
  const badge = p.badge ? `<span class="badge mono">${esc(p.badge)}</span>` : '';
  const sw = p.colors.map((c) => `<i style="background:${COLORS[c].swatch}" title="${COLORS[c].label}"></i>`).join('');
  return `<article class="card">
    <button type="button" class="card-img" data-id="${p.id}" aria-label="ver ${esc(p.name)}">
      ${productVisual(p, color)}
      ${badge}
      <span class="see" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
    </button>
    <div class="card-meta">
      <h3>${esc(p.name)}</h3>
      <span class="line mono">${esc(p.line)}</span>
      <div class="card-row"><span class="swatches" aria-label="colores: ${p.colors.map((c) => COLORS[c].label).join(', ')}">${sw}</span><span class="price">${money(p.price)}</span></div>
    </div>
  </article>`;
}

function renderGrid() {
  const grid = $('#grid');
  grid.querySelectorAll('.card, .empty').forEach((n) => n.remove());
  const list = PRODUCTS.filter((p) => matchesFilter(p, filter) && matchesQuery(p, query));
  $('#drop').hidden = filter !== 'todo' || !!query;
  grid.insertAdjacentHTML('beforeend', list.length
    ? list.map(cardHTML).join('')
    : '<p class="empty mono">nada por aquí··· todavía</p>');
  $('#catCount').textContent = `${list.length} ${list.length === 1 ? 'producto' : 'productos'}`;
}

function setFilter(f) {
  filter = f;
  $('#filters').querySelectorAll('.opt').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.f === f)));
  renderGrid();
}

function initCatalog() {
  renderFilters();
  renderGrid();
  $('#filters').addEventListener('click', (e) => {
    const b = e.target.closest('.opt');
    if (b) setFilter(b.dataset.f);
  });
  $('#grid').addEventListener('click', (e) => {
    const b = e.target.closest('.card-img');
    if (b) openSheet(b.dataset.id);
  });
  // los enlaces del nav también filtran
  document.querySelectorAll('.nav-links [data-filter]').forEach((a) =>
    a.addEventListener('click', () => setFilter(a.dataset.filter)));
}

function initSearch() {
  const btn = $('#searchBtn'), box = $('#search'), input = $('#searchInput');
  btn.addEventListener('click', () => {
    const open = !box.classList.contains('open');
    box.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    input.tabIndex = open ? 0 : -1;
    if (open) input.focus();
  });
  input.addEventListener('input', () => {
    query = input.value.trim();
    renderGrid();
    const top = $('#catalogo').getBoundingClientRect().top;
    if (top > window.innerHeight * .5 || top < -$('#catalogo').offsetHeight + 200) {
      $('#catalogo').scrollIntoView({ behavior: 'smooth' });
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { input.value = ''; query = ''; renderGrid(); btn.click(); btn.focus(); }
  });
}

/* ==========================================================
   Ficha de producto
   ========================================================== */
const sheet = { p: null, color: null, size: null, qty: 1 };

function renderSheetImg() {
  $('#sheetImg').innerHTML = productVisual(sheet.p, sheet.color);
}

function openSheet(id) {
  const p = byId(id);
  if (!p) return;
  Object.assign(sheet, { p, color: p.colors[0], size: p.sizes.length ? (p.sizes.includes('M') ? 'M' : p.sizes[0]) : null, qty: 1 });
  $('#sheetLine').textContent = p.line;
  $('#sheetTitle').textContent = p.name;
  $('#sheetDesc').textContent = p.desc;
  $('#sheetPrice').textContent = money(p.price);
  $('#qtyOut').textContent = '1';
  renderSheetImg();
  renderOpts($('#sheetColors'), p.colors, sheet.color, { swatch: true, onPick: (v) => { sheet.color = v; renderSheetImg(); } });
  const hasSizes = p.sizes.length > 0;
  $('#sheetSizesLabel').hidden = !hasSizes;
  $('#sheetSizes').hidden = !hasSizes;
  if (hasSizes) renderOpts($('#sheetSizes'), p.sizes, sheet.size, { onPick: (v) => { sheet.size = v; } });
  $('#sheet').showModal();
}

function initSheet() {
  const dlg = $('#sheet');
  $('#sheetClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); }); // clic afuera
  const setQty = (n) => { sheet.qty = Math.max(1, Math.min(20, n)); $('#qtyOut').textContent = sheet.qty; };
  $('#qtyMinus').addEventListener('click', () => setQty(sheet.qty - 1));
  $('#qtyPlus').addEventListener('click', () => setQty(sheet.qty + 1));
  $('#sheetAdd').addEventListener('click', () => {
    addToBag(sheet.p.id, sheet.color, sheet.size, sheet.qty);
    dlg.close();
  });
  $('#sheetOrder').addEventListener('click', () => {
    openWhatsApp(orderMessage([{ id: sheet.p.id, color: sheet.color, size: sheet.size, qty: sheet.qty }]));
  });
}

/* ==========================================================
   Bolsa
   ========================================================== */
let bag = loadBag();

function loadBag() {
  try {
    const data = JSON.parse(localStorage.getItem(BAG_KEY) || '[]');
    return Array.isArray(data) ? data.filter((it) => byId(it.id) && it.qty > 0) : [];
  } catch { return []; }
}
function saveBag() {
  try { localStorage.setItem(BAG_KEY, JSON.stringify(bag)); } catch { /* sin almacenamiento: la bolsa vive solo en esta visita */ }
}

function addToBag(id, color, size, qty) {
  const found = bag.find((it) => it.id === id && it.color === color && it.size === size);
  if (found) found.qty += qty;
  else bag.push({ id, color, size, qty });
  saveBag();
  renderBag();
  toast('añadido a la bolsa···');
}

function itemLine(it, i) {
  const p = byId(it.id);
  const size = it.size ? `, talla ${it.size}` : '';
  return `${i + 1}. ${p.name} — ${COLORS[it.color].label}${size} × ${it.qty} — ${money(p.price * it.qty)}`;
}
const totalOf = (items) => items.reduce((s, it) => s + byId(it.id).price * it.qty, 0);

function orderMessage(items) {
  return [
    'hola zemar··· quiero hacer este pedido:',
    ...items.map(itemLine),
    `total: ${money(totalOf(items))}`,
    'mi nombre: ',
    'ciudad: ',
  ].join('\n');
}

function renderBag() {
  const count = bag.reduce((s, it) => s + it.qty, 0);
  $('#bagCount').textContent = count;
  $('#bagBtn').setAttribute('aria-label', `abrir bolsa, ${count} ${count === 1 ? 'producto' : 'productos'}`);
  $('#bagTotal').textContent = money(totalOf(bag));
  $('#bagOrder').disabled = bag.length === 0;
  $('#bagOrder').style.opacity = bag.length ? '' : '.4';
  $('#bagList').innerHTML = bag.length
    ? bag.map((it, i) => {
      const p = byId(it.id);
      return `<li class="bag-item">
        <div class="mini">${productVisual(p, it.color)}</div>
        <div><h4>${esc(p.name)}</h4><span class="mono">${COLORS[it.color].label}${it.size ? ' · talla ' + it.size : ''} · × ${it.qty}</span></div>
        <div class="right"><span class="price" style="font-size:var(--t-sm)">${money(p.price * it.qty)}</span><button type="button" class="link-btn mono" data-i="${i}" aria-label="quitar ${esc(p.name)}">quitar</button></div>
      </li>`;
    }).join('')
    : '<li class="bag-empty"><span>tu bolsa está vacía··· todavía.</span><a class="btn ghost" href="#catalogo" data-close-bag>ver catálogo</a></li>';
}

function setBagOpen(open) {
  const el = $('#bag');
  el.classList.toggle('open', open);
  $('#bagShade').classList.toggle('open', open);
  el.setAttribute('aria-hidden', String(!open));
  el.inert = !open;
  if (open) $('#bagClose').focus();
  else $('#bagBtn').focus();
}

function initBag() {
  renderBag();
  $('#bagBtn').addEventListener('click', () => setBagOpen(true));
  $('#bagClose').addEventListener('click', () => setBagOpen(false));
  $('#bagShade').addEventListener('click', () => setBagOpen(false));
  $('#bagList').addEventListener('click', (e) => {
    const rm = e.target.closest('[data-i]');
    if (rm) { bag.splice(Number(rm.dataset.i), 1); saveBag(); renderBag(); }
    if (e.target.closest('[data-close-bag]')) setBagOpen(false);
  });
  $('#bagOrder').addEventListener('click', () => { if (bag.length) openWhatsApp(orderMessage(bag)); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $('#bag').classList.contains('open')) setBagOpen(false);
  });
}

/* ==========================================================
   Lista de espera
   Todo el envío pasa por submitWaitlist(); para cambiar a
   Formspree o Google Forms, basta con reemplazar esta función.
   ========================================================== */
function submitWaitlist({ nombre, whatsapp, interes }) {
  const msg = `hola zemar, quiero estar en la lista de espera del drop 01. soy ${nombre} (whatsapp ${whatsapp}), me interesa ${interes}.`;
  openWhatsApp(msg);
}

function initWaitlist() {
  const form = $('#waitForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const bad = [...form.querySelectorAll('[required]')].find((f) => !String(f.value).trim());
    if (bad) {
      bad.setAttribute('aria-invalid', 'true');
      bad.focus();
      toast('falta tu ' + (bad.name === 'nombre' ? 'nombre' : 'whatsapp') + '···');
      return;
    }
    form.querySelectorAll('[aria-invalid]').forEach((f) => f.removeAttribute('aria-invalid'));
    submitWaitlist({ nombre: data.nombre.trim(), whatsapp: data.whatsapp.trim(), interes: data.interes });
  });
}

/* ---------- aviso ---------- */
let toastTimer;
function toast(text) {
  const t = $('#toast');
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- arranque ---------- */
initHero();
initCatalog();
initSearch();
initSheet();
initBag();
initWaitlist();
