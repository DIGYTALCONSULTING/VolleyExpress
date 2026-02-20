<template>
  <section
    id="Accesorios"
    class="w-full scroll-mt-24"
    aria-labelledby="accesorios-title"
  >
    <header class="w-full text-left py-2 px-2">
      <!-- H2 SEO: intención real (variedades/regalos) -->
      <h2
        id="accesorios-title"
        class="text-2xl font-bold"
      >
        Variedades y regalos de voleibol en Medellín
      </h2>

      <!-- Copy visible corto (mejora SEO + conversión sin cambiar UI) -->
      <p class="mt-2 text-gray-700 max-w-3xl">
        Llaveros, collares, aretes, pines, stickers y detalles temáticos de voleibol. Ideal para regalar a jugadoras, entrenadores y fans. Entrega en Medellín y Área Metropolitana.
      </p>

      <!-- Copy SEO adicional -->
      <p class="sr-only">
        Compra variedades y regalos de voleibol en Medellín: llaveros, collares, aretes, pines, curitas, stickers, tatuajes temporales y manillas temáticas. Atención por WhatsApp.
      </p>
    </header>

    <div
      ref="wrapRef"
      class="w-full p-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
      @mouseenter="pause"
      @mouseleave="play"
      @touchstart.passive="pause"
      @touchend.passive="play"
      role="region"
      aria-label="Carrusel de variedades y regalos de voleibol en Medellín"
    >
      <div ref="trackRef" class="flex gap-6 items-stretch">
        <article
          v-for="(item, index) in duplicados"
          :key="`${item.referencia}-${item.imagen}-${index}`"
          class="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-1/4"
          itemscope
          itemtype="https://schema.org/Product"
        >
          <!-- URL del producto (SPA) -->
          <meta itemprop="url" :content="pageUrlWithAnchor" />

          <div
            class="bg-white rounded-4xl shadow-2xl overflow-hidden p-2 h-full drop-shadow-[10px_10px_25px_rgba(80,150,55,0.6)] flex flex-col"
          >
            <figure class="w-full h-48 flex items-center justify-center">
              <img
                :src="item.imagen"
                :alt="altText(item)"
                class="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                loading="lazy"
                decoding="async"
                itemprop="image"
              />
              <figcaption class="sr-only">
                {{ item.referencia }}
              </figcaption>
            </figure>

            <div class="p-4 flex flex-col flex-1">
              <h3
                class="text-xl sm:text-2xl text-center font-bold mb-2 min-h-[56px] flex items-center justify-center text-balance"
                itemprop="name"
              >
                {{ item.referencia }}
              </h3>

              <p
                class="text-gray-900 mb-4 text-sm sm:text-base text-justify line-clamp-3"
                itemprop="description"
              >
                {{ item.descripcion }}
              </p>

              <!-- Offer schema: price numérico (Google lo entiende) -->
              <p
                class="text-gray-900 font-bold text-center text-2xl mb-4 min-h-[40px] flex items-center justify-center"
                itemprop="offers"
                itemscope
                itemtype="https://schema.org/Offer"
                aria-label="Precio"
              >
                <meta itemprop="priceCurrency" content="COP" />
                <meta itemprop="price" :content="item.precioNumero" />
                <!-- Si NO tienes stock garantizado, no afirmes InStock. Comentado a propósito. -->
                <!-- <link itemprop="availability" href="https://schema.org/InStock" /> -->
                <span>{{ item.precioLabel }}</span>
              </p>

              <div class="grid grid-cols-2 gap-2 text-xs mb-4">
                <div class="bg-gray-100 rounded-lg p-2 text-center">
                  <span class="block font-bold">Talla</span>
                  <span>{{ item.size || 'N/A' }}</span>
                </div>
                <div class="bg-gray-100 rounded-lg p-2 text-center">
                  <span class="block font-bold">Material</span>
                  <span>{{ item.material || 'N/A' }}</span>
                </div>
              </div>

              <a
                :href="waLink(item.referencia)"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center mt-auto"
                :aria-label="`Comprar ${item.referencia} por WhatsApp en Medellín`"
              >
                <button
                  type="button"
                  class="bg-gradient-to-b from-[#509637] to-[#1A3012] text-white cursor-pointer rounded-full px-4 py-2 inline-flex flex-col items-center gap-0.5 w-full"
                >
                  <span class="font-bold">Comprar por WhatsApp</span>
                  <span class="font-bold">Medellín</span>
                </button>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import accesoriosData from '../data/accesorios.json'

const WA_NUMBER = '573004311280'

/** Normaliza rutas de /public (evita 404 por //, /public/, .Webp, espacios) */
function normalizePublicPath(path) {
  if (!path) return ''
  let s = String(path).trim()

  if (/^(https?:)?\/\//i.test(s) || /^data:/i.test(s) || /^blob:/i.test(s)) return s

  s = s.replace(/^\/?public\//, '/')
  if (!s.startsWith('/')) s = `/${s}`
  s = s.replace(/\/{2,}/g, '/')
  s = s.replace(/\.webp$/i, '.webp')
  return encodeURI(s)
}

/** price numérico para schema Offer */
function toPriceNumber(value) {
  if (value == null) return ''
  const digits = String(value).replace(/[^\d]/g, '')
  return digits ? String(Number(digits)) : ''
}
function toPriceLabel(value) {
  if (value == null || value === '') return 'Precio a consultar'
  const n = toPriceNumber(value)
  if (!n) return String(value)
  return `COP ${Number(n).toLocaleString('es-CO')}`
}

/** Limpieza suave (solo display) */
function fixText(s) {
  if (!s) return ''
  return String(s)
    .replace(/MUŃECA/g, 'MUÑECA')
    .replace(/MOŃO/g, 'MOÑO')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Detecta el tipo (para enriquecer descripciones cortas) */
function detectTipo(ref) {
  const r = (ref || '').toLowerCase()
  if (r.includes('llavero')) return 'Llavero'
  if (r.includes('collar')) return 'Collar'
  if (r.includes('aretes') || r.includes('topos')) return 'Aretes'
  if (r.includes('anillo')) return 'Anillo'
  if (r.includes('pin')) return 'Pin'
  if (r.includes('stickers')) return 'Stickers'
  if (r.includes('tatuaje')) return 'Tatuaje temporal'
  if (r.includes('curitas')) return 'Curitas temáticas'
  if (r.includes('humectante')) return 'Humectante labial'
  if (r.includes('manilla')) return 'Manilla'
  if (r.includes('moño') || r.includes('mono')) return 'Moño'
  return 'Variedad'
}

/** Enriquecimiento SEO si la descripción es demasiado corta/repetida */
function enrichDescripcion({ referencia, descripcion, material }) {
  const d = (descripcion || '').trim()
  if (d.length >= 25) return d

  const tipo = detectTipo(referencia)
  const mat = (material || '').trim()
  const extraMat = mat ? ` en ${mat.toLowerCase()}` : ''
  return `${tipo} temático de voleibol${extraMat}. Ideal para regalo o detalle para fans del voleibol. Disponible en Medellín.`
}

/** Alt orientado a intención regalos */
function altText({ referencia, material }) {
  const ref = fixText(referencia || 'Regalo de voleibol')
  const mat = (material || '').trim()
  const m = mat ? ` (${mat})` : ''
  return `${ref}${m} - regalo de voleibol en Medellín`
}

/** WhatsApp con intención local + regalo */
function waLink(nombre) {
  const msg = `Hola, estoy en Medellín. Quiero este regalo/variedad de voleibol: ${nombre}. ¿Precio y disponibilidad, por favor?`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

/** Deduplicación para evitar items repetidos exactos */
function dedupe(list) {
  const seen = new Set()
  const out = []
  for (const a of list) {
    const key = `${(a.referencia || '').trim().toLowerCase()}|${(a.imagen || '').trim().toLowerCase()}|${(a.precio || '').trim()}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(a)
  }
  return out
}

/** URL para itemprop=url en SPA */
const pageUrlWithAnchor = computed(() => {
  if (typeof window === 'undefined') return ''
  const u = new URL(window.location.href)
  u.hash = '#Accesorios'
  return u.toString()
})

const items = computed(() => {
  const raw = Array.isArray(accesoriosData) ? accesoriosData : []
  const cleaned = raw.map(a => {
    const referencia = fixText(a.referencia ?? 'Variedad')
    const material = fixText(a.material ?? '')
    const descripcion = enrichDescripcion({
      referencia,
      descripcion: fixText(a.descripcion ?? ''),
      material
    })

    return {
      referencia,
      descripcion,
      precio: a.precio ?? '',
      precioNumero: toPriceNumber(a.precio),
      precioLabel: toPriceLabel(a.precio),
      imagen: normalizePublicPath(a.imagen || a.img || ''),
      size: fixText(a.size ?? ''),
      material
    }
  })

  return dedupe(cleaned)
})

const duplicados = computed(() => [...items.value, ...items.value])

const wrapRef = ref(null)
const trackRef = ref(null)
let timer = null
let animRaf = null
let running = true

const STEP_INTERVAL_MS = 2500
const ANIM_DURATION_MS = 600
const GAP_PX = 24

const getMetrics = () => {
  const wrap = wrapRef.value
  const track = trackRef.value
  if (!wrap || !track) return { cardStep: 0, perView: 1, half: 0 }
  const firstCard = track.children?.[0]
  if (!firstCard) return { cardStep: 0, perView: 1, half: 0 }
  const cardWidth = firstCard.offsetWidth
  const cardStep = cardWidth + GAP_PX
  const perView = Math.max(1, Math.min(4, Math.floor((wrap.clientWidth + GAP_PX) / cardStep)))
  const half = track.scrollWidth / 2
  return { cardStep, perView, half }
}

const animateTo = (targetLeft) => {
  const wrap = wrapRef.value
  if (!wrap) return
  const startLeft = wrap.scrollLeft
  const delta = targetLeft - startLeft
  const startTime = performance.now()
  const tick = (now) => {
    const t = Math.min(1, (now - startTime) / ANIM_DURATION_MS)
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    wrap.scrollLeft = startLeft + delta * ease
    if (t < 1 && running) animRaf = requestAnimationFrame(tick)
    else animRaf = null
  }
  if (animRaf) cancelAnimationFrame(animRaf)
  animRaf = requestAnimationFrame(tick)
}

const stepNext = () => {
  const wrap = wrapRef.value
  const track = trackRef.value
  if (!wrap || !track) return
  const { cardStep, perView, half } = getMetrics()
  if (!cardStep || !half) return
  let target = wrap.scrollLeft + cardStep * perView
  if (target >= half) {
    target = target - half
    wrap.scrollLeft = wrap.scrollLeft - half
  }
  animateTo(target)
}

const startAuto = () => {
  if (timer) return
  timer = setInterval(() => { if (running) stepNext() }, STEP_INTERVAL_MS)
}
const stopAuto = () => { if (timer) { clearInterval(timer); timer = null } }

const play = () => { if (running) return; running = true; startAuto() }
const pause = () => {
  running = false
  stopAuto()
  if (animRaf) { cancelAnimationFrame(animRaf); animRaf = null }
}

const handleResize = () => {
  const wrap = wrapRef.value
  if (!wrap) return
  const { cardStep, perView, half } = getMetrics()
  if (!cardStep || !half) return
  const group = cardStep * perView
  const current = wrap.scrollLeft % half
  const aligned = Math.round(current / group) * group
  wrap.scrollLeft = aligned
}

onMounted(() => {
  running = true
  startAuto()
  window.addEventListener('resize', handleResize, { passive: true })
  handleResize()
})

onBeforeUnmount(() => {
  pause()
  window.removeEventListener('resize', handleResize)
})
</script>
