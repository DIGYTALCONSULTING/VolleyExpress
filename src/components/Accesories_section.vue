<template>
  <!-- Sección general -->
  <section class="w-full">
    <!-- Título -->
    <div class="w-full text-left py-8 px-8">
      <h1 class="text-2xl font-bold">ACCESORIOS</h1>
    </div>

    <!-- Tarjetas de productos -->
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      <div
        v-for="(accesorio, index) in accesorios"
        :key="index"
        class="bg-amber-50 rounded-4xl shadow-2xl overflow-hidden p-2"
      >
        <img
          :src="accesorio.imagen"
          :alt="accesorio.nombre"
          class="w-full h-48 object-contain"
          loading="lazy"
        />
        <div class="p-4">
          <h3 class="text-2xl text-center font-bold mb-2">{{ accesorio.nombre }}</h3>
          <p class="text-gray-900 mb-4">{{ accesorio.descripcion }}</p>
          <p class="text-gray-900 font-bold text-center text-2xl mb-6">{{ accesorio.precio }}</p>

          <a
            :href="`https://wa.me/3183902084?text=Hola, estoy interesado en el accesorio ${accesorio.nombre}`"
            target="_blank"
            class="block w-full text-center"
          >
            <button
              class="bg-gradient-to-b from-[#509637] to-[#1A3012] text-white cursor-pointer rounded-full px-4 py-2 inline-flex flex-col items-center gap-0.5 w-full"
            >
              <span class="font-bold">Contáctanos</span>
              <span class="font-bold">WhatsApp</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import accesorios from '../data/accesorios.json'
</script>
