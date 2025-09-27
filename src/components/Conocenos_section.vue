<template>
  <section id="Conocenos" class="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-0">
    <!-- Título -->
    <h2 class="text-center text-2xl font-bold mb-0 py-2">CONÓCENOS</h2>

    <!-- Contenedor -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

      <!-- Card izquierda -->
      <div class="relative rounded-3xl text-white overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-[#63c41f]" aria-hidden="true"></div>

        <div class="relative flex">
          <!-- Rótulo vertical -->
          <div class="hidden sm:flex items-center justify-center gap-8 px-3">
            <span class="text-xl font-semibold [writing-mode:vertical-rl] rotate-180 px-10">
              Nuestra&nbsp;Historia&emsp;&emsp;¿Quiénes&nbsp;Somos?
            </span>
          </div>

          <!-- Contenido -->
          <div class="flex-1 py-8 px-8 md:px-8 space-y-8">
            <div>
              <h3 class="text-center font-bold">VOLLEY EXPRESS</h3>
              <p class="mt-16 text-sm leading-snug text-zinc-100">
                Somos una empresa que opera en Medellín con más de 4 años de experiencia generando
                emociones a nuestros jóvenes deportistas e imponiendo un estilo único con cada uno de
                nuestros productos.
              </p>
            </div>

            <div class="border-t border-white/10 pt-6">
              <h4 class="sr-only">Historia</h4>
              <p class="text-sm leading-snug text-zinc-100">
                Somos una empresa que opera en Medellín con más de 4 años de experiencia generando
                emociones a nuestros jóvenes deportistas e imponiendo un estilo único con cada uno de
                nuestros productos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Card derecha: Formulario -->
      <div class="rounded-3xl overflow-hidden">
        <div class="bg-gradient-to-b from-[#63c41f] to-black p-6 md:p-8">
          <h3 class="text-center text-white font-semibold mb-0">CONTÁCTANOS</h3>

          <form @submit.prevent="enviarWhatsapp" class="space-y-4">
            <!-- Ciudad -->
            <label for="ciudad" class="block text-white text-sm font-semibold mb-1">Ciudad</label>
            <input
              id="ciudad"
              v-model="form.ciudad"
              type="text"
              placeholder="Ciudad"
              class="w-full rounded-md bg-white/10 text-white placeholder-white/80 border border-white/20 px-4 py-2 outline-none focus:ring-2 focus:ring-white/40"
              required
            />

            <!-- Celular -->
            <label for="celular" class="block text-white text-sm font-semibold mb-1">Celular</label>
            <input
              id="celular"
              v-model="form.celular"
              type="tel"
              placeholder="Celular"
              class="w-full rounded-md bg-white/10 text-white placeholder-white/80 border border-white/20 px-4 py-2 outline-none focus:ring-2 focus:ring-white/40"
              required
            />

            <!-- Nombre -->
            <label for="nombre" class="block text-white text-sm font-semibold mb-1">Nombre</label>
            <input
              id="nombre"
              v-model="form.nombre"
              type="text"
              placeholder="Nombre"
              class="w-full rounded-md bg-white/10 text-white placeholder-white/80 border border-white/20 px-4 py-2 outline-none focus:ring-2 focus:ring-white/40"
              required
            />

            <!-- Mensaje -->
            <label for="mensaje" class="block text-white text-sm font-semibold mb-1">Mensaje</label>
            <textarea
              id="mensaje"
              v-model="form.mensaje"
              rows="3"
              placeholder="Mensaje"
              class="w-full rounded-md bg-white/10 text-white placeholder-white/80 border border-white/20 px-4 py-2 outline-none resize-none focus:ring-2 focus:ring-white/40"
              required
            ></textarea>

            <!-- Checkbox de aceptación -->
            <label class="flex items-start gap-3 text-white text-sm select-none">
              <input
                id="chk-politica"
                type="checkbox"
                v-model="policyAccepted"
                class="mt-1 h-4 w-4 rounded border-white/40 bg-white/10 text-[#509637] focus:ring-2 focus:ring-white/40"
                required
              />
              <span>
                He leído y acepto la
                <button
                  type="button"
                  @click="openModal"
                  class="underline hover:opacity-90"
                  :aria-expanded="showModal.toString()"
                  aria-controls="modal-politica"
                >
                  Política de Tratamiento de Datos Personales
                </button>.
              </span>
            </label>

            <!-- Botón bloqueado hasta aceptar -->
            <button
              type="submit"
              :disabled="!policyAccepted"
              class="w-full rounded-full bg-gradient-to-b from-[#509637] to-[#1A3012] text-white font-semibold py-3 shadow-lg hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Déjanos tus datos y te contactaremos
            </button>
          </form>
        </div>
      </div>

    </div>

    <!-- MODAL: Política de Tratamiento de Datos -->
    <div
      :class="[
        'fixed inset-0 z-50 flex items-center justify-center px-4',
        showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        'transition-opacity duration-200'
      ]"
      role="dialog"
      aria-modal="true"
      id="modal-politica"
      @keydown.esc="closeModal"
    >
      <!-- Fondo -->
      <div class="absolute inset-0 bg-black/60" @click="closeModal"></div>

      <!-- Contenido -->
      <div class="relative w-full max-w-3xl rounded-2xl bg-zinc-900 text-white border border-white/10 shadow-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 class="text-base font-semibold">{{ politica.title }}</h3>
          <button
            type="button"
            @click="closeModal"
            class="rounded-md px-2 py-1 text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-4">
          <p class="text-xs text-white/70">
            Versión {{ politica.version }} • Actualizado: {{ politica.updated_at }}
          </p>

          <p class="text-sm text-white/90">
            {{ politica.consent_text }}
          </p>

          <div v-if="politica.full_text?.length" class="space-y-3">
            <p
              v-for="(p, idx) in politica.full_text"
              :key="'ft-'+idx"
              class="text-white/80 text-sm leading-relaxed"
            >
              {{ p }}
            </p>
          </div>

          <div v-if="politica.sections?.length" class="space-y-4">
            <div v-for="(sec, i) in politica.sections" :key="i" class="space-y-1.5">
              <p class="font-semibold">{{ sec.heading }}</p>
              <p class="text-white/80 text-sm leading-relaxed">
                {{ sec.text }}
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 px-5 py-4 border-t border-white/10">
          <button
            type="button"
            @click="closeModal"
            class="rounded-full px-4 py-2 bg-white/10 hover:bg-white/15 text-white transition"
          >
            Cerrar
          </button>
          <button
            type="button"
            @click="acceptFromModal"
            class="rounded-full px-4 py-2 bg-gradient-to-b from-[#509637] to-[#1A3012] text-white font-semibold hover:opacity-95 transition"
          >
            Acepto la Política
          </button>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { reactive, ref, onBeforeUnmount } from 'vue'
import politicaRaw from '../data/politica_datos.json' // 👈 renombramos el import

// Normalizamos: si viene como array, usa el primer elemento; si viene como objeto, úsalo tal cual.
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

function closeModal () {
  showModal.value = false
  document.documentElement.classList.remove('overflow-hidden')
}

function acceptFromModal () {
  policyAccepted.value = true
  closeModal()
}

/** Seguridad: si el componente se desmonta, re-habilita el scroll */
onBeforeUnmount(() => {
  document.documentElement.classList.remove('overflow-hidden')
})

/** Envía los datos a WhatsApp (número destino configurable) */

function enviarWhatsapp () {
  const phone = '573004311280' // 57 + número, sin + ni espacios
  const safe = v => (v ?? '').toString().trim()

  const texto = [
    'Hola, me gustaría más información.',
    `- Nombre: ${safe(form.nombre)}`,
    `- Celular: ${safe(form.celular)}`,
    `- Ciudad: ${safe(form.ciudad)}`,
    `- Mensaje: ${safe(form.mensaje)}`
  ].join('\n')

  // ✅ Endpoint más compatible que wa.me
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(texto)}`

  // ✅ Evita bloqueadores (mejor que window.open para este caso)
  window.location.href = url
}

</script>

