<template>
  <section
    id="Implementos_Deportivos"
    class="w-full scroll-mt-24"
    aria-labelledby="implementos-title"
  >
    <header class="w-full text-left py-4 px-4">
      <!-- H2 SEO optimizado (local) -->
      <h2 id="implementos-title" class="text-2xl font-bold">
        Implementos de Voleibol Profesionales en Medellín
      </h2>

      <!-- Copy visible corto (mejora SEO + conversión sin cambiar layout) -->
      <p class="mt-2 text-gray-700 max-w-3xl text-justify">
        Balones, rodilleras, mangas y accesorios para entrenamiento y competencia. Atención rápida por WhatsApp y entrega en Medellín y Área Metropolitana.
      </p>

      <!-- Copy SEO adicional -->
      <p class="sr-only">
        Compra implementos de voleibol en Medellín: balones, rodilleras, mangas, infladores y accesorios. Volley Expres Shop con atención por WhatsApp.
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
      aria-label="Carrusel de implementos de voleibol en Medellín"
    >
      <div ref="trackRef" class="flex gap-6 items-stretch pl-6 sm:pl-8 lg:pl-12">
        <article
          v-for="(producto, index) in productosDuplicados"
          :key="`${producto.referencia}-${index}`"
          class="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-1/4"
          itemscope
          itemtype="https://schema.org/Product"
        >
          <!-- URL del producto (en SPA será la misma página con ancla; ayuda al Offer) -->
          <meta itemprop="url" :content="pageUrlWithAnchor" />

          <div
            class="bg-white rounded-4xl shadow-2xl overflow-hidden p-2 drop-shadow-[10px_10px_25px_rgba(80,150,55,0.6)] h-full min-h-[480px] lg:min-h-[440px] flex flex-col"
          >
            <figure
              :class="[
                'w-full h-44 lg:h-36 flex items-center justify-center rounded-xl',
                isMediasSemiProfesionales(producto) ? 'bg-zinc-200' : ''
              ]"
            >
              <img
                :src="producto.imagen"
                :alt="altText(producto)"
                :class="[
                  'w-full h-full object-contain rounded-xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-125',
                  implementImageScaleClass(producto)
                ]"
                loading="lazy"
                decoding="async"
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
                class="text-gray-900 mb-4 text-sm sm:text-base text-left sm:text-justify leading-6"
                itemprop="description"
              >
                <p :id="`desc-${index}`" :class="expanded[index] ? '' : 'line-clamp-3'">
                  {{ producto.descripcion }}
                </p>

                <button
                  v-if="(producto.descripcion || '').length > 120"
                  type="button"
                  @click="toggle(index)"
                  class="mt-1 text-sm font-bold underline"
                  :aria-expanded="expanded[index] ? 'true' : 'false'"
                  :aria-controls="`desc-${index}`"
                >
                  {{ expanded[index] ? 'Ver menos' : 'Ver más' }}
                </button>
              </div>

              <!-- Offer schema mejor formado: price numérico en meta -->
              <p
                class="text-gray-900 font-bold text-center text-xl sm:text-2xl mb-4 min-h-[40px] flex items-center justify-center"
                itemprop="offers"
                itemscope
                itemtype="https://schema.org/Offer"
                aria-label="Precio"
              >
                <meta itemprop="priceCurrency" content="COP" />
                <meta itemprop="price" :content="producto.precioNumero" />
                <link itemprop="availability" href="https://schema.org/InStock" />
                <span>{{ producto.precioLabel }}</span>
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
                :href="waLink(producto.referencia)"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full mt-auto"
                :aria-label="`Comprar ${producto.referencia} por WhatsApp en Medellín`"
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
import productosData from '../data/productos.json'

const WA_NUMBER = '573004311280'

/**
 * Para schema Offer: el `price` debe ser numérico (Google ignora "$170.000").
 */
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

/**
 * Tus imágenes están en /public => se sirven desde raíz.
 * Esto evita errores por //, /public/, espacios o .Webp
 */
function normalizePublicPath(path) {
  if (!path) return ''
  let s = String(path).trim()

  if (/^(https?:)?\/\//i.test(s) || /^data:/i.test(s) || /^blob:/i.test(s)) return s

  s = s.replace(/^\/?public\//, '/')
  if (!s.startsWith('/')) s = `/${s}`

  // colapsa dobles slashes
  s = s.replace(/\/{2,}/g, '/')

  // normaliza extensión webp
  s = s.replace(/\.webp$/i, '.webp')

  // evita URLs inválidas si aún hay espacios (ideal: no tenerlos)
  return encodeURI(s)
}

/**
 * WhatsApp con intención local Medellín + producto
 */
function waLink(nombre) {
  const msg = `Hola, estoy en Medellín. Me interesa el implemento de voleibol ${nombre}. ¿Precio y disponibilidad, por favor?`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

/**
 * Alt enfocado a intención local sin sobre-optimizar
 */
function altText(p) {
  const base = (p?.referencia || 'Implemento de voleibol').trim()
  return `${base} - implementos de voleibol en Medellín`
}

/** Compensa productos cuyas fotos vienen con mucho espacio en blanco */
function implementImageScaleClass(p) {
  const ref = (p?.referencia || '').trim().toUpperCase()
  if (
    ref === 'AEROSOL NABICO' ||
    ref === 'AEROSOL NABICO HERBAL' ||
    ref === 'MEDIAS SEMI PROFESIONALES'
  ) {
    return 'scale-150'
  }
  return ''
}

function isMediasSemiProfesionales(p) {
  return (p?.referencia || '').trim().toUpperCase() === 'MEDIAS SEMI PROFESIONALES'
}

/**
 * Para itemprop=url en SPA
 */
const pageUrlWithAnchor = computed(() => {
  if (typeof window === 'undefined') return ''
  const u = new URL(window.location.href)
  u.hash = '#Implementos_Deportivos'
  return u.toString()
})

const items = computed(() =>
  (productosData ?? []).map(p => {
    const precioNumero = toPriceNumber(p.precio)
    return {
      ...p,
      imagen: normalizePublicPath(p.imagen || p.img || ''),
      descripcion: p.descripcion ?? '',
      referencia: p.referencia ?? 'Producto',
      color: p.color ?? 'N/A',
      size: p.size ?? 'N/A',
      material: p.material ?? 'N/A',
      uso: p.uso ?? 'N/A',
      precioNumero,
      precioLabel: toPriceLabel(p.precio)
    }
  })
)

const productosDuplicados = computed(() => [...items.value, ...items.value])

const expanded = ref({})
const toggle = index => (expanded.value[index] = !expanded.value[index])

const wrapRef = ref(null)
const trackRef = ref(null)
let timer = null
const STEP_INTERVAL_MS = 2500

const stepNext = () => {
  const wrap = wrapRef.value
  const track = trackRef.value
  if (!wrap || !track) return

  const maxScroll = track.scrollWidth - wrap.clientWidth
  if (maxScroll <= 0) return

  // avance por viewport; loop al final
  if (wrap.scrollLeft + wrap.clientWidth >= track.scrollWidth - 4) {
    wrap.scrollLeft = 0
  } else {
    wrap.scrollLeft += wrap.clientWidth
  }
}

const startAuto = () => {
  if (!timer) timer = setInterval(stepNext, STEP_INTERVAL_MS)
}
const stopAuto = () => {
  if (timer) clearInterval(timer)
  timer = null
}

const play = () => startAuto()
const pause = () => stopAuto()

onMounted(startAuto)
onBeforeUnmount(pause)
</script>
