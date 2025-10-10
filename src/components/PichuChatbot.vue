<template>
  <!-- BOTÓN FLOTANTE (no altera el layout gracias a Teleport) -->
  <teleport to="body">
    <button
      @click="toggle()"
      class="fixed right-4 z-[9999] rounded-full shadow-xl p-0.5 focus:outline-none"
      style="bottom: calc(env(safe-area-inset-bottom, 0px) + 1rem);"
      aria-label="Abrir chat Pichu"
    >
      <div class="relative bg-white rounded-full p-2 ring-2 ring-lime-400/70">
        <img :src="pichuImg" alt="Pichu" class="w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-10" />
        <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <path id="pichu-circle" d="M50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
          </defs>
          <text font-size="9" font-weight="700" class="fill-lime-600">
            <textPath xlink:href="#pichu-circle" startOffset="-5" textLength="150">
              PREGÚNTALE A PICHU
            </textPath>
          </text>
        </svg>
      </div>
    </button>

    <!-- CONTENEDOR DEL CHAT (flotante, responsivo y limpio) -->
    <transition enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 translate-y-2 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 translate-y-2 scale-95">
      <div v-show="isOpen"
           class="fixed z-[9998] right-4 bottom-24 w-[92vw] max-w-sm sm:max-w-md rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5">
        <!-- Header compacto con CTA WhatsApp -->
        <div class="flex items-center gap-3 bg-gradient-to-r from-lime-400 to-emerald-500 text-white p-3">
          <img :src="pichuImg" alt="Pichu" class="w-9 h-9 rounded-full bg-white/90 p-1" />
          <div class="leading-tight">
            <p class="font-semibold">Pichu</p>
            <p class="text-[11px] opacity-95">VolleyExpress · Ayuda rápida</p>
          </div>

          <!-- CTA WhatsApp (no rompe layout, responsivo) -->
          <a
            :href="waHref"
            target="_blank"
            rel="noopener"
            class="ml-auto inline-flex items-center gap-2 bg-[#25D366] hover:brightness-110 text-white text-[12px] font-medium px-3 py-1.5 rounded-full shadow-md transition"
            aria-label="Chatear por WhatsApp"
          >
            <!-- Ícono WhatsApp (SVG liviano) -->
            <svg viewBox="0 0 32 32" class="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M19.11 17.36c-.28-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.62.14-.18.28-.71.89-.87 1.07-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28 0-.43.12-.57.12-.12.28-.32.42-.49.14-.16.18-.28.28-.46.1-.18.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.52-.44-.45-.62-.46l-.53-.01c-.18 0-.49.07-.75.35-.25.28-.97.95-.97 2.31 0 1.36.99 2.67 1.13 2.86.14.18 1.95 2.98 4.74 4.18.66.29 1.17.46 1.57.59.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.53-.32zM16.02 3.2C9.85 3.2 4.8 8.22 4.8 14.35c0 2.5.81 4.81 2.19 6.68L6 28.8l7.94-1.99c1.79.99 3.85 1.55 6.07 1.55 6.17 0 11.22-5.02 11.22-11.15S22.19 3.2 16.02 3.2zm0 20.4c-1.99 0-3.84-.59-5.38-1.6l-.39-.25-4.72 1.18 1.25-4.52-.26-.41a9.2 9.2 0 0 1-1.49-5.06c0-5.06 4.15-9.16 9.25-9.16 5.09 0 9.25 4.1 9.25 9.16 0 5.06-4.16 9.16-9.25 9.16z"/>
            </svg>
            WhatsApp
          </a>

          <button @click="isOpen=false"
                  class="text-white/90 hover:text-white text-xl leading-none"
                  aria-label="Cerrar">×</button>
        </div>

        <!-- Cuerpo minimal (FAQ de 5 preguntas) -->
        <div class="p-3 bg-zinc-50">
          <!-- Bienvenida breve -->
          <div class="mb-2 text-[13px] text-zinc-700">
            <p>Hola, soy <b>Pichu</b>. Elige una opción 👇</p>
          </div>

          <!-- Lista de 5 preguntas como tarjetas/chips -->
          <div class="grid grid-cols-1 gap-2">
            <button v-for="(item, idx) in faq" :key="idx"
                    @click="showAnswer(idx)"
                    class="flex items-center justify-between w-full text-left bg-white ring-1 ring-zinc-200 hover:bg-zinc-100 rounded-xl px-3 py-2 text-[13px]">
              <span class="truncate">{{ item.q }}</span>
              <span class="ml-3 text-zinc-400">›</span>
            </button>
          </div>

          <!-- Respuesta seleccionada -->
          <transition enter-active-class="transition duration-150 ease-out"
                      enter-from-class="opacity-0 translate-y-1"
                      enter-to-class="opacity-100 translate-y-0">
            <div v-if="activeIndex !== null"
                 class="mt-3 bg-white ring-1 ring-zinc-200 rounded-xl p-3">
              <p class="text-[13px] text-zinc-800" v-html="faq[activeIndex].a"></p>

              <!-- Chips con enlaces a rutas reales (mantiene estilo) -->
              <div class="mt-2 flex flex-wrap gap-2">
                <a v-for="(chip, i) in faq[activeIndex].next"
                   :key="i"
                   :href="routeFor(chip)"
                   class="text-[11px] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2 py-1 rounded-full"
                >{{ chip }}</a>
              </div>
            </div>
          </transition>
        </div>

        <!-- Input (minimal) -->
        <form @submit.prevent="handleSend" class="p-2.5 border-t border-zinc-200 bg-white flex items-center gap-2">
          <input v-model.trim="input" type="text" placeholder="Escribe tu pregunta…"
                 class="flex-1 px-3 py-2 rounded-xl ring-1 ring-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none text-[13px]"
                 aria-label="Escribir mensaje" />
          <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-[13px]">
            Enviar
          </button>
        </form>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import pichuImg from '../assets/pichu.png' // conserva tu ruta

// Estado
const isOpen = ref(false)
const input = ref('')
const activeIndex = ref(null)

// Número de WhatsApp y mensaje prellenado (ajústalo si cambias de contacto)
const waNumber = '573144706996'
const waText = encodeURIComponent('Hola 👋 Quiero más información de VolleyExpress.')
const waHref = `https://wa.me/${waNumber}?text=${waText}`

// 5 PREGUNTAS Y RESPUESTAS (contenido minimalista)
const faq = ref([
  {
    q: '¿Tienen balones Mikasa / Molten / Wilson?',
    a: 'Sí 🏐 Tenemos <b>Mikasa</b>, <b>Molten</b> y <b>Wilson</b>. Oficiales FIVB y entrenamiento. ¿Interior o exterior?',
    next: ['Ver balones', 'Accesorios', 'Promociones']
  },
  {
    q: 'Tallas y tamaños disponibles',
    a: 'Balones: <b>Talla 5 oficial</b>, <b>juvenil</b> y <b>mini</b>. Peluches: <b>S (20cm)</b>, <b>M (30cm)</b>, <b>L (50cm)</b>.',
    next: ['Guía de tallas', 'Peluches', 'Materiales']
  },
  {
    q: 'Accesorios (rodilleras, mallas, etc.)',
    a: 'Tenemos <b>rodilleras</b> de gel/neopreno, <b>mallas y redes</b> de competencia, y kits de <b>entrenamiento</b>.',
    next: ['Rodilleras', 'Ver balones', 'Promociones']
  },
  {
    q: 'Envíos y tiempos de entrega',
    a: '🚚 Envíos gratis por compras &gt; <b>$100</b>. Entrega estimada: <b>2–5 días hábiles</b> en ciudad. También <b>recogida en tienda</b>.',
    next: ['Cobertura', 'Costo envío', 'Seguimiento']
  },
  {
    q: 'Promociones activas',
    a: '🎉 <b>2da unidad -50%</b> en peluches · <b>Combo</b> balón+rodilleras -20% · <b>-15%</b> en primera compra.',
    next: ['Promociones', 'Cómo aplicar descuento', 'Ver balones']
  }
])

// Acciones
function toggle(){ isOpen.value = !isOpen.value }
function showAnswer(i){ activeIndex.value = i }

function handleSend(){
  if (!input.value) return
  const t = input.value.toLowerCase()
  input.value = ''
  if (/(mikasa|molten|wilson|balon|balón|fivb)/i.test(t)) activeIndex.value = 0
  else if (/(talla|tamañ|mini|juvenil|peluche)/i.test(t)) activeIndex.value = 1
  else if (/(rodillera|accesori|malla|red|kit)/i.test(t)) activeIndex.value = 2
  else if (/(env[ií]o|entrega|domicilio|tiempo)/i.test(t)) activeIndex.value = 3
  else if (/(promo|descuento|oferta|combo)/i.test(t)) activeIndex.value = 4
  else activeIndex.value = null
}

// Mapea chips -> rutas (ajusta a tus paths reales)
function routeFor(label){
  const l = label.toLowerCase()
  if (l.includes('ver balon') || l.includes('balón') || l === 'ver balones') return '/productos?cat=balones'
  if (l.includes('accesorio')) return '/productos?cat=accesorios'
  if (l.includes('promociones') || l.includes('descuento') || l.includes('promo')) return '/promo'
  if (l.includes('guía de tallas') || l.includes('talla')) return '/guia/tallas'
  if (l.includes('peluche')) return '/productos?cat=peluches'
  if (l.includes('material')) return '/info/materiales'
  if (l.includes('rodillera')) return '/productos?cat=accesorios&sub=rodilleras'
  if (l.includes('cobertura')) return '/info/envios#cobertura'
  if (l.includes('costo envío') || l.includes('costo envio')) return '/info/envios#costo'
  if (l.includes('seguimiento')) return '/orden/seguimiento'
  if (l.includes('cómo aplicar descuento') || l.includes('como aplicar descuento')) return '/promo#como-aplicar'
  return '/' // fallback
}
</script>

<style>
/* Oculta scrollbar horizontal si en algún caso hay overflow */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
