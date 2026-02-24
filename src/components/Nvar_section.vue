<template>
  <nav class="w-full bg-white shadow-md" aria-label="Navegación principal">
    <div class="px-4 py-4 md:px-4">
      <div class="flex items-center justify-between gap-3">
        <!-- Logo -->
        <div
          class="flex items-center justify-end lg:justify-start gap-6 md:gap-8 min-w-0 flex-1 pr-2 md:pr-0 order-2 lg:order-1"
        >
          <a href="#top" class="inline-flex items-center" aria-label="Ir al inicio">
            <img
              :src="logo"
              alt="Volley Expres Shop Medellín - tienda de implementos de voleibol"
              class="w-20 h-20 object-contain flex-shrink-0"
              width="80"
              height="80"
              loading="eager"
              decoding="async"
            />
          </a>
        </div>

        <!-- Links / Hamburguesa -->
        <div class="flex items-center order-1 lg:order-2">
          <!-- Links desktop -->
          <div class="hidden lg:flex lg:items-center lg:gap-x-4 lg:gap-y-2">
            <a class="cursor-pointer font-sans whitespace-nowrap lg:text-lg" href="#Implementos_Deportivos">
              Implementos
            </a>
            <a class="cursor-pointer font-sans whitespace-nowrap lg:text-lg" href="#Accesorios">
              Accesorios
            </a>
            <a class="cursor-pointer font-sans whitespace-nowrap lg:text-lg" href="#Peluches">
              Peluches
            </a>

            <!-- PDF desde /public -> ruta raíz -->

            <a class="cursor-pointer font-sans whitespace-nowrap lg:text-lg" href="#Proceso_pedido">
              Proceso de Pedido
            </a>
            <a class="cursor-pointer font-sans whitespace-nowrap lg:text-lg" href="#Conocenos">
              Conócenos
            </a>
          </div>

          <!-- Botón móvil -->
          <button
            type="button"
            class="block lg:hidden p-2 rounded focus:outline-none focus:ring focus:ring-gray-200 ml-2"
            aria-label="Abrir menú"
            aria-controls="mobile-menu"
            :aria-expanded="mobileOpen ? 'true' : 'false'"
            @click="mobileOpen = !mobileOpen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                v-if="!mobileOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Menú móvil -->
      <transition
        enter-active-class="transition-opacity duration-150 ease-linear"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-150 ease-linear"
        leave-to-class="opacity-0"
      >
        <div v-if="mobileOpen" id="mobile-menu" class="lg:hidden border-t">
          <div class="flex flex-col px-4 py-3 space-y-3">
            <a class="cursor-pointer text-base font-sans" href="#Implementos_Deportivos" @click="closeMobile">
              Implementos Deportivos
            </a>
            <a class="cursor-pointer text-base font-sans" href="#Accesorios" @click="closeMobile">
              Accesorios
            </a>
            <a class="cursor-pointer text-base font-sans" href="#Peluches" @click="closeMobile">
              Peluches
            </a>

            <!-- ✅ mismo id correcto -->
            <a class="cursor-pointer text-base font-sans" href="#Proceso_pedido" @click="closeMobile">
              Proceso de Pedido
            </a>

            <!-- ✅ PDF correcto -->
            
            <a class="cursor-pointer text-base font-sans" href="#Conocenos" @click="closeMobile">
              Contáctanos
            </a>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import logo from '../assets/Nvar_logo.webp' // ✅ Vite resuelve assets correctamente

const mobileOpen = ref(false)
const closeMobile = () => { mobileOpen.value = false }

const onResize = () => {
  if (window.innerWidth >= 1024 && mobileOpen.value) {
    mobileOpen.value = false
  }
}

onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))
</script>
