<template>
  <section
    id="Peluches"
    class="w-full scroll-mt-24"
    aria-labelledby="peluches-title"
  >
    <header class="w-full text-left py-4 px-8">
      <!-- H2 SEO (intención real: regalos/peluches en Medellín) -->
      <h2
        id="peluches-title"
        class="text-2xl font-bold"
      >
        Peluches y regalos de voleibol en Medellín
      </h2>

      <!-- Copy visible corto (SEO + conversión sin romper UI) -->
      <p class="mt-2 text-gray-700 max-w-3xl">
        Peluches temáticos y detalles deportivos para jugadoras, entrenadores y fans.
        Compra por WhatsApp y entrega en Medellín y Área Metropolitana.
      </p>

      <!-- Copy SEO invisible -->
      <p class="sr-only">
        Peluches de voleibol en Medellín ideales como regalos deportivos y detalles para fanáticos.
        Compra en Volley Express Shop con atención por WhatsApp y entrega local.
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
      aria-label="Carrusel de peluches y regalos de voleibol en Medellín"
    >
      <div ref="trackRef" class="flex gap-6 items-stretch">
        <article
          v-for="(peluche, index) in peluchesDuplicados"
          :key="`${peluche.nombre}-${index}`"
          class="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-1/4"
          itemscope
          itemtype="https://schema.org/Product"
        >
          <!-- URL del “producto” (SPA + ancla) -->
          <meta itemprop="url" :content="pageUrlWithAnchor" />

          <div
            class="rounded-4xl shadow-2xl overflow-hidden p-2 h-full drop-shadow-[10px_10px_25px_rgba(80,150,55,0.6)] flex flex-col bg-white"
          >
            <figure class="w-full h-48 flex items-center justify-center">
              <img
                :src="peluche.imagen"
                :alt="altText(peluche)"
                class="w-full h-full object-contain transition-transform duration-300 hover:scale-150"
                loading="lazy"
                decoding="async"
                itemprop="image"
              />
              <figcaption class="sr-only">
                {{ peluche.nombre }}
              </figcaption>
            </figure>

            <div class="p-4 flex flex-col h-full">
              <h3
                class="text-2xl text-center font-bold mb-2 min-h-[56px] flex items-center justify-center text-balance"
                itemprop="name"
              >
                {{ peluche.nombre }}
              </h3>

              <p
                class="text-gray-900 mb-4 min-h-[64px] text-justify"
                itemprop="description"
              >
                {{ peluche.descripcion }}
              </p>

              <!-- Offer schema (price numérico) -->
              <p
                class="text-gray-900 font-bold text-center text-2xl mb-4 min-h-[40px] flex items-center justify-center"
                itemprop="offers"
                itemscope
                itemtype="https://schema.org/Offer"
                aria-label="Precio"
              >
                <meta itemprop="priceCurrency" content="COP" />
                <meta itemprop="price" :content="peluche.precioNumero" />
                <!-- No invento stock: no pongo availability -->
                <span>{{ peluche.precioLabel }}</span>
              </p>

              <div
                v-if="peluche.size || peluche.material"
                class="grid grid-cols-2 gap-2 text-xs mb-4"
              >
                <div
                  v-if="peluche.size"
                  class="bg-gray-100 rounded-lg p-2 text-center"
                >
                  <span class="block font-bold">Talla</span>
                  <span>{{ peluche.size }}</span>
                </div>

                <div
                  v-if="peluche.material"
                  :class="peluche.size ? 'col-span-1' : 'col-span-2'"
                  class="bg-gray-100 rounded-lg p-2 text-center"
                >
                  <span class="block font-bold">Material</span>
                  <span>{{ peluche.material }}</span>
                </div>
              </div>

              <a
                :href="waLink(peluche.nombre)"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center mt-auto"
                :aria-label="`Comprar ${peluche.nombre} por WhatsApp en Medellín`"
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
import peluchesData from '../data/peluches.json'

const WA_NUMBER = '573004311280'

/** Normaliza rutas de /public (por si peluches también vienen desde /img/...) */
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

/** Enriquecimiento si el copy es muy corto (sin inventar características) */
function enrichDescripcion({ nombre, descripcion }) {
  const d = (descripcion || '').trim()
  if (d.length >= 25) return d
  const n = (nombre || 'Peluche').trim()
  return `${n}. Regalo temático de voleibol, ideal para jugadoras y fans. Disponible en Medellín.`
}

/** WhatsApp con intención local */
function waLink(nombre) {
  const msg = `Hola, estoy en Medellín. Me interesa este peluche/regalo de voleibol: ${nombre}. ¿Precio y disponibilidad, por favor?`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

/** Alt enfocado a regalos/peluches + Medellín */
function altText(p) {
  const n = (p?.nombre || 'Peluche de voleibol').trim()
  return `${n} - peluche y regalo de voleibol en Medellín`
}

/** URL para itemprop=url en SPA */
const pageUrlWithAnchor = computed(() => {
  if (typeof window === 'undefined') return ''
  const u = new URL(window.location.href)
  u.hash = '#Peluches'
  return u.toString()
})

/** Deduplicación simple (si te repiten items iguales en JSON) */
function dedupe(list) {
  const seen = new Set()
  const out = []
  for (const p of list) {
    const key = `${(p.nombre || '').trim().toLowerCase()}|${(p.imagen || '').trim().toLowerCase()}|${(p.precio || '').trim()}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(p)
  }
  return out
}

const items = computed(() => {
  const raw = Array.isArray(peluchesData) ? peluchesData : []
  const cleaned = raw.map(p => {
    const nombre = (p.nombre ?? p.referencia ?? 'Peluche').toString().trim()
    const descripcion = enrichDescripcion({ nombre, descripcion: p.descripcion ?? '' })
    return {
      nombre,
      descripcion,
      precio: p.precio ?? '',
      precioNumero: toPriceNumber(p.precio),
      precioLabel: toPriceLabel(p.precio),
      imagen: normalizePublicPath(p.imagen || p.img || ''),
      size: p.size ?? null,
      material: p.material ?? null
    }
  })
  return dedupe(cleaned)
})

const peluchesDuplicados = computed(() => [...items.value, ...items.value])

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

const animateTo = targetLeft => {
  const wrap = wrapRef.value
  if (!wrap) return
  const startLeft = wrap.scrollLeft
  const delta = targetLeft - startLeft
  const startTime = performance.now()
  const tick = now => {
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
    target -= half
    wrap.scrollLeft -= half
  }
  animateTo(target)
}

const startAuto = () => {
  if (!timer) timer = setInterval(() => running && stepNext(), STEP_INTERVAL_MS)
}
const stopAuto = () => {
  clearInterval(timer)
  timer = null
}
const play = () => { if (!running) { running = true; startAuto() } }
const pause = () => {
  running = false
  stopAuto()
  if (animRaf) cancelAnimationFrame(animRaf)
}

onMounted(startAuto)
onBeforeUnmount(pause)
</script>
