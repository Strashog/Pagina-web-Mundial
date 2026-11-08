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
  blanco:       { label: 'blanco',       fabric: '#FFFFFF', swatch: '#FFFFFF' },
  gris:         { label: 'gris',         fabric: '#3A383A', swatch: '#3A383A' },
  cafe:         { label: 'café',         fabric: '#4A3326', swatch: '#4A3326' },
  azul:         { label: 'azul rey',     fabric: '#1F4689', swatch: '#1F4689' },
  vinotinto:    { label: 'vinotinto',    fabric: '#601927', swatch: '#601927' },
  rosado:       { label: 'rosado',       fabric: '#E9B4C3', swatch: '#E9B4C3' },
  transparente: { label: 'transparente', fabric: 'rgba(241,238,231,.10)', swatch: 'transparent' },
};

const TEE_SIZES = ['S', 'M', 'L', 'XL'];  // hombre
const DAMA_SIZES = ['S', 'M', 'XL'];      // mujer (confirmar si hay L)

// foto de producto: un mockup por color, espalda a la izquierda y frente a la derecha.
const IMG = (id, color) => `assets/productos/${id}-${color}.webp`;

/* side = dónde está el estampado ('back' en hombre, 'front' en mujer); es la vista principal.
   focus = centro del estampado (fracción de la imagen), para la vista detalle.
   Precios: hombre $44.900 (confirmado). mujer $44.900 = DE EJEMPLO, el usuario lo confirma.
   Vasos, termo y taza: fuera de la página con activo: false (nombres y precios de ejemplo). */
const PRODUCTS = [
  // ---------- hombre: la protagonista y las nuevas ----------
  { id: 'cam-condor-andes', name: 'camiseta cóndor de los andes', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.30, .29], zoom: 3.5,
    line: 'oversize · pecho y espalda', desc: 'un cóndor sobre la montaña con zemar en letra cursiva. firma pequeña en el pecho.',
    price: 44900, colors: ['blanco'], sizes: TEE_SIZES, photo: true, badge: 'más vendida' },
  { id: 'cam-algo-viene', name: 'camiseta algo viene', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.30, .27], zoom: 3,
    line: 'oversize · espalda', desc: 'zemar en cursiva que cruza toda la espalda, con algo viene debajo. frente liso.',
    price: 44900, colors: ['negro', 'azul', 'vinotinto'], sizes: TEE_SIZES, photo: true, badge: 'nuevo' },
  { id: 'cam-virgen', name: 'camiseta virgen', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.30, .33], zoom: 3.1,
    line: 'oversize · espalda', desc: 'virgen con los ojos vendados y rosario entre las manos, bajo zemar. frente liso.',
    price: 44900, colors: ['negro', 'gris'], sizes: TEE_SIZES, photo: true, badge: 'nuevo' },
  { id: 'cam-ventana', name: 'camiseta ventana', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.30, .30],
    line: 'oversize · pecho y espalda', desc: 'flores amarillas que bajan por la espalda. al frente, zemar sobre una ventana abierta a las montañas.',
    price: 44900, colors: ['cafe', 'negro'], sizes: TEE_SIZES, photo: true, badge: 'nuevo' },
  { id: 'cam-midnight', name: 'camiseta midnight', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.30, .33], zoom: 3.1,
    line: 'oversize · espalda', desc: 'un dóberman saliendo de la sombra con midnight en letra fina. frente liso.',
    price: 44900, colors: ['negro'], sizes: TEE_SIZES, photo: true, badge: 'nuevo' },

  // ---------- mujer: ajustada, estampado al frente ----------
  { id: 'muj-zemar-halo', name: 'camiseta zemar halo', cat: 'camisetas', aud: 'mujer', type: 'tee', side: 'front', focus: [.71, .25],
    line: 'ajustada · frente', desc: 'zemar en glitter rosa con un halo encima.',
    price: 44900, colors: ['rosado', 'blanco', 'negro'], sizes: DAMA_SIZES, photo: true, badge: 'nuevo' },
  { id: 'muj-zemar-glitter', name: 'camiseta zemar glitter', cat: 'camisetas', aud: 'mujer', type: 'tee', side: 'front', focus: [.71, .25],
    line: 'ajustada · frente', desc: 'zemar tipo sticker en glitter morado y negro, con brillos alrededor.',
    price: 44900, colors: ['negro', 'blanco', 'rosado'], sizes: DAMA_SIZES, photo: true },
  { id: 'muj-cherries', name: 'camiseta cherries', cat: 'camisetas', aud: 'mujer', type: 'tee', side: 'front', focus: [.71, .27],
    line: 'ajustada · frente', desc: 'dos cerezas brillantes bajo cherries en letra de colegio.',
    price: 44900, colors: ['rosado', 'blanco'], sizes: DAMA_SIZES, photo: true },
  { id: 'muj-do-all-things', name: 'camiseta do all things with love', cat: 'camisetas', aud: 'mujer', type: 'tee', side: 'front', focus: [.71, .27],
    line: 'ajustada · frente', desc: 'do all things with love en letras rosadas infladas.',
    price: 44900, colors: ['blanco', 'rosado', 'negro'], sizes: DAMA_SIZES, photo: true },
  { id: 'muj-superstar', name: 'camiseta superstar', cat: 'camisetas', aud: 'mujer', type: 'tee', side: 'front', focus: [.71, .27],
    line: 'ajustada · frente', desc: 'estrella rosada con superstar arriba y just enjoy abajo.',
    price: 44900, colors: ['blanco', 'negro'], sizes: DAMA_SIZES, photo: true },
  { id: 'muj-self-love', name: 'camiseta self love', cat: 'camisetas', aud: 'mujer', type: 'tee', side: 'front', focus: [.71, .27],
    line: 'ajustada · frente', desc: 'self love en blanco con un lirio rosado encima.',
    price: 44900, colors: ['negro'], sizes: DAMA_SIZES, photo: true },
  { id: 'muj-giunic', name: 'camiseta giunic nails', cat: 'camisetas', aud: 'mujer', type: 'tee', side: 'front', focus: [.71, .27],
    line: 'ajustada · frente', desc: 'estrella de leopardo con labios rojos y giunic nails en letras infladas.',
    price: 44900, colors: ['negro', 'blanco', 'rosado'], sizes: DAMA_SIZES, photo: true },

  // ---------- hombre: las demás ----------
  { id: 'cam-mascara', name: 'camiseta máscara de oro', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.30, .33],
    line: 'oversize · espalda', desc: 'máscara de oro precolombina envuelta en espinas, con zemar arriba. frente liso.',
    price: 44900, colors: ['negro'], sizes: TEE_SIZES, photo: true },
  { id: 'cam-jaguar', name: 'camiseta jaguar', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.30, .27],
    line: 'oversize · espalda', desc: 'un jaguar descansando sobre zemar. frente liso.',
    price: 44900, colors: ['negro'], sizes: TEE_SIZES, photo: true },
  { id: 'cam-condor-hueso', name: 'camiseta cóndor de hueso', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.31, .28], zoom: 3.1,
    line: 'oversize · espalda', desc: 'un cóndor mitad plumas, mitad hueso, cruzando zemar en dorado. frente liso.',
    price: 44900, colors: ['negro'], sizes: TEE_SIZES, photo: true },
  { id: 'cam-goat', name: 'camiseta goat', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.31, .32],
    line: 'oversize · espalda', desc: 'cabra de pelo largo con goat en letras de pelo. frente liso.',
    price: 44900, colors: ['negro'], sizes: TEE_SIZES, photo: true },
  { id: 'cam-world-tour', name: 'camiseta world tour', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.29, .33],
    line: 'oversize · espalda', desc: 'mano de esqueleto dorada llena de anillos de campeón. frente liso.',
    price: 44900, colors: ['negro'], sizes: TEE_SIZES, photo: true },
  { id: 'cam-bulldogs', name: 'camiseta bulldogs', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.30, .30],
    line: 'oversize · pecho y espalda', desc: 'tres bulldogs franceses con cadenas frente a zemar. logo pequeño en el pecho.',
    price: 44900, colors: ['blanco'], sizes: TEE_SIZES, photo: true },
  { id: 'cam-cruces', name: 'camiseta cruces', cat: 'camisetas', aud: 'hombre', type: 'tee', side: 'back', focus: [.30, .27],
    line: 'oversize · pecho y espalda', desc: 'cinco cruces de colores, una con zemar. versión mini en el pecho.',
    price: 44900, colors: ['blanco'], sizes: TEE_SIZES, photo: true },

  // ---------- ocultos ----------
  { id: 'vaso-20', activo: false, name: 'vaso térmico 20 oz', cat: 'vasos', aud: 'todos', type: 'tumbler',
    line: 'acero · 20 oz', desc: 'mantiene frío o caliente por horas. tapa con pitillo.',
    price: 54900, colors: ['negro', 'hueso'], sizes: [], print: 'ícono (uv o láser)' },
  { id: 'vaso-vidrio', activo: false, name: 'vaso de vidrio 16 oz', cat: 'vasos', aud: 'todos', type: 'glass',
    line: 'vidrio · 16 oz', desc: 'vidrio con tapa y pitillo. logo en hueso.',
    price: 29900, colors: ['transparente'], sizes: [], print: 'logo en hueso' },
  { id: 'termo-500', activo: false, name: 'termo nocturno 500 ml', cat: 'termos', aud: 'todos', type: 'bottle',
    line: 'acero · 500 ml', desc: 'termo de doble pared con aro para llevar. logo en el tercio superior.',
    price: 69900, colors: ['negro', 'piedra'], sizes: [], print: 'logo vertical en el tercio superior' },
  { id: 'taza-11', activo: false, name: 'taza algo viene 11 oz', cat: 'vasos', aud: 'todos', type: 'mug',
    line: 'cerámica · 11 oz', desc: 'para el café de la espera. "algo viene." en sublimación.',
    price: 34900, colors: ['hueso'], sizes: [], print: '"algo viene." (sublimación)' },
];

// lo único que se muestra: grilla, filtros, búsqueda y contadores usan esto
const CATALOG = PRODUCTS.filter((p) => p.activo !== false);

const COLOR_FILTER = ['gris', 'cafe', 'azul', 'vinotinto', 'rosado'];
const FILTERS = [
  { key: 'todo', label: 'todo', test: () => true },
  { key: 'hombre', label: 'hombre', test: (p) => p.aud === 'hombre' },
  { key: 'mujer', label: 'mujer', test: (p) => p.aud === 'mujer' },
  { key: 'negras', label: 'negras', test: (p) => p.colors.includes('negro') },
  { key: 'blancas', label: 'blancas', test: (p) => p.colors.includes('blanco') },
  { key: 'color', label: 'de color', test: (p) => p.colors.some((c) => COLOR_FILTER.includes(c)) },
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

/* ---------- fotos de producto ----------
   el mockup trae la espalda (izquierda) y el frente (derecha); cada vista
   es un recorte con background-size/position, sin archivos extra. */
const PHOTO_RATIO = 2000 / 1611; // alto / ancho del mockup
const PHOTO_VIEW = {
  back:   { c: () => [.295, .34], z: 2.3 },
  front:  { c: () => [.72, .34], z: 2.3 },
  detail: { c: (p) => p.focus, z: 4.2 },
};
const clamp01 = (n) => Math.min(1, Math.max(0, n));
const VIEW_LABEL = { back: 'espalda', front: 'frente', detail: 'detalle del estampado' };

// a = alto / ancho de la caja donde va la foto
function photoDiv(p, color, view, cls = '', a = 1.25, decorative = false, tune = {}) {
  const { c, z: baseZ } = PHOTO_VIEW[view];
  const z = tune.z || (view === 'detail' && p.zoom) || baseZ; // zoom: para estampados anchos
  const [cx, baseCy] = c(p);
  const cy = tune.cy || baseCy;
  const px = clamp01((cx * z - .5) / (z - 1));
  const py = clamp01((cy * z * PHOTO_RATIO - a / 2) / (z * PHOTO_RATIO - a));
  const label = `${p.name}, ${COLORS[color].label}, ${VIEW_LABEL[view]}`;
  const aria = decorative ? 'aria-hidden="true"' : `role="img" aria-label="${esc(label)}"`;
  const style = `background-image:url('${esc(IMG(p.id, color))}');background-size:${z * 100}% auto;background-position:${(px * 100).toFixed(2)}% ${(py * 100).toFixed(2)}%`;
  return `<span class="ph ${cls}" ${aria} style="${style}"></span>`;
}

const mainView = (p) => p.side || 'front';
const viewsOf = (p) => (p.side === 'back'
  ? [['back', 'espalda'], ['front', 'frente'], ['detail', 'detalle']]
  : [['front', 'frente'], ['back', 'espalda'], ['detail', 'detalle']]);

// usa la foto propia si existe; si no, el SVG
function productVisual(p, color, view = mainView(p), cls = '', a = 1.25) {
  if (p.photo) return photoDiv(p, color, view, cls, a);
  return productSVG(p, color, view, cls);
}

/* ---------- hotspots sobre la foto (espalda) ----------
   x, y en % de la caja de la foto; left = la burbuja abre hacia la izquierda */
const hotspotsOf = (p) => [
  { x: 50, y: 36, text: 'estampado DTF · no se cuartea' },
  { x: 25, y: 30, text: 'algodón y poliéster · suave y resistente' },
  p.aud === 'mujer'
    ? { x: 72, y: 62, text: 'corte ajustado · para ella', left: true }
    : { x: 76, y: 62, text: 'corte oversize · pide tu talla normal', left: true },
];
const PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

function hotspotsHTML(prefix, p) {
  return hotspotsOf(p).map((h, i) => `<div class="hs${h.left ? ' left' : ''}" style="left:${h.x}%;top:${h.y}%">
      <button type="button" class="hotspot" aria-expanded="false" aria-controls="${prefix}-${i}" aria-label="${esc(h.text)}">${PLUS}</button>
      <span class="hs-bubble glass" id="${prefix}-${i}">${esc(h.text)}</span>
    </div>`).join('');
}

function closeHotspots(except) {
  document.querySelectorAll('.hotspot[aria-expanded="true"]').forEach((b) => {
    if (b !== except) b.setAttribute('aria-expanded', 'false');
  });
}

function initHotspots() {
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.hotspot');
    closeHotspots(b);
    if (b) b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true'));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('.hotspot[aria-expanded="true"]');
    if (open) { open.setAttribute('aria-expanded', 'false'); open.focus(); }
  });
}

/* ---------- botones de opción ---------- */
function renderOpts(container, values, current, { swatch = false, onPick }) {
  container.innerHTML = values.map((v) => {
    if (swatch) {
      return `<button type="button" class="opt swatch" data-v="${esc(v)}" aria-pressed="${v === current}"><span class="sw" style="background:${COLORS[v].swatch}"></span><span class="sw-name mono">${esc(COLORS[v].label)}</span></button>`;
    }
    return `<button type="button" class="opt" data-v="${esc(v)}" aria-pressed="${v === current}">${esc(v)}</button>`;
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
const hero = { p: byId('cam-condor-andes'), color: 'blanco', size: 'M' };
hero.view = mainView(hero.p);
const VIEWS = viewsOf(hero.p);

const pad2 = (n) => String(n).padStart(2, '0');

function renderHeroStage() {
  // en la portada la camiseta va más cerca: la cabeza del maniquí no tapa la palabra gigante
  $('#heroStage').innerHTML = hero.p.photo && hero.view !== 'detail'
    ? photoDiv(hero.p, hero.color, hero.view, 'stage-svg', 1.25, false, { z: 2.4, cy: .365 })
    : productVisual(hero.p, hero.color, hero.view, 'stage-svg');
  // los hotspots están ubicados sobre la vista principal de la foto
  $('#heroStageWrap').classList.toggle('no-hs', !(hero.p.photo && hero.view === mainView(hero.p)));
}
function renderHeroThumbs() {
  $('#heroThumbs').innerHTML = VIEWS.map(([v, label]) =>
    `<button type="button" class="thumb" data-view="${v}" aria-pressed="${v === hero.view}" aria-label="ver ${label}">${productVisual(hero.p, hero.color, v, '', 4 / 3)}</button>`
  ).join('');
}
function renderHeroCapsule() {
  $('#heroCapsule').innerHTML = VIEWS.map(([v, label], i) =>
    `<button type="button" data-view="${v}" aria-pressed="${v === hero.view}" aria-label="ver ${label}">${pad2(i + 1)}</button>`
  ).join('');
}

// miniaturas, cápsula 01/02/03 y flechas ‹ › cambian la vista por aquí
function setHeroView(view) {
  hero.view = view;
  const i = VIEWS.findIndex(([v]) => v === view);
  $('#heroIdx').textContent = pad2(i + 1);
  $('#heroBar').style.width = `${((i + 1) / VIEWS.length) * 100}%`;
  document.querySelectorAll('#heroThumbs [data-view], #heroCapsule [data-view]').forEach((b) =>
    b.setAttribute('aria-pressed', String(b.dataset.view === view)));
  renderHeroStage();
}
function stepHeroView(dir) {
  const i = VIEWS.findIndex(([v]) => v === hero.view);
  setHeroView(VIEWS[(i + dir + VIEWS.length) % VIEWS.length][0]);
}

function askTalla() {
  openWhatsApp(`hola zemar, tengo una duda con la talla de la ${hero.p.name}`);
}

function initHero() {
  $('.stage-label .mono').textContent = hero.p.name;
  $('#heroBuy').setAttribute('aria-label', `añadir ${hero.p.name} a la bolsa, ${money(hero.p.price)}`);
  $('#heroPrice').textContent = money(hero.p.price);
  $('#heroChipPrice').textContent = money(hero.p.price);
  $('#statTees').textContent = CATALOG.length;
  $('#statPrice').textContent = money(hero.p.price);
  $('#heroHotspots').innerHTML = hotspotsHTML('hhs', hero.p);
  renderOpts($('#heroSizes'), hero.p.sizes, hero.size, { onPick: (v) => { hero.size = v; } });
  renderOpts($('#heroColors'), hero.p.colors, hero.color, {
    swatch: true,
    onPick: (v) => { hero.color = v; renderHeroStage(); renderHeroThumbs(); },
  });
  renderHeroStage();
  renderHeroThumbs();
  renderHeroCapsule();
  const pick = (e) => { const t = e.target.closest('[data-view]'); if (t) setHeroView(t.dataset.view); };
  $('#heroThumbs').addEventListener('click', pick);
  $('#heroCapsule').addEventListener('click', pick);
  $('#heroPrev').addEventListener('click', () => stepHeroView(-1));
  $('#heroNext').addEventListener('click', () => stepHeroView(1));
  $('#heroBuy').addEventListener('click', () => addToBag(hero.p.id, hero.color, hero.size, 1));
  document.querySelectorAll('[data-wa-talla]').forEach((b) => b.addEventListener('click', askTalla));
}

/* ==========================================================
   Catálogo: filtros + búsqueda
   ========================================================== */
let filter = 'todo';
let query = '';

function matchesFilter(p, f) {
  return FILTERS.find((x) => x.key === f).test(p);
}
function matchesQuery(p, q) {
  if (!q) return true;
  const hay = norm([p.name, p.desc, p.line, p.cat, p.aud, ...p.colors.map((c) => COLORS[c].label)].join(' '));
  return norm(q).split(/\s+/).every((w) => hay.includes(w));
}

function renderFilters() {
  $('#filters').innerHTML = FILTERS.map(({ key, label }) => {
    const n = CATALOG.filter((p) => matchesFilter(p, key)).length;
    if (!n && key !== 'todo') return ''; // sin productos no se muestra
    return `<button type="button" class="opt" data-f="${esc(key)}" aria-pressed="${key === filter}">${esc(label)}<span class="n">${n}</span></button>`;
  }).join('');
}

// al pasar el mouse la tarjeta alterna a la otra cara de la camiseta
const altPhoto = (p, color) => photoDiv(p, color, p.side === 'back' ? 'front' : 'back', 'alt', 1.25, true);

// un punto de color cambia la foto de esa tarjeta
function setCardColor(card, p, color) {
  card.dataset.color = color;
  const box = card.querySelector('.card-img');
  box.querySelectorAll('.ph').forEach((n) => n.remove());
  box.insertAdjacentHTML('afterbegin', productVisual(p, color) + altPhoto(p, color));
  card.querySelectorAll('.dot-c').forEach((d) => d.setAttribute('aria-pressed', String(d.dataset.color === color)));
}

function cardHTML(p) {
  const color = p.colors[0];
  const badge = p.badge ? `<span class="badge mono">${esc(p.badge)}</span>` : '';
  const sw = p.colors.map((c) => `<button type="button" class="dot-c" data-color="${c}" aria-pressed="${c === color}" aria-label="ver en ${COLORS[c].label}" title="${COLORS[c].label}"><i style="background:${COLORS[c].swatch}"></i></button>`).join('');
  return `<article class="card" data-color="${color}">
    <div class="card-media">
      <button type="button" class="card-img${p.photo ? ' has-photo' : ''}" data-id="${p.id}" aria-label="ver ${esc(p.name)}">
        ${productVisual(p, color)}
        ${p.photo ? altPhoto(p, color) : ''}
        ${badge}
      </button>
      <button type="button" class="icon-btn light quick-add" data-add="${p.id}" aria-label="añadir ${esc(p.name)} a la bolsa">${PLUS}</button>
    </div>
    <div class="card-meta">
      <h3>${esc(p.name)}</h3>
      <span class="line mono">${esc(p.line)}</span>
      <div class="card-row"><span class="swatches" role="group" aria-label="colores">${sw}</span><span class="price">${money(p.price)}</span></div>
    </div>
  </article>`;
}

function renderGrid() {
  const grid = $('#grid');
  grid.querySelectorAll('.card, .empty').forEach((n) => n.remove());
  const list = CATALOG.filter((p) => matchesFilter(p, filter) && matchesQuery(p, query));
  $('#drop').hidden = filter !== 'todo' || !!query;
  grid.insertAdjacentHTML('beforeend', list.length
    ? list.map(cardHTML).join('')
    : '<p class="empty mono">nada por aquí··· todavía</p>');
  $('#catCount').textContent = `${list.length} ${list.length === 1 ? 'diseño' : 'diseños'}`;
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
    const add = e.target.closest('.quick-add');
    const card = e.target.closest('.card');
    if (add) { e.stopPropagation(); quickAdd(add.dataset.add, card.dataset.color); return; }
    const dot = e.target.closest('.dot-c');
    if (dot) { openSheet(card.querySelector('.card-img').dataset.id, dot.dataset.color); return; }
    const b = e.target.closest('.card-img');
    if (b) openSheet(b.dataset.id, card.dataset.color);
  });
  const previewColor = (e) => {
    const dot = e.target.closest && e.target.closest('.dot-c');
    if (!dot) return;
    const card = dot.closest('.card');
    if (card.dataset.color !== dot.dataset.color) setCardColor(card, byId(card.querySelector('.card-img').dataset.id), dot.dataset.color);
  };
  $('#grid').addEventListener('mouseover', previewColor);
  $('#grid').addEventListener('focusin', previewColor);
  // los enlaces del nav y el botón del drop también filtran
  document.querySelectorAll('a[data-filter]').forEach((a) =>
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
const sheet = { p: null, color: null, size: null, qty: 1, view: null };
const defaultSize = (p) => (p.sizes.length ? (p.sizes.includes('M') ? 'M' : p.sizes[0]) : null);

/* guía de tallas en cm (ancho de pecho y largo). Pendiente del usuario:
   cuando estén las medidas, llenar así: { S: [52, 70], M: [55, 72], ... } */
const SIZE_GUIDE = null;

function renderSizeGuide() {
  const note = '<p>si dudas entre dos tallas, escríbenos y te ayudamos a elegir.</p>';
  $('#sizeGuideBody').innerHTML = SIZE_GUIDE
    ? `<table><thead><tr><th>talla</th><th>ancho</th><th>largo</th></tr></thead><tbody>${
      Object.entries(SIZE_GUIDE).map(([t, [a, l]]) => `<tr><td>${esc(t)}</td><td>${a} cm</td><td>${l} cm</td></tr>`).join('')
    }</tbody></table>${note}`
    : `<p>medidas por confirmar··· pronto aquí.</p>${note}`;
}

function renderSheetImg() {
  const el = $('#sheetImg'), p = sheet.p;
  el.classList.toggle('has-photo', !!p.photo);
  el.innerHTML = productVisual(p, sheet.color, sheet.view)
    + (p.photo && sheet.view === mainView(p) ? `<div class="hotspots">${hotspotsHTML('shs', p)}</div>` : '')
    + (p.photo ? `<div class="sheet-views">${viewsOf(p).map(([v, label]) =>
      `<button type="button" class="opt" data-view="${v}" aria-pressed="${v === sheet.view}">${label}</button>`).join('')}</div>` : '');
}

// el "+" de la tarjeta: talla M (o la primera) y el color que muestra la tarjeta
function quickAdd(id, color) {
  const p = byId(id);
  if (p) addToBag(p.id, color || p.colors[0], defaultSize(p), 1);
}

function openSheet(id, color) {
  const p = byId(id);
  if (!p) return;
  Object.assign(sheet, { p, color: color || p.colors[0], size: defaultSize(p), qty: 1, view: mainView(p) });
  $('#sheetLine').textContent = p.line;
  $('#sheetTitle').textContent = p.name;
  $('#sheetDesc').textContent = p.desc;
  $('#sheetPrice').textContent = money(p.price);
  $('#qtyOut').textContent = '1';
  renderSheetImg();
  renderOpts($('#sheetColors'), p.colors, sheet.color, { swatch: true, onPick: (v) => { sheet.color = v; renderSheetImg(); } });
  const hasSizes = p.sizes.length > 0;
  $('#sheetSizesPick').hidden = !hasSizes;
  $('#sizeGuide').hidden = !hasSizes;
  $('#sizeGuide').open = false;
  if (hasSizes) renderOpts($('#sheetSizes'), p.sizes, sheet.size, { onPick: (v) => { sheet.size = v; } });
  $('#sheet').showModal();
}

function initSheet() {
  const dlg = $('#sheet');
  $('#sheetImg').addEventListener('click', (e) => {
    const v = e.target.closest('[data-view]');
    if (v) { sheet.view = v.dataset.view; renderSheetImg(); }
  });
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
    return Array.isArray(data) ? data.filter((it) => {
      const p = byId(it.id);
      return p && p.activo !== false && p.colors.includes(it.color) && it.qty > 0;
    }) : [];
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
  return `${i + 1}. ${p.name} (${p.aud}) — ${COLORS[it.color].label}${size} × ${it.qty} — ${money(p.price * it.qty)}`;
}
const totalOf = (items) => items.reduce((s, it) => s + byId(it.id).price * it.qty, 0);

function orderMessage(items) {
  return [
    'hola zemar··· quiero hacer este pedido:',
    ...items.map(itemLine),
    `total: ${money(totalOf(items))}`,
    'mi nombre: ',
    'barrio (bogotá): ',
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
  const msg = `hola zemar, quiero estar en la lista de espera del drop 02. soy ${nombre} (whatsapp ${whatsapp}), me interesa ${interes}.`;
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

/* ==========================================================
   Nav: píldora compacta al hacer scroll, sección activa,
   menú de celular y botón "pedir"
   ========================================================== */
const hasIO = 'IntersectionObserver' in window;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initNav() {
  const nav = $('#nav');
  if (hasIO) {
    // centinela a 120 px del borde de arriba del hero
    const s = document.createElement('div');
    s.style.cssText = 'position:absolute;top:120px;left:0;width:1px;height:1px;pointer-events:none';
    $('.hero').appendChild(s);
    new IntersectionObserver(([en]) => {
      nav.classList.toggle('compact', !en.isIntersecting && en.boundingClientRect.top < 0);
    }).observe(s);

    // la sección que cruza la mitad de la pantalla marca su enlace
    const links = document.querySelectorAll('.nav-links [data-section]');
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.setAttribute('aria-current', String(a.dataset.section === en.target.id)));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['inicio', 'catalogo', 'lista'].forEach((id) => spy.observe(document.getElementById(id)));
  }

  $('#navOrder').addEventListener('click', () => setBagOpen(true));

  const menu = $('#menu'), menuBtn = $('#menuBtn');
  menuBtn.addEventListener('click', () => { menu.showModal(); menuBtn.setAttribute('aria-expanded', 'true'); });
  menu.addEventListener('close', () => menuBtn.setAttribute('aria-expanded', 'false'));
  $('#menuClose').addEventListener('click', () => menu.close());
  menu.addEventListener('click', (e) => {
    if (e.target === menu || e.target.closest('a')) menu.close(); // clic afuera o en un enlace
  });
}

/* ---------- movimiento (15.5): aparición al hacer scroll y parallax ---------- */
function initMotion() {
  if (reduceMotion) return;

  if (hasIO) {
    // el estado inicial es visible: .reveal solo se agrega si hay observador
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.benefit, .cat-head, .filters, .wait .wrap > *, .closing .wrap > *').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return; // lo que ya se ve no se esconde
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  // parallax suave de "zem · ar" con el mouse (máximo 12 px, solo escritorio)
  if (window.matchMedia('(hover: hover) and (min-width: 900px)').matches) {
    const panel = $('.hero-panel'), giant = $('#giant');
    let raf = 0;
    panel.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = panel.getBoundingClientRect();
        const dx = ((e.clientX - r.left) / r.width - .5) * -24;
        const dy = ((e.clientY - r.top) / r.height - .5) * -12;
        giant.style.setProperty('--px', `${dx.toFixed(1)}px`);
        giant.style.setProperty('--py', `${dy.toFixed(1)}px`);
      });
    });
    panel.addEventListener('mouseleave', () => {
      giant.style.setProperty('--px', '0px');
      giant.style.setProperty('--py', '0px');
    });
  }
}

/* ---------- arranque ---------- */
initHero();
initHotspots();
initCatalog();
initSearch();
initSheet();
renderSizeGuide();
initBag();
initWaitlist();
initNav();
initMotion();
