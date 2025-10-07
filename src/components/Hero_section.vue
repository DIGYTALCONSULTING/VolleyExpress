<template>
  <section class="w-full">
    <!-- Contenedor principal -->
    <div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <!-- Columna izquierda: Video + CTA -->
     <div class="flex flex-col items-center md:items-start gap-24 md:ml-32 max-w-lg">
  <!-- Video redondo -->
        <div class="w-56 h-56 md:w-72 md:h-72 max-w-md rounded-full overflow-hidden shadow-xl">
          <video
            :src="heroVideo"
            class="w-full h-full object-cover"
            autoplay
            muted
            loop
            playsinline
            preload="auto"
          />
        </div>

        <!-- Botón WhatsApp -->
        <a
          href="https://wa.me/573004311280"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center rounded-full px-18 py-3 text-white text-sm font-semibold
                bg-gradient-to-b from-[#509637] to-[#1A3012] hover:opacity-90 transition text-center md:text-left"
        >
          Chatear por WhatsApp
        </a>
      </div>


      <!-- Columna derecha: Carrusel productos -->
      <div class="relative">
        <!-- Controles -->

        <!-- Wrapper scroll -->
        <div
          ref="wrapRef"
          class="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none"
          @mouseenter="pause"
          @mouseleave="play"
          @touchstart.passive="pause"
          @touchend.passive="play"
        >
          <!-- Track -->
          <div ref="trackRef" class="flex gap-6 items-stretch px-1 py-2">
            <!-- Duplicamos para efecto infinito -->
            <article
              v-for="(p, idx) in duplicated"
              :key="`card-${idx}`"
              class="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[46%] lg:w-[31%] xl:w-[30%]"
            >
              <div class="h-full rounded-2xl border border-gray-200 bg-white shadow-xl shadow-green-800/100 p-4 flex flex-col">

                <div class="aspect-square w-full rounded-xl overflow-hidden bg-gray-50">
                  <img
                    :src="p.img"
                    :alt="p.nombre"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="mt-4 flex-1 flex flex-col">
                  <h3 class="font-bold text-gray-900">{{ p.nombre }}</h3>
                  <p class="text-sm text-gray-600 mt-1">{{ p.descripcion }}</p>
                  <div class="mt-auto pt-4 flex items-center justify-between">
                    <span class="font-semibold text-gray-900">{{ p.precio }}</span>
                    <a
                      :href="`https://wa.me/573004311280?text=${encodeURIComponent(`Hola, me interesa ${p.nombre}`)}`"
                      target="_blank"
                      rel="noopener"
                      class="text-[#2BB741] hover:underline text-sm font-semibold"
                    >Comprar</a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Indicadores (opcional simple) -->
        <div class="mt-4 flex gap-2 justify-center">
          <span
            v-for="i in 3"
            :key="`dot-${i}`"
            class="w-2.5 h-2.5 rounded-full"
            :class="activeDot === i ? 'bg-gray-900' : 'bg-gray-300'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

// Carga robusta de assets para GitHub Pages (evita rutas rotas)
const heroVideo = new URL('../assets/Hero_video_16_9.mp4', import.meta.url).href

// ⬇️ NUEVO: Importa productos desde JSON
// Estructura recomendada del JSON al final.
import productosData from '../data/productos_hero.json'

// Resolver ruta de imagen:
// - Si es URL absoluta (http/https) la deja tal cual.
// - Si es un nombre/relativo, lo busca en /src/assets usando new URL(..., import.meta.url)
function resolveImg(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  // Limpia posibles prefijos tipo /src/assets/ o src/assets/
  const cleaned = path.replace(/^\/?src\//, '').replace(/^assets\//, '')
  try {
    return new URL(`../assets/${cleaned}`, import.meta.url).href
  } catch {
    return path
  }
}

// Productos provenientes del JSON
const productos = productosData.map(p => ({
  ...p,
  img: resolveImg(p.img),
}))

// Duplicamos el arreglo para simular carrusel infinito
const duplicated = computed(() => [...productos, ...productos])

const wrapRef = ref(null)
const trackRef = ref(null)

let timer = null
const CARD_GAP = 24 // gap-6
const STEP_MS = 2800

// Avance por “card” completa
function next () {
  const wrap = wrapRef.value
  if (!wrap) return
  const card = wrap.querySelector('article')
  if (!card) return
  const step = card.clientWidth + CARD_GAP
  wrap.scrollBy({ left: step, behavior: 'smooth' })
  fixLoop()
}

function prev () {
  const wrap = wrapRef.value
  if (!wrap) return
  const card = wrap.querySelector('article')
  if (!card) return
  const step = card.clientWidth + CARD_GAP
  wrap.scrollBy({ left: -step, behavior: 'smooth' })
  fixLoop(true)
}

function fixLoop (isPrev = false) {
  // Si llegamos muy al final o al principio, reposicionamos sin “salto” visual
  const wrap = wrapRef.value
  const track = trackRef.value
  if (!wrap || !track) return
  const maxScroll = track.scrollWidth - wrap.clientWidth

  // margen de tolerancia
  const pad = 8

  // Al final: volvemos al inicio equivalente
  if (wrap.scrollLeft + pad >= maxScroll) {
    wrap.scrollLeft = 0
  }

  // Al principio (si usamos prev): saltamos al espejo del final
  if (isPrev && wrap.scrollLeft <= 0) {
    wrap.scrollLeft = maxScroll - 1
  }
}

function play () {
  if (timer) return
  timer = setInterval(next, STEP_MS)
}

function pause () {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// Dots “aproximados”: 3 grupos
const activeDot = ref(1)
function updateDot () {
  const wrap = wrapRef.value
  const track = trackRef.value
  if (!wrap || !track) return
  const max = track.scrollWidth - wrap.clientWidth
  if (max <= 0) { activeDot.value = 1; return }
  const ratio = wrap.scrollLeft / max
  if (ratio < 0.34) activeDot.value = 1
  else if (ratio < 0.67) activeDot.value = 2
  else activeDot.value = 3
}

onMounted(() => {
  wrapRef.value?.addEventListener('scroll', updateDot, { passive: true })
  play()
})

onBeforeUnmount(() => {
  pause()
  wrapRef.value?.removeEventListener('scroll', updateDot)
})
</script>
