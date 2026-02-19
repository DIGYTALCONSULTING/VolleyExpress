<template>
  <section
    id="Peluches"
    class="w-full"
    aria-labelledby="peluches-title"
  >
    <header class="w-full text-left py-4 px-8">
      <!-- H2 SEO correcto -->
      <h2
        id="peluches-title"
        class="text-2xl font-bold"
      >
        Peluches de Voleibol y Regalos Deportivos
      </h2>

      <!-- Copy SEO invisible -->
      <p class="sr-only">
        Peluches de voleibol ideales como regalos deportivos, detalles especiales
        y productos emocionales para fanáticos del voleibol en Colombia.
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
      aria-label="Carrusel de peluches de voleibol"
    >
      <div ref="trackRef" class="flex gap-6 items-stretch">
        <article
          v-for="(peluche, index) in peluchesDuplicados"
          :key="index"
          class="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-1/4"
        >
          <div
            class="rounded-4xl shadow-2xl overflow-hidden p-2 h-full drop-shadow-[10px_10px_25px_rgba(80,150,55,0.6)] flex flex-col"
          >
            <figure class="w-full h-48 flex items-center justify-center">
              <img
                :src="peluche.imagen"
                :alt="`Peluche de voleibol ${peluche.nombre}, ideal como regalo deportivo`"
                class="w-full h-full object-contain transition-transform duration-300 hover:scale-150"
                loading="lazy"
              />
              <figcaption class="sr-only">
                {{ peluche.nombre }}
              </figcaption>
            </figure>

            <div class="p-4 flex flex-col h-full">
              <h3
                class="text-2xl text-center font-bold mb-2 min-h-[56px] flex items-center justify-center text-balance"
              >
                {{ peluche.nombre }}
              </h3>

              <p class="text-gray-900 mb-4 min-h-[64px] text-justify">
                {{ peluche.descripcion }}
              </p>

              <p
                class="text-gray-900 font-bold text-center text-2xl mb-4 min-h-[40px] flex items-center justify-center"
              >
                {{ peluche.precio }}
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
                :href="`https://api.whatsapp.com/send?phone=573004311280&text=${encodeURIComponent(
                  'Hola, estoy interesado en el peluche de voleibol ' + peluche.nombre
                )}`"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center mt-auto"
                aria-label="Comprar peluche de voleibol por WhatsApp"
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
import peluchesData from '../data/peluches.json'

const items = computed(() =>
  (peluchesData ?? []).map(p => ({
    nombre: p.nombre ?? p.referencia ?? 'Peluche',
    descripcion: p.descripcion ?? '',
    precio: p.precio ?? '',
    imagen: p.imagen || p.img || '',
    size: p.size ?? null,
    material: p.material ?? null
  }))
)

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
