<template>
  <!-- BOTÓN FLOTANTE (no altera el layout gracias a Teleport) -->
  <teleport to="body">
    <button
      @click="toggle()"
      class="fixed right-4 z-[9998] rounded-full shadow-xl p-0.5 focus:outline-none transition"
      :class="isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'"
      style="bottom: calc(env(safe-area-inset-bottom, 0px) + 1rem);"
      aria-label="Abrir chat Pichu"
    >
      <div class="relative bg-white rounded-full p-2 ring-2 ring-lime-400/70 overflow-hidden">
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
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div v-show="isOpen"
           class="fixed z-[10000] right-4 bottom-24 w-full max-w-[min(420px,calc(100vw-2rem))]
                  sm:max-w-md rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5">
        <!-- Header compacto con CTA WhatsApp -->
        <div class="flex items-center gap-3 bg-gradient-to-r from-lime-400 to-emerald-500 text-white p-3">
          <img :src="pichuImg" alt="Pichu" class="w-9 h-9 rounded-full bg-white/90 p-1" />
          <div class="leading-tight">
            <p class="font-semibold">Pichu</p>
            <p class="text-[11px] opacity-95">VolleyExpress · Asistente de compra</p>
          </div>

          <a
            :href="waHref"
            target="_blank"
            rel="noopener"
            class="ml-auto inline-flex items-center gap-2 bg-[#25D366] hover:brightness-110 text-white text-[12px] font-medium px-3 py-1.5 rounded-full shadow-md transition"
            aria-label="Chatear por WhatsApp"
          >
            <svg viewBox="0 0 32 32" class="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M19.11 17.36c-.28-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.62.14-.18.28-.71.89-.87 1.07-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28 0-.43.12-.57.12-.12.28-.32.42-.49.14-.16.18-.28.28-.46.1-.18.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.52-.44-.45-.62-.46l-.53-.01c-.18 0-.49.07-.75.35-.25.28-.97.95-.97 2.31 0 1.36.99 2.67 1.13 2.86.14.18 1.95 2.98 4.74 4.18.66.29 1.17.46 1.57.59.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.53-.32zM16.02 3.2C9.85 3.2 4.8 8.22 4.8 14.35c0 2.5.81 4.81 2.19 6.68L6 28.8l7.94-1.99c1.79.99 3.85 1.55 6.07 1.55 6.17 0 11.22-5.02 11.22-11.15S22.19 3.2 16.02 3.2zm0 20.4c-1.99 0-3.84-.59-5.38-1.6l-.39-.25-4.72 1.18 1.25-4.52-.26-.41a9.2 9.2 0 0 1-1.49-5.06c0-5.06 4.15-9.16 9.25-9.16 5.09 0 9.25 4.1 9.25 9.16 0 5.06-4.16 9.16-9.25 9.16z"/>
            </svg>
            WhatsApp
          </a>

          <button @click="isOpen=false"
                  class="text-white/90 hover:text-white text-xl leading-none"
                  aria-label="Cerrar">×</button>
        </div>

        <!-- Conversación -->
        <div ref="scrollRef" class="h-[58vh] max-h-[70vh] overflow-y-auto p-3 space-y-2 bg-zinc-50">
          <div v-for="(m,i) in messages" :key="i" class="flex" :class="m.from==='user' ? 'justify-end' : 'justify-start'">
            <div
              :class="m.from==='user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-zinc-800 ring-1 ring-zinc-200'"
              class="max-w-[85%] rounded-2xl px-3 py-2 text-[13px] shadow-sm"
            >
              <p v-html="m.text"></p>

              <!-- Sugerencias (máximo 3) -->
              <div v-if="m.suggest && m.suggest.length" class="mt-2 flex flex-wrap gap-2">
                <button
                  v-for="(s,idx) in m.suggest.slice(0,3)"
                  :key="idx"
                  @click="quickAsk(s)"
                  class="text-[11px] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2 py-1 rounded-full"
                >{{ s }}</button>
              </div>
            </div>
          </div>

          <!-- Indicador 'escribiendo...' -->
          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-white text-zinc-800 ring-1 ring-zinc-200 rounded-2xl px-3 py-2 text-[13px] shadow-sm">
              <span class="inline-flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-zinc-300 animate-bounce"></span>
                <span class="w-2 h-2 rounded-full bg-zinc-300 animate-bounce [animation-delay:120ms]"></span>
                <span class="w-2 h-2 rounded-full bg-zinc-300 animate-bounce [animation-delay:240ms]"></span>
              </span>
              <span class="ml-2 text-zinc-500">Pichu está escribiendo…</span>
            </div>
          </div>
        </div>

        <!-- Input -->
        <form @submit.prevent="handleSend" class="p-2.5 border-t border-zinc-200 bg-white flex items-center gap-2">
          <input
            v-model.trim="input"
            type="text"
            placeholder="Escribe tu pregunta… ej. '¿tienen balones Mikasa?'"
            class="flex-1 px-3 py-2 rounded-xl ring-1 ring-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none text-[13px]"
            aria-label="Escribir mensaje"
          />
          <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-[13px]">
            Enviar
          </button>
        </form>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import pichuImg from '../assets/pichu.png'

// ===== ESTADO =====
const isOpen = ref(false)
const input = ref('')
const messages = ref([])
const isTyping = ref(false)
const scrollRef = ref(null)

// WhatsApp CTA (ajústalo si cambias el contacto)
const waNumber = '573004311280'
const waText = encodeURIComponent('Hola 👋 Quiero más información de VolleyExpress.')
const waHref = `https://wa.me/${waNumber}?text=${waText}`

// ===== CONTENIDO Y REGLAS DE RESPUESTA =====
const replies = {
  balones: [
    'Tenemos <b>Mikasa</b>, <b>Molten</b> y <b>Wilson</b> (FIVB, entrenamiento, indoor/outdoor). ¿Qué buscas exactamente?',
  ],
  tallas: [
    'Balones: <b>talla 5</b> oficial, <b>juvenil</b> y <b>mini</b>. Peluches: <b>S (20cm)</b>, <b>M (30cm)</b>, <b>L (50cm)</b>.',
  ],
  accesorios: [
    'Accesorios: <b>rodilleras</b> gel/neopreno, <b>mallas/redes</b> competencia, <b>kits</b> de entrenamiento.',
  ],
  envios: [
    '🚚 Envíos gratis &gt; <b>$100</b>. Entrega: <b>2–5 días hábiles</b> en ciudad. También <b>recogida</b> en tienda.',
  ],
  promos: [
    '🎉 <b>2da unidad -50%</b> en peluches · <b>Combo</b> balón+rodilleras <b>-20%</b> · <b>-15%</b> primera compra.',
  ],
  default: [
    'Puedo ayudarte con <b>balones</b>, <b>tallas</b>, <b>accesorios</b>, <b>envíos</b> o <b>promos</b>. ¿Por dónde empezamos?',
  ],
}

const chipsMap = {
  balones: ['Rodilleras', 'Tallas', 'Promociones'],
  tallas: ['Ver balones', 'Peluches', 'Materiales'],
  accesorios: ['Rodilleras', 'Ver balones', 'Promociones'],
  envios: ['Cobertura', 'Costo envío', 'Seguimiento'],
  promos: ['Cómo aplicar', 'Ver balones', 'Rodilleras'],
  default: ['Balones', 'Accesorios', 'Envíos'],
}

// ===== FUNCIONES =====
function toggle(){
  isOpen.value = !isOpen.value
  nextTick(scrollToEnd)
}

function pushBot(text, suggest = []) {
  messages.value.push({ from: 'bot', text, suggest })
}
function pushUser(text) { messages.value.push({ from: 'user', text }) }
function quickAsk(t){ input.value = t; handleSend() }

function intentFrom(text){
  const t = (text || '').toLowerCase()
  if (/(mikasa|molten|wilson|balon|balón|fivb|volley)/i.test(t)) return 'balones'
  if (/(talla|tamañ|mini|juvenil)/i.test(t)) return 'tallas'
  if (/(rodillera|accesori|malla|red|kit)/i.test(t)) return 'accesorios'
  if (/(env[ií]o|entrega|domicilio|tiempo|envian|envían)/i.test(t)) return 'envios'
  if (/(promo|descuento|oferta|combo)/i.test(t)) return 'promos'
  return 'default'
}

async function handleSend(){
  if (!input.value) return
  const text = input.value
  input.value = ''
  pushUser(text)
  await nextTick(scrollToEnd)

  // “Escribiendo…”
  isTyping.value = true
  await delay(420)

  const intent = intentFrom(text)
  const reply = replies[intent]?.[0] || replies.default[0]
  const suggest = chipsMap[intent]?.slice(0,3) || chipsMap.default.slice(0,3)

  pushBot(reply, suggest)
  isTyping.value = false
  await nextTick(scrollToEnd)
}

function delay(ms){ return new Promise(r => setTimeout(r, ms)) }
function scrollToEnd(){
  if (scrollRef.value) scrollRef.value.scrollTop = scrollRef.value.scrollHeight
}

// ===== CICLO DE VIDA =====
onMounted(() => {
  // Bienvenida compacta
  pushBot('¡Hola! Soy <b>Pichu</b>, tu asistente de compra 🏐')
  pushBot('Puedo ayudarte con <b>balones</b>, <b>tallas</b>, <b>accesorios</b>, <b>envíos</b> o <b>promos</b>.', chipsMap.default)
})

watch(messages, () => nextTick(scrollToEnd), { deep: true })
</script>

<style>
/* Mata el scroll horizontal global (evita la “columna” en móvil) */
html, body { overflow-x: hidden; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
