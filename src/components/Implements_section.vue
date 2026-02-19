<template>
  <section
    id="Implementos_Deportivos"
    class="w-full"
    aria-labelledby="implementos-title"
  >
    <header class="w-full text-left py-4 px-4">
      <!-- H2 SEO optimizado -->
      <h2
        id="implementos-title"
        class="text-2xl font-bold"
      >
        Implementos de Voleibol Profesionales
      </h2>

      <!-- Copy SEO invisible (NO afecta UI) -->
      <p class="sr-only">
        Compra implementos de voleibol profesionales para entrenamiento y competencia.
        Catálogo de productos deportivos especializados con envío en Colombia.
      </p>
    </header>

    <div
      ref="wrapRef"
      class="w-full p-1 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
      @mouseenter="pause"
      @mouseleave="play"
      @touchstart.passive="pause"
      @touchend.passive="play"
      role="region"
      aria-label="Carrusel de implementos de voleibol"
    >
      <div ref="trackRef" class="flex gap-6 items-stretch pl-6 sm:pl-8 lg:pl-12">
        <article
          v-for="(producto, index) in productosDuplicados"
          :key="index"
          class="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-1/4"
          itemscope
          itemtype="https://schema.org/Product"
        >
          <div
            class="bg-white rounded-4xl shadow-2xl overflow-hidden p-2 drop-shadow-[10px_10px_25px_rgba(80,150,55,0.6)] h-full min-h-[480px] lg:min-h-[440px] flex flex-col"
          >
            <figure class="w-full h-44 lg:h-36 flex items-center justify-center">
              <img
                :src="producto.imagen"
                :alt="`Implemento de voleibol ${producto.referencia} para entrenamiento y competencia`"
                class="w-full h-full object-contain rounded-xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-150"
                loading="lazy"
                itemprop="image"
              />
              <figcaption class="sr-only">
                {{ producto.referencia }}
              </figcaption>
            </figure>

            <div class="p-4 flex flex-col flex-1">
              <h3
                class="text-lg sm:text-xl lg:text-2xl text-center font-bold mb-2 min-h-[56px] flex items-center justify-center"
                itemprop="name"
              >
                {{ producto.referencia }}
              </h3>

              <div
                class="text-gray-900 mb-4 text-sm sm:text-base text-justify"
                itemprop="description"
              >
                <p :class="expanded[index] ? '' : 'max-h-[4.5rem] overflow-hidden'">
                  {{ producto.descripcion }}
                </p>

                <button
                  v-if="producto.descripcion.length > 120"
                  @click="toggle(index)"
                  class="mt-1 text-sm font-bold underline"
                  :aria-expanded="expanded[index] ? 'true' : 'false'"
                >
                  {{ expanded[index] ? 'Ver menos' : 'Ver más' }}
                </button>
              </div>

              <p
                class="text-gray-900 font-bold text-center text-xl sm:text-2xl mb-4 min-h-[40px] flex items-center justify-center"
                itemprop="offers"
                itemscope
                itemtype="https://schema.org/Offer"
              >
                <span itemprop="priceCurrency" content="COP">COP</span>
                <span itemprop="price">{{ producto.precio }}</span>
              </p>

              <div class="grid grid-cols-2 gap-2 text-sm mb-4">
                <div class="flex flex-col text-center bg-gray-100 rounded-xl py-2">
                  <span class="font-bold">Color</span>
                  <span>{{ producto.color }}</span>
                </div>

                <div class="flex flex-col text-center bg-gray-100 rounded-xl py-2">
                  <span class="font-bold">Talla</span>
                  <span>{{ producto.size }}</span>
                </div>

                <div class="flex flex-col text-center bg-gray-100 rounded-xl py-2">
                  <span class="font-bold">Material</span>
                  <span>{{ producto.material }}</span>
                </div>

                <div class="flex flex-col text-center bg-gray-100 rounded-xl py-2">
                  <span class="font-bold">Uso</span>
                  <span>{{ producto.uso }}</span>
                </div>
              </div>

              <a
                :href="`https://api.whatsapp.com/send?phone=573004311280&text=${encodeURIComponent(
                  'Hola, estoy interesado en el implemento de voleibol ' + producto.referencia
                )}`"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full mt-auto"
                aria-label="Comprar implemento de voleibol por WhatsApp"
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
import productosData from '../data/productos.json'

const items = computed(() =>
  (productosData ?? []).map(p => ({
    ...p,
    imagen: p.imagen || p.img || '',
    descripcion: p.descripcion ?? '',
    precio: p.precio ?? '',
    referencia: p.referencia ?? 'Producto',
    color: p.color ?? 'N/A',
    size: p.size ?? 'N/A',
    material: p.material ?? 'N/A',
    uso: p.uso ?? 'N/A'
  }))
)

const productosDuplicados = computed(() => [...items.value, ...items.value])

const expanded = ref({})
const toggle = index => (expanded.value[index] = !expanded.value[index])

const wrapRef = ref(null)
let timer = null
const STEP_INTERVAL_MS = 2500

const stepNext = () => {
  const wrap = wrapRef.value
  if (!wrap) return
  if (wrap.scrollLeft + wrap.clientWidth >= wrap.scrollWidth) {
    wrap.scrollLeft = 0
  } else {
    wrap.scrollLeft += wrap.clientWidth
  }
}

const startAuto = () => {
  if (!timer) timer = setInterval(stepNext, STEP_INTERVAL_MS)
}
const stopAuto = () => {
  clearInterval(timer)
  timer = null
}

const play = () => startAuto()
const pause = () => stopAuto()

onMounted(startAuto)
onBeforeUnmount(pause)
</script>
