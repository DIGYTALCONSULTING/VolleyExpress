<template>
  <footer
    class="w-full relative overflow-hidden"
    aria-labelledby="footer-title"
    itemscope
    itemtype="https://schema.org/LocalBusiness"
  >
    <!-- SEO estructurado (no afecta UI) -->
    <meta itemprop="name" content="Volley Express Shop" />
    <meta itemprop="url" content="https://www.volleyexpressshop.com/" />
    <meta itemprop="areaServed" content="Medellín" />
    <meta itemprop="address" content="Medellín, Antioquia, Colombia" />
    <meta
      itemprop="description"
      content="Tienda de voleibol en Medellín: implementos, balones, accesorios y souvenirs. Atención por WhatsApp."
    />

    <!-- Glow superior sutil -->
    <div
      class="pointer-events-none absolute inset-x-0 -top-10 h-16 bg-gradient-to-b from-emerald-200/40 to-transparent"
      aria-hidden="true"
    ></div>

    <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <!-- Card/contendedor -->
      <div
        class="rounded-3xl bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 shadow-xl ring-1 ring-zinc-200/60 p-5 md:p-8"
      >
        <!-- Heading accesible (no altera UI) -->
        <h2 id="footer-title" class="sr-only">Footer Volley Express Shop Medellín</h2>

        <!-- Grid responsiva -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          <!-- Columna izquierda: mensaje -->
          <div class="text-center md:text-left">
            <p
              class="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-zinc-900"
            >
              <br class="hidden md:block" />
              <span
                class="bg-gradient-to-r from-lime-500 to-emerald-600 bg-clip-text text-transparent"
              >
                SOMOS LA MEJOR OPCIÓN EN ARTÍCULOS DEPORTIVOS Y SOUVENIRS DE VOLEY
              </span>
            </p>

            <!-- Copy SEO local (invisible) -->
            <p class="sr-only">
              Volley Express Shop en Medellín. Implementos, balones, accesorios y regalos deportivos de
              voleibol. Compra y atención por WhatsApp.
            </p>
          </div>

          <!-- Columna derecha -->
          <div class="flex flex-col gap-6">
            <!-- Instagram -->
            <div
              class="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-center sm:text-left"
            >
              <a
                :href="links.instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar Instagram de Volley Express Shop"
                class="group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-sm transition-transform group-hover:scale-105"
                  role="img"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient :id="igId" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#feda75" />
                      <stop offset="25%" stop-color="#fa7e1e" />
                      <stop offset="50%" stop-color="#d62976" />
                      <stop offset="75%" stop-color="#962fbf" />
                      <stop offset="100%" stop-color="#4f5bd5" />
                    </linearGradient>
                  </defs>
                  <path
                    :fill="`url(#${igId})`"
                    d="M34.5 3h-21A10.5 10.5 0 003 13.5v21A10.5 10.5 0 0013.5 45h21A10.5 10.5 0 0045 34.5v-21A10.5 10.5 0 0034.5 3zm-10.5 32a11 11 0 110-22 11 11 0 010 22zm12-19a2.5 2.5 0 11-5.001-.001A2.5 2.5 0 0136 16zM24 17a7 7 0 100 14 7 7 0 000-14z"
                  />
                </svg>
              </a>

              <div class="flex-shrink-0 max-w-xs sm:max-w-none">
                <p class="text-lg md:text-xl font-extrabold tracking-wide text-zinc-900">
                  VISÍTANOS EN INSTAGRAM
                </p>
                <p class="text-sm text-zinc-600">Contenido, ofertas y lanzamientos.</p>
              </div>
            </div>

            <!-- WhatsApp -->
            <div
              class="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-center sm:text-left"
            >
              <a
                :href="links.whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chatear por WhatsApp con Volley Express Shop"
                class="group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-sm transition-transform group-hover:scale-105"
                  role="img"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="waGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#25D366" />
                      <stop offset="100%" stop-color="#128C7E" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#waGradient)"
                    d="M24 4C12.95 4 4 12.72 4 23.45c0 4.19 1.37 8.06 3.69 11.23L6 44l9.6-1.55a20.4 20.4 0 008.4 1.8c11.05 0 20-8.72 20-19.45C44 12.72 35.05 4 24 4zm0 36.6c-2.7 0-5.33-.7-7.63-2.02l-.55-.32-5.7.92.94-5.43-.36-.56A16.8 16.8 0 017.4 23.45C7.4 14.7 14.78 7.6 24 7.6s16.6 7.1 16.6 15.85S33.22 40.6 24 40.6zm9.05-12.28c-.49-.25-2.9-1.42-3.35-1.58-.45-.17-.78-.25-1.1.25-.33.5-1.27 1.58-1.56 1.9-.29.33-.57.37-1.06.12-.49-.25-2.07-.75-3.94-2.4-1.46-1.28-2.45-2.86-2.74-3.34-.29-.5-.03-.77.22-1.01.23-.23.5-.58.74-.87.25-.29.33-.5.5-.83.17-.33.08-.62-.04-.87-.12-.25-1.1-2.6-1.51-3.56-.4-.96-.8-.83-1.1-.85h-.94c-.33 0-.87.12-1.33.62-.45.5-1.74 1.7-1.74 4.15s1.78 4.82 2.03 5.15c.25.33 3.5 5.3 8.49 7.43 1.19.5 2.11.8 2.83 1.02 1.19.37 2.27.32 3.13.2.96-.14 2.9-1.17 3.31-2.3.41-1.12.41-2.08.29-2.3-.12-.21-.45-.33-.94-.58z"
                  />
                </svg>
              </a>

              <div class="flex-shrink-0 max-w-xs sm:max-w-none">
                <p class="text-lg md:text-xl font-extrabold tracking-wide text-zinc-900">
                  CONTÁCTANOS POR WHATSAPP
                </p>
                <p class="text-sm text-zinc-600">Atención rápida y personalizada.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider inferior -->
        <div
          class="mt-6 border-t border-zinc-200/70 pt-4 flex flex-col md:flex-row items-center justify-center gap-3"
        >
          <p class="text-xs text-zinc-500 text-center md:text-left">
            © {{ year }} VolleyExpressShop. Todos los derechos reservados.
          </p>

          <!-- SEO: ubicación + contacto (visible discreto) -->
          <p class="text-xs text-zinc-500 text-center">Medellín, Colombia · Atención por WhatsApp</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const links = {
  instagram: 'https://www.instagram.com/volleyexpresshop/',
  whatsapp: 'https://wa.me/573004311280'
}

// Id estable para el gradient (evita Math.random() en cada render)
const igId = 'igGradientFooter'

// Evita new Date() directo en template
const year = computed(() => new Date().getFullYear())
</script>