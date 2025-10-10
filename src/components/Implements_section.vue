<template>
  <!-- Sección general -->
  <section id="Implementos_Deportivos" class="w-full">
    <!-- Título -->
    <div class="w-full text-left py-4 px-4">
      <h1 class="text-2xl font-bold">IMPLEMENTOS DEPORTIVOS</h1>
    </div>

    <!-- Carrusel de productos -->
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
          v-for="(producto, index) in productosDuplicados"
          :key="index"
          class="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-1/4"
        >
          <div
            class="bg-white rounded-4xl shadow-2xl overflow-hidden p-2 drop-shadow-[10px_10px_25px_rgba(80,150,55,0.6)] h-full flex flex-col"
          >
            <!-- Imagen (altura uniforme y centrada) -->
            <div class="w-full h-48 flex items-center justify-center">
              <img
                :src="producto.imagen"
                :alt="producto.nombre"
                class="w-full h-full object-contain rounded-xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>

            <!-- Contenido -->
            <div class="p-4 flex flex-col h-full">
              <!-- Título con alto mínimo para uniformar -->
              <h3 class="text-2xl text-center font-bold mb-2 min-h-[56px] flex items-center justify-center text-balance">
                {{ producto.nombre }}
              </h3>

              <!-- Descripción con alto mínimo -->
              <p class="text-gray-900 mb-4 min-h-[64px]">
                {{ producto.descripcion }}
              </p>

              <!-- Precio con alto mínimo -->
              <p class="text-gray-900 font-bold text-center text-2xl mb-6 min-h-[40px] flex items-center justify-center">
                {{ producto.precio }}
              </p>

              <!-- CTA anclado al fondo -->
              <a
                :href="`https://api.whatsapp.com/send?phone=573004311280&text=${encodeURIComponent('Hola, estoy interesado en el producto ' + producto.nombre)}`"
                target="_blank"
                rel="noopener"
                class="block w-full text-center mt-auto"
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
        <!-- Duplicamos la lista para loop infinito -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import productosData from '../data/productos.json'

/** Resuelve assets del JSON para que funcionen en build (Vite/GitHub Pages) */
function resolveImg(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  // Limpia prefijos comunes
  const cleaned = path
    .replace(/^\/?src\//, '')        // /src/... -> ...
    .replace(/^assets\//, '')        // assets/... -> ...
    .replace(/^\/?assets\//, '')     // /assets/... -> ...
  try {
    // Busca en /src/assets
    return new URL(`../assets/${cleaned}`, import.meta.url).href
  } catch {
    // Último recurso: deja el path tal cual
    return path
  }
}

/** ✅ Productos con imagen resuelta y defaults seguros */
const items = computed(() =>
  (productosData ?? []).map(p => ({
    ...p,
    imagen: resolveImg(p.imagen || p.img),
    descripcion: p.descripcion ?? '',
    precio: p.precio ?? '',
    nombre: p.nombre ?? '',
  }))
)

/** Duplicamos para loop infinito */
const productosDuplicados = computed(() => [...items.value, ...items.value])

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
    if (t < 1 && running) {
      animRaf = requestAnimationFrame(tick)
    } else {
      animRaf = null
    }
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
