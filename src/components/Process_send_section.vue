<!-- src/components/Process_send_section.vue -->
<template>
  <section id="process-send" class="w-full">
    <!-- Título -->
    <div class="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-8">
      <h2 class="text-center text-2xl font-bold">
        PROCESO DE PEDIDO
      </h2>
    </div>
    <!-- FILA 1: 1 -> 2 -> 3 -->
    <div class="w-full justify-between max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-4">
      <div class="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 lg:gap-20">
        <!-- 1 -->
        <span
          class="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-b from-[#7ED321] to-[#1A3012] bg-clip-text text-transparent select-none"
        >1</span>

        <!-- flecha -->
        <div class="w-12 h-12 md:w-16 md:h-16">
        <img src="../assets/arrow.svg" alt="flecha" class=""/>
        </div>    
        <!-- 2 -->
        <span
          class="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-b from-[#6AD2E0] to-[#2E6AA7] bg-clip-text text-transparent select-none"
        >2</span>

        <!-- flecha -->
        <div class="w-12 h-12 md:w-16 md:h-16">
        <img src="../assets/arrow.svg" alt="flecha" class=""/>
        </div>    
        <!-- 3 -->
        <span
          class="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-b from-[#7ED321] to-[#1A3012] bg-clip-text text-transparent select-none"
        >3</span>
      </div>
    </div>
    <!-- FILA 2: Iconos -->
    <div class="w-full flex flex-row max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-6 md:mt-10">
       <div class="flex-1 flex justify-center p-4">
        <img src="../assets/whatsappl.svg" alt="WhastApp" class="w-20 h-20" />
        </div>  

        <div class="flex-1 flex justify-center p-4">
        <img src="../assets/proceso_pedido.png" alt="balon_pedido" class="w-20 h-20" />
        </div>  

        <div class="flex-1 flex justify-center p-4">
        <img src="../assets/camion.svg" alt="camion" class="w-20 h-20" />
        </div>  
    </div>  
    
    <!-- FILA 3: Textos -->
    <div class="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-4 md:mt-6 pb-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <p class="text-center text-sm md:text-base text-gray-700">
          <span class="font-semibold text-[#7ED321]">1.</span>
          Contáctanos por WhatsApp haciendo clic en los botones verdes con el ícono de la app
          o directamente en el producto que te interese.
        </p>
        <p class="text-center text-sm md:text-base text-gray-700">
          <span class="font-semibold text-[#7ED321]">2.</span>
          Cuéntanos qué producto o productos quieres comprar.
        </p>
        <p class="text-center text-sm md:text-base text-gray-700">
          <span class="font-semibold text-[#7ED321]">3.</span>
          Acuerda con nosotros el método de envío para tu compra.
        </p>
      </div>
    </div>
  </section>
</template>


