<template>
  <div class="flex flex-col md:flex-row w-full">
    <!-- Div izquierdo -->
    <div class="w-full flex flex-col items-center gap-20">
      <!-- Video arriba -->
      <div class="w-full flex justify-center p-8">
        <video
          autoplay
          muted
          loop
          playsinline
          src="../assets/Hero_video.mp4"
          class="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover z-10 animate__animated animate__lightSpeedInRight"
        ></video>
      </div>

      <!-- Botón abajo -->
      <div class="w-full flex justify-center">
        <a href="https://wa.me/3183902084" target="_blank" class="block w-full text-center sm:w-auto">
          <button
            class="bg-gradient-to-b from-[#509637] to-[#1A3012] text-white cursor-pointer rounded-full px-8 py-2 inline-flex flex-col items-center gap-0.5"
          >
            <span class="font-bold">Contáctanos</span>
            <span class="font-bold">WhatsApp</span>
          </button>
        </a>
      </div>
    </div>

    <!-- Div General -->
    <div class="flex flex-col w-full gap-4 items-center px-4 md:px-8">
      <!-- Tarjetas dinámicas -->
      <div class="flex flex-row p-4 items-center gap-4 flex-wrap justify-center md:flex-nowrap">
        <div
          v-for="p in productos"
          :key="p.id"
          class="max-w-xs bg-white rounded-3xl overflow-hidden text-center p-4 drop-shadow-[10px_10px_25px_rgba(80,150,55,0.6)] flex-1 basis-48 md:basis-auto"
        >
          <img
            :src="p.imagen"
            :alt="p.nombre"
            class="mx-auto w-40 h-40 object-contain"
          />
          <h3 class="mt-4 text-lg font-bold text-gray-800">
            {{ p.nombre }}
          </h3>
          <p class="text-sm text-gray-600 mt-1 line-clamp-2">
            {{ p.descripcion }}
          </p>
          <p class="text-base font-semibold text-gray-900 mt-2">
            {{ p.precio }}
          </p>
        </div>
      </div>

      <!-- Botón -->
      <div class="mb-6 w-full flex justify-center">
        <a href="https://wa.me/3183902084" target="_blank" class="block w-full text-center sm:w-auto">
          <button
            class="bg-gradient-to-b from-[#509637] to-[#1A3012] text-white cursor-pointer rounded-full px-8 py-2 inline-flex flex-col items-center gap-0.5"
          >
            <span class="font-bold">Contáctanos</span>
            <span class="font-bold">WhatsApp</span>
          </button>
        </a>
      </div>

      <!-- Sección categorías -->
      <div class="flex flex-row items-center gap-4 md:gap-12 flex-wrap justify-center md:flex-nowrap">
        <div class="w-full sm:w-auto flex justify-center">
          <a href="https://wa.me/3183902084" target="_blank" class="block w-full text-center sm:w-auto">
            <button
              class="bg-gradient-to-b from-[#212121] to-[#878787] text-[#7ED321] cursor-pointer rounded-xl px-8 py-6 inline-flex flex-col items-center gap-0.5"
            >
              <span class="font-bold">IMPLEMENTOS</span>
              <span class="font-bold">DEPORTIVOS</span>
            </button>
          </a>
        </div>

        <div class="w-full sm:w-auto flex justify-center">
          <a href="https://wa.me/3183902084" target="_blank" class="block w-full text-center sm:w-auto">
            <button
              class="bg-gradient-to-b from-[#212121] to-[#878787] text-[#7ED321] cursor-pointer rounded-xl px-8 py-6 inline-flex flex-col items-center gap-0.5"
            >
              <span class="font-bold">ACCESORIOS</span>
              <span class="font-bold">DEPORTIVOS</span>
            </button>
          </a>
        </div>

        <div class="w-full sm:w-auto flex justify-center">
          <a href="https://wa.me/3183902084" target="_blank" class="block w-full text-center sm:w-auto">
            <button
              class="bg-gradient-to-b from-[#212121] to-[#878787] text-[#7ED321] cursor-pointer rounded-xl px-8 py-6 inline-flex flex-col items-center gap-0.5"
            >
              <span class="font-bold">BALONES</span>
              <span class="font-bold">DE PELUCHE</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import productos from '../data/productos_hero.json';
</script>
