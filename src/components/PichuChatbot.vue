<template>
  <teleport to="body">
    <!-- BOTÓN FLOTANTE -->
    <button
      @click="toggle"
      class="fixed right-4 z-[9998] rounded-full shadow-xl p-0.5 focus:outline-none transition chat-safe-bottom"
      :class="isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'"
    >
      <div class="relative bg-white rounded-full p-2 ring-2 ring-lime-400/70 overflow-hidden">
        <img
          :src="pichuImg"
          alt="Pichu"
          class="w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-10"
        />

        <!-- TEXTO CIRCULAR -->
        <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full pointer-events-none animate-spin-slow">
          <defs>
            <path
              id="pichu-circle"
              d="M50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
          </defs>
          <text font-size="10" font-weight="700" class="fill-lime-600">
            <textPath xlink:href="#pichu-circle">
              · PREGÚNTALE A PICHU · PREGÚNTALE A PICHU ·
            </textPath>
          </text>
        </svg>
      </div>
    </button>

    <!-- CHAT -->
    <div
      v-show="isOpen"
      class="fixed right-4 z-[10000] chat-safe-bottom w-full max-w-[420px]
             rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5"
    >
      <!-- Header -->
      <div class="flex items-center gap-3 bg-gradient-to-r from-lime-400 to-emerald-500 text-white p-3">
        <img :src="pichuImg" class="w-9 h-9 rounded-full bg-white/90 p-1" alt="Pichu avatar" />
        <div>
          <p class="font-semibold">Pichu</p>
          <p class="text-[11px]">Asesor de ventas · VolleyExpress</p>
        </div>

        <button
          @click="resetChat"
          class="ml-auto text-xs bg-white/20 px-2 py-1 rounded-lg"
          type="button"
        >
          Reiniciar
        </button>

        <button
          @click="isOpen = false"
          class="ml-2 text-sm bg-white/20 w-7 h-7 rounded-full flex items-center justify-center"
          type="button"
          aria-label="Cerrar chat"
        >
          ✕
        </button>
      </div>

      <!-- Conversación -->
      <div ref="scrollRef" class="h-[58vh] overflow-y-auto p-3 space-y-3 bg-zinc-50">
        <div
          v-for="(m,i) in messages"
          :key="i"
          class="flex"
          :class="m.from === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            :class="m.from === 'user'
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-zinc-800 ring-1 ring-zinc-200'"
            class="max-w-[85%] rounded-2xl px-4 py-3 text-[13px]"
          >
            <div v-html="m.text"></div>

            <!-- Acciones (WhatsApp) -->
            <div v-if="m.actions?.length" class="mt-3 space-y-2">
              <a
                v-for="(a,idx) in m.actions"
                :key="idx"
                :href="a.href"
                target="_blank"
                rel="noopener noreferrer"
                class="block text-center bg-[#25D366] text-white text-[12px] py-1.5 rounded-full"
              >
                {{ a.label }}
              </a>
            </div>

            <!-- Sugerencias rápidas -->
            <div v-if="m.suggest?.length" class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="(s,idx) in m.suggest"
                :key="`${i}-${idx}-${s}`"
                @click="quickAsk(s)"
                class="text-[11px] bg-zinc-100 px-3 py-1 rounded-full"
                type="button"
              >
                {{ s }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="isTyping" class="text-[13px] text-zinc-500">
          Pichu está escribiendo…
        </div>
      </div>

      <!-- Input -->
      <form @submit.prevent="handleSend" class="p-2 border-t flex gap-2">
        <input
          v-model.trim="input"
          placeholder="Ej: rodilleras negras talla s/m"
          class="flex-1 px-3 py-2 rounded-xl ring-1 ring-zinc-200 text-[13px]"
          aria-label="Escribe tu mensaje"
        />
        <button class="bg-emerald-600 text-white px-4 rounded-xl text-[13px]" type="submit">
          Enviar
        </button>
      </form>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import pichuImg from '../assets/pichu.webp'

// ✅ Índice generado por tu script
import catalogIndex from '../data/catalog.index.json'

const isOpen = ref(false)
const input = ref('')
const messages = ref([])
const isTyping = ref(false)
const scrollRef = ref(null)

const waBase = 'https://wa.me/573004311280?text='

// ---------- Memoria conversacional ----------
const lastIntent = ref(null)     // { categoria, subcategoria, color, talla, material, query }
const lastResults = ref([])      // array items
const lastPos = ref(0)           // índice actual en lastResults

// ---------- Utils ----------
function stripAccents(s = '') {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
function normalizeText(s = '') {
  return stripAccents(String(s)).toLowerCase().replace(/\s+/g, ' ').trim()
}

function scrollBottom() {
  nextTick(() => {
    if (scrollRef.value) {
      scrollRef.value.scrollTop = scrollRef.value.scrollHeight
    }
  })
}

function waMessage(it) {
  const name = it.referencia || it.nombre || 'producto'
  const price = it.precioTexto || ''
  return waBase + encodeURIComponent(`Hola, quiero comprar ${name}. Precio: ${price}`)
}

function isAnotherCmd(t) {
  const x = normalizeText(t)
  return (
    x === 'otro' ||
    x === 'otra' ||
    x.includes('muestrame otro') ||
    x.includes('muéstrame otro') ||
    x.includes('muestrame otra') ||
    x.includes('más') ||
    x.includes('mas') ||
    x.includes('siguiente')
  )
}

// ---------- Intención (parse) ----------
const COLOR_ALIASES = [
  { key: 'negro', words: ['negro', 'negra', 'black'] },
  { key: 'blanco', words: ['blanco', 'blanca', 'white'] },
  { key: 'azul', words: ['azul', 'navy', 'marino'] },
  { key: 'rojo', words: ['rojo', 'roja', 'red'] },
  { key: 'verde', words: ['verde', 'green'] },
  { key: 'amarillo', words: ['amarillo', 'amarilla', 'yellow'] },
  { key: 'rosado', words: ['rosado', 'rosada', 'pink'] },
  { key: 'morado', words: ['morado', 'morada', 'purple'] },
  { key: 'gris', words: ['gris', 'gray'] },
  { key: 'multicolor', words: ['multicolor', 'multi color'] }
]

const MATERIAL_ALIASES = [
  { key: 'acero', words: ['acero', 'inoxidable'] },
  { key: 'pvc', words: ['pvc'] },
  { key: 'cuero', words: ['cuero'] },
  { key: 'goma', words: ['goma', 'caucho'] },
  { key: 'vinil', words: ['vinil', 'vinilo'] },
  { key: 'tela', words: ['tela', 'felpa', 'algodon', 'algodón', 'poliester', 'poliéster'] },
  { key: 'nylon', words: ['nylon'] },
  { key: 'neopreno', words: ['neopreno'] },
]

const SUBCAT_RULES = [
  { sub: 'rodilleras', words: ['rodillera', 'rodilleras', 'knee pad', 'kneepad', 'asics', 'asic', 'mizuno', 'errea', 'nike'] },
  { sub: 'balones', words: ['balon', 'balón', 'mikasa', 'molten', 'bv', 'v5m', 'v4m', 'v200', 'v330'] },
  { sub: 'infladores', words: ['inflador', 'bomba'] },
  { sub: 'agujas', words: ['aguja'] },
  { sub: 'cintas', words: ['kinesiologica', 'kinesiológica', 'cinta', 'esparadrapo'] },
  { sub: 'peluches', words: ['peluche', 'peluches'] },
  { sub: 'llaveros', words: ['llavero', 'llaveros'] },
  { sub: 'aretes', words: ['aretes', 'topos'] },
  { sub: 'collares', words: ['collar', 'collares'] },
  { sub: 'manillas', words: ['manilla', 'pulsera'] },
  { sub: 'stickers', words: ['sticker', 'stickers', 'calcomania', 'calcomanía'] },
  { sub: 'pines', words: ['pin', 'pines'] },
]

function pickAlias(list, textNorm) {
  for (const a of list) {
    for (const w of a.words) {
      const wn = normalizeText(w)
      if (textNorm.includes(wn)) return a.key
    }
  }
  return null
}

function parseTalla(textNorm) {
  // Detecta cosas como: "s/m", "m/l", "xs/s", "jr", "adulto", "universal", "u"
  const t = textNorm

  const compact = t.replace(/\s/g, '')
  const sizePairs = ['xs/s', 's/m', 'm/l', 'jr/adulto']
  for (const sp of sizePairs) {
    if (compact.includes(sp)) return sp
  }

  // Tallas por palabra completa, evitando falsos positivos como "peluches" -> "u".
  if (/\bjr\b/.test(t)) return 'jr'
  if (/\badulto\b/.test(t)) return 'adulto'
  if (/\buniversal\b/.test(t)) return 'universal'
  if (/\bu\b/.test(t)) return 'u'

  // También aceptar "talla s/m" o "talla m/l"
  const m = t.match(/\btalla\s*([a-z0-9\/\-]+)\b/i)
  if (m?.[1]) return normalizeText(m[1]).replace(/\s/g, '')
  return null
}

function detectSubcategoria(textNorm) {
  for (const r of SUBCAT_RULES) {
    for (const w of r.words) {
      if (textNorm.includes(normalizeText(w))) return r.sub
    }
  }
  return null
}

function detectCategoria(textNorm, sub) {
  // Si el usuario pide peluches -> peluches
  if (sub === 'peluches') return 'peluches'
  // Si es accesorios/variedades típicos
  if (['llaveros','aretes','collares','manillas','stickers','pines'].includes(sub)) return 'accesorios'
  // Implementos típicos
  if (['rodilleras','balones','infladores','agujas','cintas'].includes(sub)) return 'productos'

  // fallback por keywords generales
  if (textNorm.includes('accesor')) return 'accesorios'
  if (textNorm.includes('peluche')) return 'peluches'
  if (textNorm.includes('implement') || textNorm.includes('balon') || textNorm.includes('balón')) return 'productos'
  return null
}

function subcategoryMatch(item, intentSub) {
  if (!intentSub) return true

  const wanted = normalizeText(intentSub)
  const itemCategory = normalizeText(item.categoria || '')

  // Si la intención es directamente una categoría, no fuerces submatch textual.
  if (wanted === 'peluches' && itemCategory === 'peluches') return true

  if (item.subcategoria) {
    const itemSub = normalizeText(item.subcategoria)
    if (itemSub === wanted || itemSub.includes(wanted) || wanted.includes(itemSub)) {
      return true
    }
  }

  const st = normalizeText(item.searchText || '')
  if (includesNorm(st, wanted)) return true

  const rule = SUBCAT_RULES.find(r => normalizeText(r.sub) === wanted)
  if (rule) {
    return rule.words.some(w => includesNorm(st, normalizeText(w)))
  }

  return false
}

function isBroadCategoryQuery(intent) {
  const q = intent.qNorm
  return (
    q === 'peluche' ||
    q === 'peluches' ||
    q === 'accesorio' ||
    q === 'accesorios' ||
    q === 'balon' ||
    q === 'balones' ||
    q === 'rodillera' ||
    q === 'rodilleras'
  )
}

function buildIntent(query) {
  const q = normalizeText(query)
  const sub = detectSubcategoria(q)
  const cat = detectCategoria(q, sub)
  const color = pickAlias(COLOR_ALIASES, q)
  const material = pickAlias(MATERIAL_ALIASES, q)
  const talla = parseTalla(q)

  return { query, qNorm: q, categoria: cat, subcategoria: sub, color, material, talla }
}

// ---------- Búsqueda ----------
function includesNorm(field, valNorm) {
  if (!field || !valNorm) return false
  const f = normalizeText(field)
  return f.includes(valNorm)
}

function sizeMatch(itemSize, tallaNorm) {
  if (!tallaNorm) return true
  if (!itemSize) return false
  const s = normalizeText(itemSize).replace(/\s/g, '')
  // Ej: item "s/m, m/l" y query "s/m"
  return s.includes(tallaNorm)
}

function filterCatalog(intent) {
  const q = intent.qNorm
  const candidates = catalogIndex.filter(it => {
    // 1) categoria
    if (intent.categoria && it.categoria !== intent.categoria) return false

    // 2) subcategoria: si tu normalizador no crea subcategoria, igual funciona por searchText
    if (!subcategoryMatch(it, intent.subcategoria)) return false

    // 3) filtros
    if (intent.color) {
      if (it.color) {
        if (!includesNorm(it.color, intent.color)) return false
      } else {
        if (!includesNorm(it.searchText, intent.color)) return false
      }
    }

    if (intent.material) {
      if (it.material) {
        if (!includesNorm(it.material, intent.material)) return false
      } else {
        if (!includesNorm(it.searchText, intent.material)) return false
      }
    }

    if (intent.talla) {
      // Normal: size en tu data trae "S/M, M/L"
      if (!sizeMatch(it.size, intent.talla)) return false
    }

    // 4) query textual (si el usuario escribió algo específico)
    // Si solo escribió "rodilleras negras talla s/m", ya filtra por sub+color+talla.
    // Pero si escribió "asics low profile", esto ayuda.
    const tokens = q.split(' ').filter(w => w.length >= 3)
    // En consultas de categoría general, no exijas token textual.
    if (tokens.length && !isBroadCategoryQuery(intent)) {
      const hit = tokens.some(tok => includesNorm(it.searchText, tok))
      if (!hit) return false
    }

    return true
  })

  // Orden simple: primero los que más tokens matchean
  const tokens = q.split(' ').filter(w => w.length >= 3)
  const scored = candidates.map(it => {
    const st = normalizeText(it.searchText || '')
    let score = 0
    for (const tok of tokens) if (st.includes(tok)) score += 1
    // boost: si match exacto en referencia
    const ref = normalizeText(it.referencia || '')
    if (ref && tokens.some(tok => ref.includes(tok))) score += 2
    return { it, score }
  })

  scored.sort((a,b) => b.score - a.score)
  return scored.map(x => x.it)
}

// ---------- Render producto + upsell ----------
function renderItemCard(it) {
  const name = it.referencia || it.nombre || 'Producto'
  const price = it.precioTexto || ''
  const desc = it.descripcion ? `<div class="mt-1 text-justify leading-relaxed">${it.descripcion}</div>` : ''
  const attrs = []

  if (it.color) attrs.push(`<span><strong>Color:</strong> ${it.color}</span>`)
  if (it.size) attrs.push(`<span><strong>Talla:</strong> ${it.size}</span>`)
  if (it.material) attrs.push(`<span><strong>Material:</strong> ${it.material}</span>`)

  const attrHtml = attrs.length
    ? `<div class="mt-2 text-[12px] space-y-1">${attrs.map(a => `<div>${a}</div>`).join('')}</div>`
    : ''

  const imgHtml = it.imagen
    ? `<img src="${it.imagen}" alt="${name}" class="mt-3 w-full rounded-xl ring-1 ring-zinc-200 bg-white object-contain max-h-44" loading="lazy" />`
    : ''

  return `
    <div>
      <div><strong>${name}</strong></div>
      ${price ? `<div class="mt-1"><strong>${price}</strong></div>` : ''}
      ${desc}
      ${attrHtml}
      ${imgHtml}
    </div>
  `
}

function findCrossSell(queryWords) {
  const wants = queryWords.map(w => normalizeText(w))
  // Busca por tokens en searchText
  const found = []
  for (const it of catalogIndex) {
    const st = normalizeText(it.searchText || '')
    if (wants.some(w => st.includes(w))) found.push(it)
  }
  // Prioriza categoría productos y precio bajo (si hay)
  found.sort((a,b) => (a.precioCOP ?? 999999999) - (b.precioCOP ?? 999999999))
  return found
}

function pushItemMessage(it, extraActions = []) {
  messages.value.push({
    from: 'bot',
    text: renderItemCard(it),
    actions: [
      { label: 'Comprar por WhatsApp', href: waMessage(it) },
      ...extraActions
    ]
  })
}

function pushUpsellIfNeeded(mainItem) {
  // Heurística: si parece balón, sugiere aguja + inflador
  const st = normalizeText(mainItem.searchText || '')
  const isBall = st.includes('balon') || st.includes('balón') || st.includes('mikasa') || st.includes('molten')

  if (!isBall) return

  const needles = findCrossSell(['aguja']).slice(0, 1)
  const pumps = findCrossSell(['inflador', 'bomba']).slice(0, 1)

  if (!needles.length && !pumps.length) return

  let html = `<div><strong>Recomendados para tu balón (cross-sell):</strong></div>`
  const items = [...needles, ...pumps]

  for (const it of items) {
    const name = it.referencia || it.nombre || 'Producto'
    const price = it.precioTexto || ''
    html += `<div class="mt-2">• <strong>${name}</strong> ${price ? `— ${price}` : ''}</div>`
  }

  messages.value.push({
    from: 'bot',
    text: html,
    actions: items.map(it => ({ label: `Comprar: ${it.referencia}`, href: waMessage(it) }))
  })
}

// ---------- Mensajes bot ----------
function saludo() {
  messages.value.push({
    from: 'bot',
    text: `
      <p><strong>Hola 👋 Soy Pichu.</strong></p>
      <p class="mt-2">Dime qué estás buscando (con detalles si puedes):</p>
      <ul class="mt-2 space-y-1">
        <li>🏐 Rodilleras (color / talla)</li>
        <li>🏐 Balones (Mikasa / Molten)</li>
        <li>🎒 Accesorios (llaveros, collares, aretes, manillas)</li>
        <li>🧸 Peluches</li>
      </ul>
      <p class="mt-3 text-[12px] text-zinc-600">
        Ejemplo: <em>“rodilleras negras talla s/m”</em>
      </p>
    `,
    suggest: ['Rodilleras negras talla s/m', 'Balón Mikasa', 'Accesorios', 'Peluches', 'Muéstrame otro']
  })
}

function noResults(intent) {
  const parts = []
  if (intent.subcategoria) parts.push(intent.subcategoria)
  if (intent.color) parts.push(intent.color)
  if (intent.talla) parts.push(`talla ${intent.talla}`)
  if (intent.material) parts.push(intent.material)

  messages.value.push({
    from: 'bot',
    text: `
      <div>
        <strong>No encontré coincidencias exactas</strong> para: <em>${parts.join(' · ') || intent.query}</em>.
        <div class="mt-2 text-[12px] text-zinc-600">
          Prueba con menos filtros (por ejemplo solo “rodilleras negras”) o escribe marca/modelo.
        </div>
      </div>
    `,
    suggest: ['Rodilleras negras', 'Rodilleras talla s/m', 'Balón Molten', 'Accesorios', 'Peluches']
  })
}

function showNextFromMemory() {
  if (!lastResults.value.length) {
    saludo()
    return
  }
  const pos = lastPos.value + 1
  if (pos >= lastResults.value.length) {
    messages.value.push({
      from: 'bot',
      text: `<strong>Ya te mostré todos los resultados de esa búsqueda.</strong> Si quieres, cambia color/talla o dime otra categoría.`,
      suggest: ['Rodilleras blancas talla s/m', 'Balón Mikasa', 'Accesorios', 'Peluches']
    })
    return
  }
  lastPos.value = pos
  const it = lastResults.value[pos]
  pushItemMessage(it)
  pushUpsellIfNeeded(it)
}

// ---------- Handler principal ----------
async function handleSend(prefilledText = '') {
  const text = String(prefilledText || input.value || '').trim()
  if (!text) return
  input.value = ''

  messages.value.push({ from: 'user', text })
  isTyping.value = true
  scrollBottom()

  await new Promise(r => setTimeout(r, 250))

  // “muéstrame otro”
  if (isAnotherCmd(text)) {
    showNextFromMemory()
    isTyping.value = false
    scrollBottom()
    return
  }

  // búsqueda por intención
  const intent = buildIntent(text)
  const results = filterCatalog(intent)

  if (!results.length) {
    lastIntent.value = intent
    lastResults.value = []
    lastPos.value = 0
    noResults(intent)
    isTyping.value = false
    scrollBottom()
    return
  }

  // Guarda memoria
  lastIntent.value = intent
  lastResults.value = results
  lastPos.value = 0

  // Muestra SOLO el primero (lo que pediste)
  const first = results[0]
  pushItemMessage(first)
  pushUpsellIfNeeded(first)

  // Sugiere “otro” + 2 variaciones rápidas
  messages.value.push({
    from: 'bot',
    text: `<div class="text-[12px] text-zinc-600">Si quieres, escribe <strong>“otro”</strong> para ver otra opción.</div>`,
    suggest: ['Otro', 'Rodilleras blancas talla s/m', 'Balón Molten']
  })

  isTyping.value = false
  scrollBottom()
}

function quickAsk(t) {
  handleSend(t)
}

function toggle() {
  isOpen.value = !isOpen.value
}

function resetChat() {
  messages.value = []
  lastIntent.value = null
  lastResults.value = []
  lastPos.value = 0
  saludo()
}

onMounted(saludo)
</script>

<style>
:root {
  --digytal-footer-height: 96px;
}
.chat-safe-bottom {
  bottom: calc(env(safe-area-inset-bottom, 0px) + var(--digytal-footer-height) + 1rem);
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin 18s linear infinite;
}
</style>
