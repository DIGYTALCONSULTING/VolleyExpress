<template>
  <teleport to="body">
    <!-- BOTÓN FLOTANTE -->
    <button
      @click="toggle"
      class="fixed right-4 z-[9998] rounded-full shadow-xl p-0.5 focus:outline-none transition chat-safe-bottom"
      :class="isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'"
    >
      <div class="relative bg-white rounded-full p-2 ring-2 ring-lime-400/70 overflow-hidden">
        <img
          :src="pichuImg"
          alt="Pichu"
          class="w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-10"
        />

        <!-- TEXTO CIRCULAR -->
        <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full pointer-events-none animate-spin-slow">
          <defs>
            <path
              id="pichu-circle"
              d="M50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
          </defs>
          <text font-size="10" font-weight="700" class="fill-lime-600">
            <textPath xlink:href="#pichu-circle">
              · PREGÚNTALE A PICHU · PREGÚNTALE A PICHU ·
            </textPath>
          </text>
        </svg>
      </div>
    </button>

    <!-- CHAT -->
    <div
      v-show="isOpen"
      class="fixed right-4 z-[10000] chat-safe-bottom w-full max-w-[420px]
             rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5"
    >
      <!-- Header -->
      <div class="flex items-center gap-3 bg-gradient-to-r from-lime-400 to-emerald-500 text-white p-3">
        <img :src="pichuImg" class="w-9 h-9 rounded-full bg-white/90 p-1" />
        <div>
          <p class="font-semibold">Pichu</p>
          <p class="text-[11px]">Asesor de ventas · VolleyExpress</p>
        </div>

        <button
          @click="resetChat"
          class="ml-auto text-xs bg-white/20 px-2 py-1 rounded-lg"
        >
          Reiniciar
        </button>

        <button
          @click="isOpen = false"
          class="ml-2 text-sm bg-white/20 w-7 h-7 rounded-full flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      <!-- Conversación -->
      <div ref="scrollRef" class="h-[58vh] overflow-y-auto p-3 space-y-3 bg-zinc-50">
        <div
          v-for="(m,i) in messages"
          :key="i"
          class="flex"
          :class="m.from === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            :class="m.from === 'user'
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-zinc-800 ring-1 ring-zinc-200'"
            class="max-w-[85%] rounded-2xl px-4 py-3 text-[13px]"
          >

              


            <div v-html="m.text"></div>

            <div v-if="m.actions?.length" class="mt-3">
              <a
                v-for="(a,idx) in m.actions"
                :key="idx"
                :href="a.href"
                target="_blank"
                class="block text-center bg-[#25D366] text-white text-[12px] py-1.5 rounded-full"
              >
                {{ a.label }}
              </a>
            </div>

            <div v-if="m.suggest?.length" class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="(s,idx) in m.suggest"
                :key="idx"
                @click="quickAsk(s)"
                class="text-[11px] bg-zinc-100 px-3 py-1 rounded-full"
              >
                {{ s }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="isTyping" class="text-[13px] text-zinc-500">
          Pichu está escribiendo…
        </div>
      </div>

      <!-- Input -->
      <form @submit.prevent="handleSend" class="p-2 border-t flex gap-2">
        <input
          v-model.trim="input"
          placeholder="¿Qué estás buscando?"
          class="flex-1 px-3 py-2 rounded-xl ring-1 ring-zinc-200 text-[13px]"
        />
        <button class="bg-emerald-600 text-white px-4 rounded-xl text-[13px]">
          Enviar
        </button>
      </form>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import pichuImg from '../assets/pichu.webp'

import productos from '../data/productos.json'
import accesorios from '../data/accesorios.json'
import peluches from '../data/peluches.json'

const isOpen = ref(false)
const input = ref('')
const messages = ref([])
const isTyping = ref(false)
const scrollRef = ref(null)

const waBase = 'https://wa.me/573004311280?text='

const catalogo = {
  balones: productos,
  accesorios,
  peluches
}

function normalize(t) {
  return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function scrollBottom() {
  nextTick(() => {
    if (scrollRef.value) {
      scrollRef.value.scrollTop = scrollRef.value.scrollHeight
    }
  })
}

function waMessage(p) {
  return waBase + encodeURIComponent(`Hola, quiero comprar el ${p.referencia} (${p.precio})`)
}

/* 👉 MENSAJE INICIAL (RESTAURADO VISUALMENTE) */
function saludo() {
  messages.value.push({
    from: 'bot',
    text: `
      <p><strong>¡Hola! 👋 Soy Pichu.</strong></p>
      <p class="mt-2">Te puedo ayudar con:</p>
      <ul class="mt-2 space-y-1">
        <li>🏐 <strong>IMPLEMENTOS DEPORTIVOS</strong></li>
        <li>🎒 <strong>ACCESORIOS</strong></li>
        <li>🧸 <strong>PELUCHES</strong></li>
      </ul>
      <p class="mt-3">¿Qué estás buscando hoy?</p>
    `,
    suggest: ['Implementos deportivos', 'Accesorios', 'Peluches']
  })
}

function mostrarCategoria(cat) {
  catalogo[cat].forEach(p => {
    messages.value.push({
      from: 'bot',
      image: p.imagen,
      text: `<strong>${p.referencia}</strong><br>${p.descripcion ?? ''}<br><strong>${p.precio}</strong>`,
      actions: [{ label: 'Comprar por WhatsApp', href: waMessage(p) }]
    })
  })
}

async function handleSend() {
  if (!input.value) return

  const text = input.value
  const t = normalize(text)

  messages.value.push({ from: 'user', text })
  input.value = ''
  isTyping.value = true
  scrollBottom()

  await new Promise(r => setTimeout(r, 400))

  if (t.includes('accesor')) {
    mostrarCategoria('accesorios')
  } else if (t.includes('peluche')) {
    mostrarCategoria('peluches')
  } else if (t.includes('implemento') || t.includes('balon')) {
    mostrarCategoria('balones')
  } else {
    saludo()
  }

  isTyping.value = false
  scrollBottom()
}

function quickAsk(t) {
  input.value = t
  handleSend()
}

function toggle() {
  isOpen.value = !isOpen.value
}

function resetChat() {
  messages.value = []
  saludo()
}

onMounted(saludo)
</script>

<style>
:root {
  --digytal-footer-height: 96px;
}

.chat-safe-bottom {
  bottom: calc(env(safe-area-inset-bottom, 0px) + var(--digytal-footer-height) + 1rem);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin 18s linear infinite;
}
</style>
