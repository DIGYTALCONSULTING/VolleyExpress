<!-- src/components/FooterSection.vue -->
<template>
  <footer class="w-full relative overflow-hidden">
    <!-- Glow superior sutil -->
    <div class="pointer-events-none absolute inset-x-0 -top-10 h-16 bg-gradient-to-b from-emerald-200/40 to-transparent"></div>

    <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <!-- Card/contendedor -->
      <div class="rounded-3xl bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 shadow-xl ring-1 ring-zinc-200/60 p-5 md:p-8">
        <!-- Grid responsiva -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">

          <!-- Columna izquierda: mensaje -->
          <div class="text-center md:text-left">
            <p class="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-zinc-900">
              SOMOS LA MEJOR OPCIÓN EN ARTÍCULOS<br class="hidden md:block" />
              <span class="bg-gradient-to-r from-lime-500 to-emerald-600 bg-clip-text text-transparent">
                DEPORTIVOS Y DETALLES DE VOLEY
              </span>
            </p>
            <p class="mt-3 text-sm md:text-base text-zinc-600">
              Calidad, estilo y pasión por el voleibol. ¡Síguenos y escríbenos!
            </p>

            <!-- CTAs (se muestran centrados en móvil, alineados en md+) -->
            <div class="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <!-- WhatsApp -->
              <a
                :href="links.whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition"
                aria-label="Escríbenos por WhatsApp"
              >
                <!-- Icono WA -->
                <svg viewBox="0 0 32 32" class="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M19.11 17.36c-.28-.14-1.62-.8-1.87-.89-.25-.1-.43-.14-.62.14-.18.28-.71.89-.87 1.07-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28 0-.43.12-.57.12-.12.28-.32.42-.49.14-.16.18-.28.28-.46.1-.18.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.52-.44-.45-.62-.46l-.53-.01c-.18 0-.49.07-.75.35-.25.28-.97.95-.97 2.31 0 1.36.99 2.67 1.13 2.86.14.18 1.95 2.98 4.74 4.18.66.29 1.17.46 1.57.59.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.53-.32zM16.02 3.2C9.85 3.2 4.8 8.22 4.8 14.35c0 2.5.81 4.81 2.19 6.68L6 28.8l7.94-1.99c1.79.99 3.85 1.55 6.07 1.55 6.17 0 11.22-5.02 11.22-11.15S22.19 3.2 16.02 3.2zm0 20.4c-1.99 0-3.84-.59-5.38-1.6l-.39-.25-4.72 1.18 1.25-4.52-.26-.41a9.2 9.2 0 0 1-1.49-5.06c0-5.06 4.15-9.16 9.25-9.16 5.09 0 9.25 4.1 9.25 9.16 0 5.06-4.16 9.16-9.25 9.16z"/>
                </svg>
                WhatsApp
              </a>

              <!-- Enlace Instagram (texto) -->
              <a
                :href="links.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 ring-1 ring-emerald-200 transition"
                aria-label="Síguenos en Instagram"
              >
                Ver Instagram
              </a>
            </div>
          </div>

          <!-- Columna derecha: bloque Instagram con icono grande -->
          <div class="flex items-center justify-center md:justify-end gap-4">
            <a
              :href="links.instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="group"
            >
              <!-- Ícono Instagram con gradiente -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                   class="w-20 h-20 md:w-24 md:h-24 drop-shadow-sm transition-transform group-hover:scale-105">
                <defs>
                  <!-- id único para evitar colisiones de gradientes -->
                  <linearGradient :id="igId" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#feda75"/>
                    <stop offset="25%" stop-color="#fa7e1e"/>
                    <stop offset="50%" stop-color="#d62976"/>
                    <stop offset="75%" stop-color="#962fbf"/>
                    <stop offset="100%" stop-color="#4f5bd5"/>
                  </linearGradient>
                </defs>
                <path :fill="`url(#${igId})`" d="M34.5 3h-21A10.5 10.5 0 003 13.5v21A10.5 10.5 0 0013.5 45h21A10.5 10.5 0 0045 34.5v-21A10.5 10.5 0 0034.5 3zm-10.5 32a11 11 0 110-22 11 11 0 010 22zm12-19a2.5 2.5 0 11-5.001-.001A2.5 2.5 0 0136 16zM24 17a7 7 0 100 14 7 7 0 000-14z"/>
              </svg>
            </a>

            <div class="flex-shrink-0 text-center md:text-left">
              <p class="text-lg md:text-xl font-extrabold tracking-wide text-zinc-900">
                VISÍTANOS EN INSTAGRAM
              </p>
              <p class="text-sm text-zinc-600">Contenido, ofertas y lanzamientos.</p>
            </div>
          </div>

        </div>

        <!-- Divider inferior -->
        <div class="mt-6 border-t border-zinc-200/70 pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p class="text-xs text-zinc-500 text-center md:text-left">
            © {{ new Date().getFullYear() }} VolleyExpressShop. Todos los derechos reservados.
          </p>
          <div class="flex items-center gap-4">
            <a :href="links.instagram" target="_blank" rel="noopener noreferrer" class="text-xs text-emerald-700 hover:underline">Instagram</a>
            <a :href="links.whatsapp"  target="_blank" rel="noopener noreferrer" class="text-xs text-emerald-700 hover:underline">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

// Enlaces (mantener)
const links = {
  instagram: 'https://www.instagram.com/volleyexpresshop/',
  whatsapp: 'https://wa.me/573004311280'
}

// Para evitar colisiones si reusas el componente más de una vez
const igId = computed(() => `IGgradient-${Math.random().toString(36).slice(2)}`)
</script>
