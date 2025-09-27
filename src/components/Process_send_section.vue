<!-- src/components/Process_send_section.vue -->
<template>
  <section id="Proceso_pedido" class="w-full">
    <!-- Título -->
    <div class="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-12">
      <h2 class="text-center text-2xl font-bold">PROCESO DE PEDIDO</h2>
    </div>

    <!-- ====== DESKTOP / TABLET (md+) ====== -->
    <!-- Grid de 5 columnas: num | flecha | num | flecha | num
         Filas: 1) números+flechas  2) íconos  3) textos
         Así todo queda perfectamente alineado por columnas -->
    <div class="hidden md:grid max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-26 gap-y-6"
         :class="['grid-cols-[1fr_auto_1fr_auto_1fr]']">
      <!-- FILA 1: Números + Flechas -->
      <div class="flex items-center justify-center">
        <span class="text-7xl md:text-7xl font-extrabold bg-gradient-to-b from-[#7ED321] to-[#1A3012] bg-clip-text text-transparent select-none">1</span>
      </div>
      <div class="flex items-center justify-center">
        <img src="../assets/arrow.svg" alt="flecha" class="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <div class="flex items-center justify-center">
        <span class="text-7xl md:text-7xl font-extrabold bg-gradient-to-b from-[#6AD2E0] to-[#2E6AA7] bg-clip-text text-transparent select-none">2</span>
      </div>
      <div class="flex items-center justify-center">
        <img src="../assets/arrow.svg" alt="flecha" class="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <div class="flex items-center justify-center">
        <span class="text-7xl md:text-7xl font-extrabold bg-gradient-to-b from-[#7ED321] to-[#1A3012] bg-clip-text text-transparent select-none">3</span>
      </div>

      <!-- FILA 2: Íconos -->
      <div class="flex items-center justify-center p-4">
        <img src="../assets/whatsappl.svg" alt="WhatsApp" class="w-[140px] h-[140px] object-contain" />
      </div>
      <div></div>
      <div class="flex items-center justify-center p-4">
        <img src="../assets/proceso_pedido.png" alt="balon_pedido" class="w-[140px] h-[140px] object-contain" />
      </div>
      <div></div>
      <div class="flex items-center justify-center p-4">
        <img src="../assets/camion.svg" alt="camion" class="w-[140px] h-[140px] object-contain" />
      </div>

      <!-- FILA 3: Textos -->
      <div class="px-2">
        <p class="text-center text-base text-gray-700">
          <span class="font-semibold text-[#7ED321]">1.</span>
          Contáctanos por WhatsApp haciendo clic en los botones verdes con el ícono de la app
          o directamente en el producto que te interese.
        </p>
      </div>
      <div></div>
      <div class="px-2">
        <p class="text-center text-base text-gray-700">
          <span class="font-semibold text-[#7ED321]">2.</span>
          Cuéntanos qué producto o productos quieres comprar.
        </p>
      </div>
      <div></div>
      <div class="px-2 pb-10">
        <p class="text-center text-base text-gray-700">
          <span class="font-semibold text-[#7ED321]">3.</span>
          Acuerda con nosotros el método de envío para tu compra.
        </p>
      </div>
    </div>

    <!-- ====== MOBILE (menor a md) ====== -->
    <!-- Apilado vertical, flecha rota (↓) entre pasos para claridad -->
    <div class="md:hidden max-w-6xl mx-auto px-6 mt-6 space-y-6">
      <!-- Paso 1 -->
      <div class="flex flex-col items-center text-center gap-3">
        <span class="text-6xl font-extrabold bg-gradient-to-b from-[#7ED321] to-[#1A3012] bg-clip-text text-transparent select-none">1</span>
        <img src="../assets/whatsappl.svg" alt="WhatsApp" class="w-[120px] h-[120px] object-contain" />
        <p class="text-lg text-gray-700">
          <span class="font-semibold text-[#7ED321]">1.</span>
          Contáctanos por WhatsApp con los botones verdes o desde el producto.
        </p>
      </div>

      <!-- Flecha vertical -->
      <div class="flex justify-center">
        <img src="../assets/arrow.svg" alt="flecha" class="w-10 h-10 rotate-90 opacity-80" />
      </div>

      <!-- Paso 2 -->
      <div class="flex flex-col items-center text-center gap-3">
        <span class="text-6xl font-extrabold bg-gradient-to-b from-[#6AD2E0] to-[#2E6AA7] bg-clip-text text-transparent select-none">2</span>
        <img src="../assets/proceso_pedido.png" alt="balon_pedido" class="w-[120px] h-[120px] object-contain" />
        <p class="text-lg text-gray-700">
          <span class="font-semibold text-[#7ED321]">2.</span>
          Cuéntanos qué producto o productos quieres comprar.
        </p>
      </div>

      <!-- Flecha vertical -->
      <div class="flex justify-center">
        <img src="../assets/arrow.svg" alt="flecha" class="w-10 h-10 rotate-90 opacity-80" />
      </div>

      <!-- Paso 3 -->
      <div class="flex flex-col items-center text-center gap-3 pb-10">
        <span class="text-6xl font-extrabold bg-gradient-to-b from-[#7ED321] to-[#1A3012] bg-clip-text text-transparent select-none">3</span>
        <img src="../assets/camion.svg" alt="camion" class="w-[120px] h-[120px] object-contain" />
        <p class="text-lg text-gray-700">
          <span class="font-semibold text-[#7ED321]">3.</span>
          Acuerda con nosotros el método de envío para tu compra.
        </p>
      </div>
    </div>
  </section>
</template>
