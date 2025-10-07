<template>
  <!-- ============ BOTÓN FLOTANTE (Teleport evita que afecte el layout) ============ -->
  <teleport to="body">
    <button
      @click="toggle()"
      class="fixed right-4 z-[9999] rounded-full shadow-xl p-0.5 focus:outline-none"
      style="bottom: calc(env(safe-area-inset-bottom, 0px) + 1rem);"
      aria-label="Abrir chat Pichu"
    >
      <div class="relative bg-white rounded-full p-2 ring-2 ring-lime-400/70">
        <!-- Imagen -->
        <img :src="pichuImg" alt="Pichu"
             class="w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-10" />
        <!-- Texto circular -->
        <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <path id="pichu-circle"
                  d="M50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
          </defs>
          <text font-size="9" font-weight="700" class="fill-lime-600">
            <textPath xlink:href="#pichu-circle" startOffset="-5" textLength="150">
              PREGÚNTALE A PICHU
            </textPath>
          </text>
        </svg>
      </div>
    </button>

    <!-- ============ CONTENEDOR DEL CHAT FLOTANTE (Teleport) ============ -->
    <transition enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 translate-y-2 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 translate-y-2 scale-95">
      <div v-show="isOpen"
           class="fixed z-[9998] right-4 bottom-24 sm:bottom-24 w-[92vw] max-w-sm sm:max-w-md
                  rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5">
        <!-- Header compacto -->
        <div class="flex items-center gap-3 bg-gradient-to-r from-lime-400 to-emerald-500 text-white p-3">
          <img :src="pichuImg" alt="Pichu" class="w-9 h-9 rounded-full bg-white/90 p-1" />
          <div class="leading-tight">
            <p class="font-semibold">Pichu</p>
            <p class="text-[11px] opacity-95">Volley, peluches y accesorios</p>
          </div>
          <button @click="isOpen=false"
                  class="ml-auto text-white/90 hover:text-white text-xl leading-none"
                  aria-label="Cerrar chat">×</button>
        </div>

        <!-- Mensajes (más limpio) -->
        <div ref="scrollRef"
             class="h-[58vh] max-h-[70vh] overflow-y-auto p-3 space-y-2 bg-zinc-50">
          <div v-for="(m,i) in messages" :key="i"
               class="flex"
               :class="m.from==='user' ? 'justify-end' : 'justify-start'">
            <div
              :class="m.from==='user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-zinc-800 ring-1 ring-zinc-200'"
              class="max-w-[85%] rounded-2xl px-3 py-2 text-[13px] shadow-sm"
            >
              <p v-html="m.text"></p>

              <!-- Sugerencias dentro del mensaje (máx 3 visibles) -->
              <div v-if="m.suggest && m.suggest.length"
                   class="mt-2 flex flex-wrap gap-2">
                <button
                  v-for="(s,idx) in m.suggest.slice(0,3)"
                  :key="idx"
                  @click="quickAsk(s)"
                  class="text-[11px] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2 py-1 rounded-full"
                >{{ s }}</button>
              </div>
            </div>
          </div>

          <!-- Indicador "escribiendo..." -->
          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-white text-zinc-800 ring-1 ring-zinc-200 rounded-2xl px-3 py-2 text-[13px] shadow-sm">
              <span class="inline-flex items-center gap-1">
                <span class="sr-only">Pichu está escribiendo</span>
                <span class="w-2 h-2 rounded-full bg-zinc-300 animate-bounce"></span>
                <span class="w-2 h-2 rounded-full bg-zinc-300 animate-bounce [animation-delay:120ms]"></span>
                <span class="w-2 h-2 rounded-full bg-zinc-300 animate-bounce [animation-delay:240ms]"></span>
              </span>
            </div>
          </div>
        </div>

        <!-- Chips inferiores (scroll horizontal en móvil) -->
        <div class="px-3 pt-2 pb-1 bg-zinc-50">
          <div class="flex gap-2 overflow-x-auto no-scrollbar">
            <button v-for="chip in chips" :key="chip" @click="quickAsk(chip)"
                    class="whitespace-nowrap text-[12px] bg-white ring-1 ring-zinc-200 hover:bg-zinc-100 px-3 py-1 rounded-full">
              {{ chip }}
            </button>
          </div>
        </div>

        <!-- Input -->
        <form @submit.prevent="handleSend"
              class="p-2.5 border-t border-zinc-200 bg-white flex items-center gap-2">
          <input
            v-model.trim="input"
            type="text"
            placeholder="Escribe tu pregunta… ej. '¿tienen balones Mikasa?'"
            class="flex-1 px-3 py-2 rounded-xl ring-1 ring-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none text-[13px]"
            aria-label="Escribir mensaje"
          />
          <button type="submit"
                  class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-[13px]">
            Enviar
          </button>
        </form>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import pichuImg from '../assets/pichu.png' // conserva tu ruta

// ===================== LÓGICA ORIGINAL CONSERVADA =====================
const KEYWORDS = {
  productos_balones: ['balon','balón','balones','pelota','pelotas','esfera','voleibol','volleyball','mikasa','molten','wilson','fivb','indoor','outdoor'],
  productos_peluches: ['peluche','peluches','oso','conej','animal','stuffed','muñeco','muñecos'],
  productos_accesorios: ['accesorio','accesorios','rodillera','rodilleras','malla','red','equipamiento','uniforme','mangas'],
  productos_joyeria: ['arete','aretes','collar','collares','pulsera','manilla','manillas','topo','topitos','joyeria','joyería','accesorios personales'],
  precios: ['precio','costos','valor','cuanto cuesta','cuánto cuesta'],
  tallas: ['tallas','tamaño','tamaños','medidas','dimensiones'],
  materiales: ['material','composición','calidad','fabricación'],
  envios: ['envio','envíos','entrega','domicilio','shipping','enviar','envían'],
  promociones: ['oferta','ofertas','promoción','promociones','descuento','descuentos','rebajas','promo']
};

const respuestasVolleyball = {
  saludo: [
    '¡Hola! Soy <b>Pichu</b>, tu experto en productos de volleyball 🏐',
    '¡Bienvenid@! Aquí Pichu, especialista en peluches y accesorios de volleyball 👋'
  ],
  productos_balones: { respuestas: [
    'Tenemos balones <b>Mikasa</b>, <b>Wilson</b> y <b>Molten</b> de competición.',
    'Balones oficiales <b>FIVB</b> disponibles en diferentes tamaños.',
    '¿Interior o exterior? Tenemos ambas opciones y versiones de entrenamiento.',
    'Guía rápida: Talla 5 oficial | Juvenil | Mini.'
  ]},
  productos_peluches: { respuestas: [
    'Peluches de animales jugando volleyball 🐻🏐.',
    'Osos, conejos y pajaritos con uniformes de volleyball.',
    'Tamaños: <b>S (20cm)</b>, <b>M (30cm)</b>, <b>L (50cm)</b>.'
  ]},
  productos_accesorios: { respuestas: [
    'Rodilleras pro de gel y neopreno (alto impacto).',
    'Mallas y redes de competencia, postes y tensores.',
    'Kit de entrenamiento: conos, bandas y marcadores.'
  ]},
  productos_joyeria: { respuestas: [
    'Aretes con diseños de balones y redes.',
    'Collares con charms de volleyball en <b>acero</b> y <b>plata 925</b>.',
    'Manillas personalizadas con nombre | Topitos temáticos.'
  ]},
  precios: { respuestas: [
    'Precios referenciales: balones desde <b>$50</b>, peluches desde <b>$25</b>.',
    '¿Qué producto específico te interesa? Te doy el precio exacto 👇'
  ]},
  tallas: { respuestas: [
    'Balones: tamaño <b>5</b> oficial, <b>juvenil</b> y <b>mini</b>.',
    'Peluches: S (20cm), M (30cm), L (50cm).',
    'Joyería: pulseras ajustables; collares 45–50 cm aprox.'
  ]},
  materiales: { respuestas: [
    'Balones: cuero sintético / composite de alta durabilidad.',
    'Peluches: peluche premium antialérgico.',
    'Joyería: acero quirúrgico y plata 925.'
  ]},
  envios: { respuestas: [
    '🚚 Envíos gratis por compras mayores a <b>$100</b>.',
    'Entrega estimada: <b>2–5 días hábiles</b> en la ciudad.',
    'También puedes recoger en tienda.'
  ]},
  promociones: { respuestas: [
    '🎉 ¡2da unidad al <b>50%</b> en peluches!',
    'Combo balón + rodilleras con <b>20% OFF</b>.',
    '15% de descuento en tu <b>primera compra</b>.'
  ]},
  default: [
    'Puedo ayudarte con <b>balones</b>, <b>peluches</b>, <b>accesorios</b> y <b>joyería</b>. ¿Qué te interesa?',
    'Pregúntame sobre nuestros productos de volleyball 🏐'
  ]
};

// ===================== HELPERS =====================
function stripDiacritics(s){
  try { return s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'') }
  catch { return s.toLowerCase()
    .replace(/[áàä]/g,'a').replace(/[éèë]/g,'e').replace(/[íìï]/g,'i')
    .replace(/[óòö]/g,'o').replace(/[úùü]/g,'u').replace(/ñ/g,'n'); }
}
function categoryFromText(text){
  const t = stripDiacritics(text);
  for (const [cat, words] of Object.entries(KEYWORDS)) {
    if (words.some(w => t.includes(stripDiacritics(w)))) return cat;
  }
  return 'default';
}
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function join(arr){ return arr.map(x=>'• '+x).join('<br>') }
function buildReply(cat){
  switch (cat) {
    case 'productos_balones':    return pick(respuestasVolleyball.productos_balones.respuestas);
    case 'productos_peluches':   return pick(respuestasVolleyball.productos_peluches.respuestas);
    case 'productos_accesorios': return pick(respuestasVolleyball.productos_accesorios.respuestas);
    case 'productos_joyeria':    return pick(respuestasVolleyball.productos_joyeria.respuestas);
    case 'precios':              return join(respuestasVolleyball.precios.respuestas);
    case 'tallas':               return join(respuestasVolleyball.tallas.respuestas);
    case 'materiales':           return join(respuestasVolleyball.materiales.respuestas);
    case 'envios':               return join(respuestasVolleyball.envios.respuestas);
    case 'promociones':          return join(respuestasVolleyball.promociones.respuestas);
    default:                     return pick(respuestasVolleyball.default);
  }
}

// ===================== ESTADO =====================
const isOpen = ref(false);
const isTyping = ref(false);
const input = ref('');
const messages = ref([]);
const scrollRef = ref(null);

// chips más curados (máx 6–8)
const chips = [
  'Balones Mikasa','Peluches de conejos','Rodilleras',
  '¿Envíos?','¿Promociones?','Aretes de volleyball','Tallas','Materiales'
];

// ===================== CICLO DE VIDA =====================
onMounted(() => {
  const cached = localStorage.getItem('pichu_chat');
  if (cached) messages.value = JSON.parse(cached);

  if (!messages.value.length) {
    // Solo 2 mensajes iniciales, más limpio
    pushBot(pick(respuestasVolleyball.saludo));
    pushBot('¿Qué te interesa hoy? <b>Balones</b>, <b>Peluches</b>, <b>Accesorios</b> o <b>Joyería</b>.', ['Balones','Peluches','Accesorios']);
  }
});

watch(messages, () => {
  localStorage.setItem('pichu_chat', JSON.stringify(messages.value));
  nextTick(() => { if (scrollRef.value) scrollRef.value.scrollTop = scrollRef.value.scrollHeight; });
},{deep:true});

// ===================== ACCIONES =====================
function toggle(){
  isOpen.value = !isOpen.value;
  nextTick(() => { if (isOpen.value && scrollRef.value) scrollRef.value.scrollTop = scrollRef.value.scrollHeight; });
}

function pushBot(text, suggest=[]){ messages.value.push({from:'bot', text, suggest}); }
function pushUser(text){ messages.value.push({from:'user', text}); }
function quickAsk(t){ input.value=t; handleSend(); }

async function handleSend(){
  if(!input.value) return;
  const text = input.value;
  input.value = '';
  pushUser(text);

  // clasificación + typing simulado
  const cat = categoryFromText(text);
  isTyping.value = true;
  await new Promise(r => setTimeout(r, 420)); // pequeño delay natural

  const reply = buildReply(cat);
  let suggest = [];
  if (cat==='productos_balones') suggest=['Rodilleras','Mallas','Balón Molten'];
  if (cat==='productos_peluches') suggest=['Tamaños de peluches','Promociones'];
  if (cat==='productos_accesorios') suggest=['Balones','Envíos'];
  if (cat==='productos_joyeria') suggest=['Collares','Manillas','Promociones'];
  if (cat==='envios') suggest=['Cobertura','Tiempo de entrega'];
  if (cat==='promociones') suggest=['Combo balón + rodilleras','Primera compra -15%'];

  pushBot(reply, suggest);
  isTyping.value = false;
}
</script>

<!-- Opcional: ocultar scrollbar horizontal de chips en móvil -->
<style>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
