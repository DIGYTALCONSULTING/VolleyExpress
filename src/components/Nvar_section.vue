<template>
  <nav class="w-full bg-white shadow-md">
    <div class="px-4 py-0 md:px-4">
      <!-- Fila: Logo + Palabras (izquierda) | Hamburguesa / Links (derecha) -->
      <div class="flex items-center justify-between gap-3">
        <!-- Izquierda: Logo + Palabras -->
        <div class="flex items-center gap-10 min-w-0">
          <!-- Logo -->
          <img src="/src/assets/logo_ves.png" alt="Logo" class="w-20 h-20 object-contain flex-shrink-0" />

          <!-- Palabras -->
          <div class="flex flex-row">
            <img src="/src/assets/palabra_volley.png" alt="volley" class="w-30 h-20 flex-shrink-0" />
            <img src="/src/assets/palabra_express.png" alt="express" class="w-30 h-20 flex-shrink-0" />
            <img src="/src/assets/palabra_shop.png" alt="shop" class="hidden md:inline-block w-30 h-20 flex-shrink-0" />
          </div>
        </div>

        <!-- Desktop: links; Móvil/MD: botón hamburguesa -->
        <div class="flex items-center">
          <!-- Links SOLO desde lg en adelante -->
          <div class="hidden lg:flex lg:items-center lg:gap-x-4 lg:gap-y-2">
            <a class="cursor-pointer font-sans whitespace-nowrap lg:text-lg" href="#Implementos_Deportivos">Implementos</a>
            <a class="cursor-pointer font-sans whitespace-nowrap lg:text-lg" href="#Accesorios">Accesorios</a>
            <a class="cursor-pointer font-sans whitespace-nowrap lg:text-lg" href="#Peluches">Peluches</a>
            <a class="cursor-pointer font-sans whitespace-nowrap lg:text-lg" href="/public/catalogo_voleyexpress.pdf" download="VoleyExpressShop-Catalogo.pdf" rel="noopener">Catálogo</a>
            <a class="cursor-pointer font-sans whitespace-nowrap lg:text-lg" href="#Proceso_pedido">Proceso de Pedido</a>
            <a class="cursor-pointer font-sans whitespace-nowrap lg:text-lg" href="#Conocenos">Conócenos</a>
          </div>

          <!-- Botón hamburguesa visible en sm y md (y también hasta <lg) -->
          <button
            class="block lg:hidden p-2 rounded focus:outline-none focus:ring focus:ring-gray-200 ml-2"
            aria-label="Abrir menú"
            :aria-expanded="mobileOpen"
            @click="mobileOpen = !mobileOpen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Menú móvil (visible hasta <lg) -->
      <transition
        enter-active-class="transition-opacity duration-150 ease-linear"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-150 ease-linear"
        leave-to-class="opacity-0"
      >
        <div v-if="mobileOpen" class="lg:hidden border-t">
          <div class="flex flex-col px-4 py-3 space-y-3">
            <a class="cursor-pointer text-base font-sans" href="#Implementos_Deportivos" @click="closeMobile">Implementos Deportivos</a>
            <a class="cursor-pointer text-base font-sans" href="#Accesorios" @click="closeMobile">Accesorios</a>
            <a class="cursor-pointer text-base font-sans" href="#Peluches" @click="closeMobile">Peluches</a>
            <a class="cursor-pointer text-base font-sans" href="#Servicios" @click="closeMobile">Servicios</a>
            <a class="cursor-pointer text-base font-sans" href="#Proceso_pedido" @click="closeMobile">Proceso de Pedido</a>
            <a class="cursor-pointer text-base font-sans" href="#Catalogo_completo" @click="closeMobile">Catálogo completo</a>
            <a class="cursor-pointer text-base font-sans" href="#Contactanos" @click="closeMobile">Contáctanos</a>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const mobileOpen = ref(false)
const closeMobile = () => { mobileOpen.value = false }
</script>

<style>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>
