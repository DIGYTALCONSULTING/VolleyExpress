<template>
  <!-- Sección general -->
  <section id="Peluches" class="w-full">
    <!-- Título -->
    <div class="w-full text-left py-4 px-8">
      <h1 class="text-2xl font-bold">PELUCHES</h1>
    </div>

    <!-- Carrusel de peluches -->
    <div
      ref="wrapRef"
      class="w-full p-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
      @mouseenter="pause"
      @mouseleave="play"
      @touchstart.passive="pause"
      @touchend.passive="play"
    >
      <!-- Pista -->
      <div ref="trackRef" class="flex gap-6 items-stretch">
        <div
          v-for="(peluche, index) in peluchesDuplicados"
          :key="index"
          class="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-1/4"
        >
          <div class="rounded-4xl shadow-2xl overflow-hidden p-2 h-full drop-shadow-[10px_10px_25px_rgba(80,150,55,0.6)]">
            <img
              :src="peluche.imagen"
              :alt="peluche.nombre"
              class="w-full h-48 object-contain"
              loading="lazy"
            />
            <div class="p-4">
              <h3 class="text-2xl text-center font-bold mb-2">{{ peluche.nombre }}</h3>
              <p class="text-gray-900 mb-4">{{ peluche.descripcion }}</p>
              <p class="text-gray-900 font-bold text-center text-2xl mb-6">{{ peluche.precio }}</p>

              <a
                :href="`https://api.whatsapp.com/send?phone=573004311280&text=${encodeURIComponent('Hola, estoy interesado en el producto ' + peluche.nombre)}`"
                target="_blank"
                rel="noopener"
                class="block w-full text-center"
              >
                <button
                  class="bg-gradient-to-b from-[#509637] to-[#1A3012] text-white cursor-pointer rounded-full px-4 py-2 inline-flex flex-col items-center gap-0.5 w-full"
                >
                  <span class="font-bold">Contáctanos</span>
                  <span class="font-bold">WhatsApp</span>
                </button>
              </a>
            </div>
          </div>
        </div>
        <!-- Lista duplicada para loop infinito -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import peluchesData from '../data/peluches.json'

// ---------- Resolver robusto de imágenes ----------
function resolveImg(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  // /public: si viene como /assets/... se sirve directo
  if (/^\/assets\//i.test(path)) return path
  // src/assets: normaliza y resuelve con Vite
  const cleaned = path
    .replace(/^\/?src\//, '')
    .replace(/^\/?assets\//, '')
  try {
    return new URL(`../assets/${cleaned}`, import.meta.url).href
  } catch {
    return path
  }
}

// Items con imagen resuelta + defaults seguros
const items = computed(() =>
  (peluchesData ?? []).map(p => ({
    ...p,
    imagen: resolveImg(p.imagen || p.img),
    nombre: p.nombre ?? '',
    descripcion: p.descripcion ?? '',
    precio: p.precio ?? '',
  }))
)

// Duplicamos para loop infinito sin “salto”
const peluchesDuplicados = computed(() => [...items.value, ...items.value])

const wrapRef = ref(null)
const trackRef = ref(null)

let timer = null
let animRaf = null
let running = true

// Autoplay
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
