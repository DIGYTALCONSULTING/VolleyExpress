<!-- src/components/FooterSection.vue -->
<template>
  <footer class="w-full bg-white">
    <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <!-- Izquierda: texto + redes -->
        <div class="flex flex-col items-center md:items-start gap-4">
          <p class="text-center md:text-left font-extrabold leading-tight tracking-wide text-black">
            SOMOS LA MEJOR<br />
            OPCIÓN EN ARTÍCULOS<br />
            DEPORTIVOS Y DETALLES<br />
            DE VOLEY
          </p>

          <div class="flex items-center gap-4">
            <a
              :href="links.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-10 h-10 rounded-md border border-black hover:shadow-md transition"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5 fill-black">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.2 0-74.7-33.4-74.7-74.7s33.4-74.7 74.7-74.7 74.7 33.4 74.7 74.7-33.5 74.7-74.7 74.7zM370.5 97c0 14.9-12.1 27-27 27-14.9 0-27-12.1-27-27s12.1-27 27-27 27 12.1 27 27zM398.8 80c-7.8-20.7-24.3-37.2-45-45C321.3 22.5 224 22.5 224 22.5s-97.3 0-129.8 12.6c-20.7 7.8-37.2 24.3-45 45C36.6 112.5 36.6 210 36.6 210s0 97.5 12.6 130c7.8 20.7 24.3 37.2 45 45C126.7 397.6 224 397.6 224 397.6s97.3 0 129.8-12.6c20.7-7.8 37.2-24.3 45-45 12.6-32.5 12.6-130 12.6-130s0-97.5-12.6-130z"/>
              </svg>
            </a>

            <a
              :href="links.whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-10 h-10 rounded-md border border-black hover:shadow-md transition"
              aria-label="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5 fill-black">
                <path d="M380.9 97.1C339-10.7 199.5-32 116.7 51 51.5 116.2 49.1 214.7 100 285.4L80 368l85.3-19.6c68.4 37.2 153.8 24.3 208.2-30.1 72.1-72.1 63.6-183.1 7.4-221.2zM224 338c-26.7 0-52.6-7.8-74.7-22.5l-5.4-3.6-50.7 11.6 10.8-49.6-3.8-5.6C81 239.7 73.9 213 73.9 186.2 73.9 120.6 127.9 66.5 193.5 66.5S313 120.6 313 186.2 269.5 338 224 338z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Derecha: tarjetas -->
        <div class="flex flex-row flex-wrap md:flex-nowrap gap-4 justify-center md:justify-start">
          <a
            v-for="(item, idx) in cards"
            :key="idx"
            :href="item.href"
            class="w-[150px] h-[140px] rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition"
          >
            <span class="text-center text-[13px] font-semibold leading-tight">
              <span class="block text-[#7ED321]">{{ item.titleTop }}</span>
              <span v-if="item.titleBottom" class="block text-[#7ED321]">{{ item.titleBottom }}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const links = {
  instagram: 'https://instagram.com/volleyexpressshop',
  whatsapp: 'https://wa.me/573183902084', // cambia al número real
}

const cards = [
  { titleTop: 'EVENTOS', titleBottom: '', href: '#eventos' },
  { titleTop: 'PEDIDOS', titleBottom: 'RECIBIDOS', href: '#pedidos' },
  { titleTop: 'NUESTROS', titleBottom: 'CLIENTES', href: '#clientes' },
]
</script>
