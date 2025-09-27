<!-- src/components/FooterSection.vue -->
<template>
  <footer class="w-full bg-white">
    <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <!-- Izquierda: texto -->
        <div class="flex flex-row items-center md:items-start gap-6 md:gap-12">
          <p class="text-center text-xl md:text-left font-bold leading-tight tracking-wide text-black">
            SOMOS LA MEJOR OPCIÓN EN<br />
            ARTÍCULOS DEPORTIVOS Y DETALLES DE VOLEY<br />
          </p>
        </div>

        <!-- Derecha: icono Instagram centrado -->
        <div class="flex justify-center items-center">
          <a
            :href="links.instagram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-20 h-20">
              <defs>
                <linearGradient id="IGgradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#feda75"/>
                  <stop offset="25%" stop-color="#fa7e1e"/>
                  <stop offset="50%" stop-color="#d62976"/>
                  <stop offset="75%" stop-color="#962fbf"/>
                  <stop offset="100%" stop-color="#4f5bd5"/>
                </linearGradient>
              </defs>
              <path fill="url(#IGgradient)" d="M34.5 3h-21A10.5 10.5 0 003 13.5v21A10.5 10.5 0 0013.5 45h21A10.5 10.5 0 0045 34.5v-21A10.5 10.5 0 0034.5 3zm-10.5 32a11 11 0 110-22 11 11 0 010 22zm12-19a2.5 2.5 0 11-5.001-.001A2.5 2.5 0 0136 16zM24 17a7 7 0 100 14 7 7 0 000-14z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const links = {
  instagram: 'https://www.instagram.com/volleyexpresshop/',
  whatsapp: 'https://wa.me/573004311280'
}
</script>



