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
            class="bg-white rounded-4xl shadow-2xl overflow-hidden p-2 drop-shadow-[10px_10px_25px_rgba(80,150,55,0.6)] h-full"
          >
            <img
              :src="producto.imagen"
              :alt="producto.nombre"
              class="w-full h-48 object-contain"
              loading="lazy"
            />
            <div class="p-4">
              <h3 class="text-2xl text-center font-bold mb-2">{{ producto.nombre }}</h3>
              <p class="text-gray-900 mb-4">{{ producto.descripcion }}</p>
              <p class="text-gray-900 font-bold text-center text-2xl mb-6">{{ producto.precio }}</p>

              <a
                :href="`https://api.whatsapp.com/send?phone=573004311280&text=${encodeURIComponent('Hola, estoy interesado en el producto ' + producto.nombre)}`"
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
        <!-- Duplicamos la lista para loop infinito -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import productos from '../data/productos.json'

/**
 * Duplicamos los items para loop infinito sin “salto”.
 */
const productosDuplicados = computed(() => [...productos, ...productos])

const wrapRef = ref(null)
const trackRef = ref(null)

let timer = null
let animRaf = null
let running = true

// Config
const STEP_INTERVAL_MS = 2500  // cada cuánto avanzamos
const ANIM_DURATION_MS = 600   // duración de la animación del “salto”
const GAP_PX = 24              // gap-6 = 1.5rem ≈ 24px en Tailwind por defecto

/**
 * Calcula el ancho de una tarjeta (incluyendo el gap) y cuántas caben por vista.
 * Máximo 4 por requerimiento.
 */
const getMetrics = () => {
  const wrap = wrapRef.value
  const track = trackRef.value
  if (!wrap || !track) return { cardStep: 0, perView: 1, half: 0 }

  const firstCard = track.children?.[0]
  if (!firstCard) return { cardStep: 0, perView: 1, half: 0 }

  const cardWidth = firstCard.offsetWidth
  // El “paso” mínimo por tarjeta incluye el gap horizontal
  const cardStep = cardWidth + GAP_PX

  const perView = Math.max(1, Math.min(4, Math.floor((wrap.clientWidth + GAP_PX) / cardStep)))
  const half = track.scrollWidth / 2

  return { cardStep, perView, half }
}

/**
 * Animación suave con requestAnimationFrame
 */
const animateTo = (targetLeft) => {
  const wrap = wrapRef.value
  if (!wrap) return

  const startLeft = wrap.scrollLeft
  const delta = targetLeft - startLeft
  const startTime = performance.now()

  const tick = (now) => {
    const t = Math.min(1, (now - startTime) / ANIM_DURATION_MS)
    // easeInOutCubic
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

/**
 * Avanza de a “grupos” de tarjetas (hasta 4 según ancho).
 */
const stepNext = () => {
  const wrap = wrapRef.value
  const track = trackRef.value
  if (!wrap || !track) return

  const { cardStep, perView, half } = getMetrics()
  if (!cardStep || !half) return

  // Próximo objetivo
  let target = wrap.scrollLeft + cardStep * perView

  // Si nos pasamos de la primera mitad (porque está duplicado), reubicamos
  if (target >= half) {
    // Mantener la posición relativa:
    target = target - half
    wrap.scrollLeft = wrap.scrollLeft - half
  }

  animateTo(target)
}

/**
 * Control del autoplay
 */
const startAuto = () => {
  if (timer) return
  timer = setInterval(() => {
    if (!running) return
    stepNext()
  }, STEP_INTERVAL_MS)
}

const stopAuto = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

/**
 * Expuestos a los eventos del template
 */
const play = () => {
  if (running) return
  running = true
  startAuto()
}

const pause = () => {
  running = false
  stopAuto()
  if (animRaf) {
    cancelAnimationFrame(animRaf)
    animRaf = null
  }
}

/**
 * Recalcular al montar y al redimensionar para que el “grupo” coincida visualmente.
 */
const handleResize = () => {
  // Ajuste fino para que el snap no quede “a medias” al cambiar el viewport:
  const wrap = wrapRef.value
  if (!wrap) return
  // Realineamos al múltiplo más cercano del paso*perView
  const { cardStep, perView, half } = getMetrics()
  if (!cardStep || !half) return
  const group = cardStep * perView
  const current = wrap.scrollLeft % half
  const aligned = Math.round(current / group) * group
  wrap.scrollLeft = aligned
}

onMounted(() => {
  // Inicia autoplay
  running = true
  startAuto()
  // Ajustes responsivos
  window.addEventListener('resize', handleResize, { passive: true })
  // Primer alineado
  handleResize()
})

onBeforeUnmount(() => {
  pause()
  window.removeEventListener('resize', handleResize)
})
</script>
