<template>
  <section
    id="Accesorios"
    class="w-full"
    aria-labelledby="accesorios-title"
  >
    <header class="w-full text-left py-2 px-2">
      <!-- H2 SEO correcto (NO h1) -->
      <h2
        id="accesorios-title"
        class="text-2xl font-bold"
      >
        Accesorios de Voleibol Esenciales
      </h2>

      <!-- Copy SEO invisible -->
      <p class="sr-only">
        Accesorios de voleibol diseñados para complementar el entrenamiento y la competencia.
        Productos deportivos funcionales con envío en Colombia.
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
      aria-label="Carrusel de accesorios de voleibol"
    >
      <div ref="trackRef" class="flex gap-6 items-stretch">
        <article
          v-for="(accesorio, index) in accesoriosDuplicados"
          :key="index"
          class="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-1/4"
        >
          <div
            class="bg-white rounded-4xl shadow-2xl overflow-hidden p-2 h-full drop-shadow-[10px_10px_25px_rgba(80,150,55,0.6)] flex flex-col"
          >
            <figure class="w-full h-48 flex items-center justify-center">
              <img
                :src="accesorio.imagen"
                :alt="`Accesorio de voleibol ${accesorio.referencia} para entrenamiento y uso deportivo`"
                class="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <figcaption class="sr-only">
                {{ accesorio.referencia }}
              </figcaption>
            </figure>

            <div class="p-4 flex flex-col flex-1">
              <h3
                class="text-xl sm:text-2xl text-center font-bold mb-2 min-h-[56px] flex items-center justify-center text-balance"
              >
                {{ accesorio.referencia }}
              </h3>

              <p class="text-gray-900 mb-4 text-sm sm:text-base text-justify line-clamp-3">
                {{ accesorio.descripcion }}
              </p>

              <p class="text-gray-900 font-bold text-center text-2xl mb-4 min-h-[40px] flex items-center justify-center">
                {{ accesorio.precio }}
              </p>

              <div class="grid grid-cols-2 gap-2 text-xs mb-4">
                <div class="bg-gray-100 rounded-lg p-2 text-center">
                  <span class="block font-bold">Talla</span>
                  <span>{{ accesorio.size || 'N/A' }}</span>
                </div>
                <div class="bg-gray-100 rounded-lg p-2 text-center">
                  <span class="block font-bold">Material</span>
                  <span>{{ accesorio.material || 'N/A' }}</span>
                </div>
              </div>

              <a
                :href="`https://api.whatsapp.com/send?phone=573004311280&text=${encodeURIComponent(
                  'Hola, estoy interesado en el accesorio de voleibol: ' + accesorio.referencia
                )}`"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center mt-auto"
                aria-label="Comprar accesorio de voleibol por WhatsApp"
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
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import accesoriosData from '../data/accesorios.json'

const items = computed(() =>
  (accesoriosData ?? []).map(a => ({
    referencia: a.referencia ?? 'Accesorio',
    descripcion: a.descripcion ?? '',
    precio: a.precio ?? '',
    imagen: a.imagen || '',
    size: a.size ?? '',
    material: a.material ?? ''
  }))
)

const accesoriosDuplicados = computed(() => [...items.value, ...items.value])

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
