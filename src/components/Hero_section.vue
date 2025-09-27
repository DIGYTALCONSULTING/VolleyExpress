<template>
  <div class="flex flex-col md:flex-row w-full">
    <!-- Div izquierdo -->
    <div class="w-full flex flex-col items-center gap-20">
      <!-- Contenedor único: centra vertical y horizontal -->
      <div class="my-8 md:my-16 flex flex-col items-center mx-auto md:mx-0 md:ml-28">
        <!-- Grupo centrado (video + botón) -->
        <div class="">
          <video
            autoplay
            muted
            loop
            playsinline
            src="../assets/Hero_video_16_9.mp4"
            class="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover z-10
                   animate__animated animate__lightSpeedInRight"
          ></video>

          <!-- Mismo botón que tenías, ahora debajo del video -->
          <a href="https://wa.me/573004311280" target="_blank" class="block w-full text-center sm:w-auto">
            <button
              class="bg-gradient-to-b from-[#509637] to-[#1A3012] text-white cursor-pointer
                     rounded-full my-28 px-8 py-2 inline-flex flex-col items-center gap-0.5"
            >
              <span class="font-bold">Contáctanos</span>
              <span class="font-bold">WhatsApp</span>
            </button>
          </a>
        </div>
      </div>
    </div>

    <!-- Div General -->
    <div class="flex flex-col w-full gap-2 items-center px-4 md:px-8 lg:px-16 py-4 md:py-10 ml-8 md:ml-12 lg:ml-20">
      <!-- Carrusel (viewport con fade) -->
      <div
        ref="carouselRef"
        class="w-full overflow-hidden relative edge-fade
               pl-4 md:pl-8 lg:pl-12
               pr-4 md:pr-8 lg:pr-12
               [scroll-padding-left:1rem] md:[scroll-padding-left:2rem] lg:[scroll-padding-left:3rem]
               border-0 outline-none ring-0 shadow-none rounded-none bg-transparent"
        @mouseenter="pause()"
        @mouseleave="play()"
        @touchstart.passive="pause()"
        @touchend.passive="play()"
      >
        <!-- Pista -->
        <div
          ref="trackRef"
          class="flex gap-4 py-4 items-stretch snap-x snap-mandatory scroll-smooth overflow-x-auto
                 scrollbar-none md:scrollbar-none"
        >
          <!-- Spacer inicial para simetría -->
          <div class="shrink-0 w-2 sm:w-4 md:w-6 lg:w-8"></div>

          <!-- Slide (tarjeta) -->
          <div
            v-for="p in productos"
            :key="p.id"
            class="snap-start shrink-0 w-[85%] sm:w-1/2 md:w-1/3"
          >
            <div
              class="mx-auto h-full max-w-xs bg-white rounded-3xl overflow-hidden text-center p-4
                     drop-shadow-[10px_10px_25px_rgba(80,150,55,0.6)]"
            >
              <img
                :src="p.imagen"
                :alt="p.nombre"
                class="mx-auto w-40 h-40 object-contain"
              />
              <h3 class="mt-4 text-lg font-bold text-gray-800">
                {{ p.nombre }}
              </h3>
              <p class="text-sm text-gray-600 mt-1 line-clamp-2">
                {{ p.descripcion }}
              </p>
              <p class="text-base font-semibold text-gray-900 mt-2">
                {{ p.precio }}
              </p>
            </div>
          </div>

          <!-- Spacer final para simetría -->
          <div class="shrink-0 w-2 sm:w-4 md:w-6 lg:w-8"></div>
        </div>
      </div>

      <!-- Botón -->
      <div class="mb-6 w-full flex justify-center">
        <a href="https://wa.me/573004311280" target="_blank" class="block w-full text-center sm:w-auto">
          <button
            class="bg-gradient-to-b from-[#509637] to-[#1A3012] text-white cursor-pointer rounded-full px-8 py-2 inline-flex flex-col items-center gap-0.5"
          >
            <span class="font-bold">Contáctanos</span>
            <span class="font-bold">WhatsApp</span>
          </button>
        </a>
      </div>

      <!-- Sección categorías (sin cambios) -->
      <div class="flex flex-row items-center gap-4 md:gap-12 flex-wrap justify-center md:flex-nowrap">
        <div class="w-full sm:w-auto flex justify-center">
          <a href="#Implementos_Deportivos" target="_blank" class="block w-full text-center sm:w-auto">
            <button
              class="bg-gradient-to-b from-[#212121] to-[#878787] text-[#7ED321] cursor-pointer rounded-xl px-8 py-6 inline-flex flex-col items-center gap-0.5"
            >
              <span class="font-bold">IMPLEMENTOS</span>
              <span class="font-bold">DEPORTIVOS</span>
            </button>
          </a>
        </div>

        <div class="w-full sm:w-auto flex justify-center">
          <a href="#Accesorios" target="_blank" class="block w-full text-center sm:w-auto">
            <button
              class="bg-gradient-to-b from-[#212121] to-[#878787] text-[#7ED321] cursor-pointer rounded-xl px-8 py-6 inline-flex flex-col items-center gap-0.5"
            >
              <span class="font-bold">ACCESORIOS</span>
              <span class="font-bold">DEPORTIVOS</span>
            </button>
          </a>
        </div>

        <div class="w-full sm:w-auto flex justify-center">
          <a href="#Peluches" target="_blank" class="block w-full text-center sm:w-auto">
            <button
              class="bg-gradient-to-b from-[#212121] to-[#878787] text-[#7ED321] cursor-pointer rounded-xl px-8 py-6 inline-flex flex-col items-center gap-0.5"
            >
              <span class="font-bold">BALONES</span>
              <span class="font-bold">DE PELUCHE</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import productos from '../data/productos_hero.json'

const carouselRef = ref(null)
const trackRef = ref(null)
let timer = null

const AUTOPLAY_MS = 3500

const play = () => {
  stop()
  timer = setInterval(() => {
    next()
  }, AUTOPLAY_MS)
}

const pause = () => {
  stop()
}

const stop = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const next = () => {
  const el = trackRef.value
  const wrap = carouselRef.value
  if (!el || !wrap) return

  const step = wrap.clientWidth // desplazamiento por "pantalla"
  const maxScroll = el.scrollWidth - wrap.clientWidth
  const nextLeft = Math.min(el.scrollLeft + step, maxScroll)

  if (el.scrollLeft >= maxScroll - 5) {
    // Reinicia al inicio
    el.scrollTo({ left: 0, behavior: 'smooth' })
  } else {
    el.scrollTo({ left: nextLeft, behavior: 'smooth' })
  }
}

const prev = () => {
  const el = trackRef.value
  const wrap = carouselRef.value
  if (!el || !wrap) return
  const step = wrap.clientWidth
  const prevLeft = Math.max(el.scrollLeft - step, 0)
  el.scrollTo({ left: prevLeft, behavior: 'smooth' })
}

onMounted(() => {
  play()
  // Recalcula al cambiar el tamaño (evita saltos de snap)
  const onResize = () => {
    const el = trackRef.value
    if (!el) return
    const current = el.scrollLeft
    el.scrollTo({ left: current + 1 })
    requestAnimationFrame(() => el.scrollTo({ left: current }))

    // Nota: no detenemos el autoplay aquí
  }
  window.addEventListener('resize', onResize)
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
})

onBeforeUnmount(() => {
  stop()
})
</script>

<style scoped>
/* Fade lateral del carrusel sin tocar tarjetas ni fondo */
.edge-fade {
  --fade: 24px; /* mobile */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 var(--fade),
    #000 calc(100% - var(--fade)),
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 var(--fade),
    #000 calc(100% - var(--fade)),
    transparent 100%
  );
}
@media (min-width: 768px) { /* md */
  .edge-fade { --fade: 32px; }
}
@media (min-width: 1024px) { /* lg */
  .edge-fade { --fade: 48px; }
}

/* Oculta scrollbar en navegadores comunes sin romper accesibilidad */
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>
