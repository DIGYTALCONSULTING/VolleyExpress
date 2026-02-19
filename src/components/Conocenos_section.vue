<template>
  <section
    id="Conocenos"
    class="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-0"
  > 
    <!-- Título -->
    <h2 class="text-center text-2xl font-bold mb-0 py-2">
      CONÓCENOS Y CONTÁCTANOS
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- Card izquierda -->
      <div class="relative rounded-3xl text-white overflow-hidden">
        <div
          class="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-[#63c41f]"
          aria-hidden="true"
        ></div>

        <div class="relative flex">
          <!-- Rótulo vertical -->
          <div class="hidden sm:flex items-center justify-center gap-8 px-3">
            <span class="text-xl font-semibold [writing-mode:vertical-rl] rotate-180 px-10">
              Nuestra&nbsp;Historia&emsp;&emsp;¿Quiénes&nbsp;Somos?
            </span>
          </div>

          <!-- Contenido -->
          <div class="flex-1 py-8 px-8 space-y-2 text-justify">
            <div>
              <h3 class="text-center font-bold">
                VOLLEY EXPRESS
              </h3>
              <h4 class="text-center font-semibold">
                Tu pasión por el voleibol, a un clic de distancia
              </h4>
            </div>

            <div class="border-t border-white/10 pt-6 space-y-2">
              <p class="text-sm leading-snug text-zinc-100">
                En Voley Express vivimos el voleibol como una pasión que se comparte dentro y fuera de la cancha. Nacimos en Medellín hace más de 4 años con un propósito claro: acercar a jugadores, clubes y aficionados a productos de voleibol de alta calidad.
              </p>
              <p class="text-sm leading-snug text-zinc-100">
                Hoy ofrecemos balones profesionales, accesorios deportivos y peluches temáticos ideales para entrenar, competir o regalar.
              </p>
              <p class="text-sm leading-snug text-zinc-100">
                Somos más que una tienda: somos parte de la comunidad voleibolista de Medellín.
              </p>
              <p class="text-sm leading-snug text-zinc-100">
                Comenzamos atendiendo a la comunidad local, escuchando a quienes entrenan, compiten y disfrutan este deporte todos los días. Gracias a esa cercanía, hoy ofrecemos una cuidada selección de balones profesionales, accesorios deportivos y peluches temáticos, ideales tanto para entrenar, competir o regalar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Card derecha: Formulario -->
      <div class="rounded-3xl overflow-hidden">
        <div class="bg-gradient-to-b from-[#63c41f] via-zinc-900 to-black p-6 md:p-8 pb-10 md:pb-12">

          <h3 class="text-center text-white font-semibold mb-0">
            CONTÁCTANOS
          </h3>

          <form @submit.prevent="enviarWhatsapp" class="space-y-4">
            <input
              v-model="form.ciudad"
              type="text"
              placeholder="Ciudad"
              class="w-full rounded-md bg-white/10 text-white placeholder-white/80 border border-white/20 px-4 py-2 focus:ring-2 focus:ring-white/40"
              required
            />

            <input
              v-model="form.celular"
              type="tel"
              placeholder="Celular"
              class="w-full rounded-md bg-white/10 text-white placeholder-white/80 border border-white/20 px-4 py-2 focus:ring-2 focus:ring-white/40"
              required
            />

            <input
              v-model="form.nombre"
              type="text"
              placeholder="Nombre"
              class="w-full rounded-md bg-white/10 text-white placeholder-white/80 border border-white/20 px-4 py-2 focus:ring-2 focus:ring-white/40"
              required
            />

            <textarea
              v-model="form.mensaje"
              rows="3"
              placeholder="Mensaje"
              class="w-full rounded-md bg-white/10 text-white placeholder-white/80 border border-white/20 px-4 py-2 resize-none focus:ring-2 focus:ring-white/40"
              required
            ></textarea>

            <label class="flex items-start gap-3 text-white text-sm">
              <input
                type="checkbox"
                v-model="policyAccepted"
                class="mt-1 h-4 w-4"
                required
              />
              <span>
                He leído y acepto la
                <button
                  type="button"
                  @click="openModal"
                  class="underline"
                >
                  Política de Tratamiento de Datos
                </button>
              </span>
            </label>

            <button
              type="submit"
              :disabled="!policyAccepted"
              class="w-full rounded-full bg-gradient-to-b from-[#509637] to-[#1A3012] text-white font-semibold py-3 disabled:opacity-50"
            >
              Déjanos tus datos y te contactaremos
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center px-4 bg-black/60"
    >
      <div class="relative w-full max-w-3xl rounded-2xl bg-zinc-900 text-white p-6 text-justify ">
        <h3 class="font-semibold mb-2">
          {{ politica.title }}
        </h3>

        <p class="text-sm mb-4 text-justify">
          {{ politica.consent_text }}
        </p>

        <div v-if="politica.full_text && politica.full_text.length">
          <p
            v-for="(p, i) in politica.full_text"
            :key="i"
            class="text-sm mb-2 text-justify "
          >
            {{ p }}
          </p>
        </div>

        <button
          @click="acceptFromModal"
          class="mt-4 rounded-full px-4 py-2 bg-green-600"
        >
          Acepto
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onBeforeUnmount } from 'vue'
import politicaRaw from '../data/politica_datos.json'

const politica = Array.isArray(politicaRaw) ? politicaRaw[0] : politicaRaw

const form = reactive({
  ciudad: '',
  celular: '',
  nombre: '',
  mensaje: ''
})

const policyAccepted = ref(false)
const showModal = ref(false)

function openModal () {
  showModal.value = true
  document.documentElement.classList.add('overflow-hidden')
}

function acceptFromModal () {
  policyAccepted.value = true
  showModal.value = false
  document.documentElement.classList.remove('overflow-hidden')
}

onBeforeUnmount(() => {
  document.documentElement.classList.remove('overflow-hidden')
})

function enviarWhatsapp () {
  const phone = '573004311280'
  const texto = `
Hola, me gustaría más información.
- Nombre: ${form.nombre}
- Celular: ${form.celular}
- Ciudad: ${form.ciudad}
- Mensaje: ${form.mensaje}
He leído y acepto la Política de Tratamiento de Datos.
  `
  window.location.href =
    'https://api.whatsapp.com/send?phone=' +
    phone +
    '&text=' +
    encodeURIComponent(texto)
}

</script>

