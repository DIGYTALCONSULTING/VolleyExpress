<template>
  <section class="w-full" id="top" aria-labelledby="hero-title">
    <div
      class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      <!-- Columna izquierda: Video + Copy + CTA -->
      <div class="flex flex-col items-center md:items-start gap-8 md:ml-32 max-w-lg">
        <!-- H1 SEO (local Medellín) -->
        <h1 id="hero-title" class="sr-only">
          Implementos de voleibol en Medellín: balones, accesorios y equipamiento profesional | Volley Expres Shop
        </h1>

        <!-- Copy visible -->
        <div class="text-center md:text-left">
          <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900">
            Implementos de voleibol en Medellín
          </h2>
          <p class="mt-2 text-gray-700 text-justify">
            Balones, accesorios y equipamiento para entrenamiento y competencia. Atención rápida por WhatsApp y envío a todo el país.
          </p>
        </div>

        <!-- Video redondo -->
        <div class="w-56 h-56 md:w-72 md:h-72 max-w-md rounded-full overflow-hidden shadow-xl">
          <video
            :src="heroVideo"
            class="w-full h-full object-cover"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          />
        </div>

        <!-- Botón WhatsApp -->
        <a
          :href="waGeneral"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center rounded-full px-10 py-3 text-white text-sm font-semibold
                bg-gradient-to-b from-[#509637] to-[#1A3012] hover:opacity-90 transition text-center md:text-left"
          aria-label="Comprar implementos de voleibol en Medellín por WhatsApp"
        >
          Comprar por WhatsApp (Medellín)
        </a>
      </div>

      <!-- Columna derecha: Carrusel productos -->
      <div class="relative" aria-label="Productos destacados">
        <div
          ref="wrapRef"
          class="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none"
          @mouseenter="pause"
          @mouseleave="play"
          @touchstart.passive="pause"
          @touchend.passive="play"
        >
          <div ref="trackRef" class="flex gap-6 items-stretch px-1 py-2">
            <article
              v-for="(p, idx) in duplicated"
              :key="`card-${idx}`"
              class="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[46%] lg:w-[31%] xl:w-[30%]"
            >
              <div
                class="h-full rounded-2xl border border-gray-200 bg-white shadow-xl shadow-green-800/100 p-4 flex flex-col"
              >
                <span class="inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">
                  Destacado
                </span>

                <div class="mt-3 aspect-square w-full rounded-xl overflow-hidden bg-gray-50">
                  <img
                    :src="p.imgFinal"
                    :alt="`${p.nombre} - implementos de voleibol en Medellín`"
                    class="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    @error="onImgError(p)"
                  />
                </div>

                <div class="mt-4 flex-1 flex flex-col">
                  <h3 class="font-bold text-gray-900">
                    {{ p.nombre }}
                  </h3>

                  <p class="text-sm text-gray-600 mt-1">
                    {{ p.descripcion }}
                  </p>

                  <div class="mt-auto pt-4 flex items-center justify-between">
                    <span class="font-semibold text-gray-900">
                      {{ p.precio }}
                    </span>

                    <a
                      :href="waProducto(p.nombre)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-[#2BB741] hover:underline text-sm font-semibold"
                      :aria-label="`Comprar ${p.nombre} por WhatsApp en Medellín`"
                    >
                      Comprar
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Indicadores -->
        <div class="mt-4 flex gap-2 justify-center" aria-label="Indicadores del carrusel">
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
import productosData from '../data/productos_hero.json'

// Video
const heroVideo = new URL('../assets/Hero_video_16_9.mp4', import.meta.url).href

// WhatsApp
const WA_NUMBER = '573004311280'
const waGeneral = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  'Hola, estoy en Medellín. Quiero cotizar implementos de voleibol (balones, accesorios y equipamiento).'
)}`
const waProducto = (nombre) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hola, estoy en Medellín. Me interesa ${nombre}. ¿Disponibilidad y precio, por favor?`
  )}`

// ✅ Resolvedor: soporta /img/... (public) y también src/assets si algún día lo usas
function resolveImgSmart(p) {
  const candidate = (p.imagen || p.img || '').trim()
  if (!candidate) return ''

  // 1) Public (Vite): /img/...  -> se sirve tal cual
  if (candidate.startsWith('/')) return candidate

  // 2) URL absoluta
  if (/^https?:\/\//i.test(candidate)) return candidate

  // 3) Fallback: tratar como asset relativo (por si vuelves a usar /src/assets/...)
  const cleaned = candidate
    .replace(/^\/?src\//, '')
    .replace(/^\/?assets\//, '')

  try {
    return new URL(`../assets/${cleaned}`, import.meta.url).href
  } catch {
    return candidate
  }
}

// Normalización final
const productos = (productosData ?? []).map(p => ({
  ...p,
  nombre: p.nombre ?? 'Producto destacado',
  descripcion: p.descripcion ?? '',
  precio: p.precio ?? '',
  imgFinal: resolveImgSmart(p),
}))

const duplicated = computed(() => [...productos, ...productos])

// Debug de error de imagen (solo consola)
function onImgError(p) {
  console.log('❌ IMG ERROR:', { nombre: p.nombre, imagen: p.imagen, img: p.img, imgFinal: p.imgFinal })
}

const wrapRef = ref(null)
const trackRef = ref(null)

let timer = null
const CARD_GAP = 24
const STEP_MS = 2800

function next() {
  const wrap = wrapRef.value
  if (!wrap) return
  const card = wrap.querySelector('article')
  if (!card) return
  const step = card.clientWidth + CARD_GAP
  wrap.scrollBy({ left: step, behavior: 'smooth' })
  fixLoop()
}

function fixLoop(isPrev = false) {
  const wrap = wrapRef.value
  const track = trackRef.value
  if (!wrap || !track) return
  const maxScroll = track.scrollWidth - wrap.clientWidth
  const pad = 8
  if (wrap.scrollLeft + pad >= maxScroll) wrap.scrollLeft = 0
  if (isPrev && wrap.scrollLeft <= 0) wrap.scrollLeft = Math.max(maxScroll - 1, 0)
}

function play() {
  if (timer) return
  timer = setInterval(next, STEP_MS)
}

function pause() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const activeDot = ref(1)
function updateDot() {
  const wrap = wrapRef.value
  const track = trackRef.value
  if (!wrap || !track) return
  const max = track.scrollWidth - wrap.clientWidth
  if (max <= 0) return (activeDot.value = 1)
  const ratio = wrap.scrollLeft / max
  activeDot.value = ratio < 0.34 ? 1 : ratio < 0.67 ? 2 : 3
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
