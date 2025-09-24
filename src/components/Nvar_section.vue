<template>
  <nav class="w-full bg-white shadow-md">
    <!-- Barra superior -->
    <div class="flex items-center px-4 py-3 md:px-6">
      <!-- Botón hamburguesa (solo móvil) -->
      <button
        class="block md:hidden p-2 rounded focus:outline-none focus:ring focus:ring-gray-200"
        aria-label="Abrir menú"
        :aria-expanded="mobileOpen"
        @click="mobileOpen = !mobileOpen"
      >
        <!-- Ícono hamburguesa simple -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Logo (derecha en móvil, izquierda en md+) -->
      <div class="ml-auto md:ml-0">
        <img src="/src/assets/Nvar_logo.png" alt="Logo" class="w-20 h-20" />
      </div>
      <!-- Links desktop (derecha en md+) -->
      <div class="hidden md:flex md:ml-auto md:items-center md:space-x-6">
        <a class="cursor-pointer text-lg font-sans" href="#Implementos_Deportivos">Implementos Deportivos</a>
        <a class="cursor-pointer text-lg font-sans" href="#Accesorios">Accesorios</a>
        <a class="cursor-pointer text-lg font-sans" href="#Peluches">Peluches</a>
        <a class="cursor-pointer text-lg font-sans" href="#Catalogo_completo">Catálogo completo</a>
        <a class="cursor-pointer text-lg font-sans" href="#Proceso_pedido">Proceso de Pedido</a>
        <a class="cursor-pointer text-lg font-sans" href="#Conocenos">Conócenos</a>
      </div>
    </div>

    <!-- Menú móvil desplegable -->
    <transition
      enter-active-class="transition-opacity duration-150 ease-linear"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150 ease-linear"
      leave-to-class="opacity-0"
    >
      <div v-if="mobileOpen" class="md:hidden border-t">
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
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const mobileOpen = ref(false)
const closeMobile = () => { mobileOpen.value = false }
</script>
