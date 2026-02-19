<template>
  <section
    id="Proceso_pedido"
    ref="sectionRef"
    class="w-full"
    aria-labelledby="titulo-proceso-pedido"
  >
    <!-- Título -->
    <div
      class="w-full max-w-6xl mx-auto px-6 lg:px-8 pt-10"
      :class="visible ? 'opacity-100 translate-y-0 transition-all duration-700 ease-out' : 'opacity-0 translate-y-8'"
    >
      <h2
        id="titulo-proceso-pedido"
        class="text-center text-2xl font-bold mt-10"
      >
        Proceso de compra y envío en Volley Express Shop
      </h2>
      <p class="sr-only">
        Conoce cómo comprar artículos de voleibol en Volley Express Shop.
      </p>
    </div>

    <!-- ====== DESKTOP / TABLET ====== -->
    <div
      class="hidden md:grid max-w-6xl mx-auto px-4 lg:px-8 mt-26 gap-y-6 grid-cols-[1fr_auto_1fr_auto_1fr]"
    >
      <!-- Fila 1: números -->
      <div
        class="flex items-center justify-center"
        :class="visible ? 'opacity-100 translate-y-0 scale-100 transition-all duration-700 delay-100' : 'opacity-0 translate-y-8 scale-95'"
      >
        <span class="step-number">1</span>
      </div>
      <div
        class="flex items-center justify-center"
        :class="visible ? 'opacity-100 scale-110 animate-pulse transition duration-700 delay-200' : 'opacity-0 scale-90'"
      >
        <img src="../assets/arrow.svg" alt="flecha proceso compra" class="arrow-img" />
      </div>
      <div
        class="flex items-center justify-center"
        :class="visible ? 'opacity-100 translate-y-0 scale-100 transition-all duration-700 delay-300' : 'opacity-0 translate-y-8 scale-95'"
      >
        <span class="step-number blue">2</span>
      </div>
      <div
        class="flex items-center justify-center"
        :class="visible ? 'opacity-100 scale-110 animate-pulse transition duration-700 delay-400' : 'opacity-0 scale-90'"
      >
        <img src="../assets/arrow.svg" alt="flecha proceso compra" class="arrow-img" />
      </div>
      <div
        class="flex items-center justify-center"
        :class="visible ? 'opacity-100 translate-y-0 scale-100 transition-all duration-700 delay-500' : 'opacity-0 translate-y-8 scale-95'"
      >
        <span class="step-number">3</span>
      </div>

      <!-- Fila 2: íconos -->
      <div
        class="flex items-center justify-center p-4"
        :class="visible ? 'opacity-100 scale-100 transition-transform duration-700 delay-100 ease-out' : 'opacity-0 scale-75'"
      >
        <img src="../assets/whatsappl.svg" alt="Contacto WhatsApp compra voleibol" class="icon-img" />
      </div>
      <div></div>
      <div
        class="flex items-center justify-center p-4"
        :class="visible ? 'opacity-100 scale-100 transition-transform duration-700 delay-300 ease-out' : 'opacity-0 scale-75'"
      >
        <img src="../assets/proceso_pedido.webp" alt="Selección productos voleibol" class="icon-img" />
      </div>
      <div></div>
      <div
        class="flex items-center justify-center p-4"
        :class="visible ? 'opacity-100 scale-100 transition-transform duration-700 delay-500 ease-out' : 'opacity-0 scale-75'"
      >
        <img src="../assets/camion.svg" alt="Envío seguro productos deportivos" class="icon-img" />
      </div>

      <!-- Fila 3: textos -->
      <div
        class="px-2 text-center"
        :class="visible ? 'opacity-100 translate-y-0 transition-all duration-700 delay-100' : 'opacity-0 translate-y-6'"
      >
        <p class="text-base text-gray-700">
          <strong class="text-[#7ED321]">Paso 1:</strong>
          Contáctanos por WhatsApp para iniciar tu compra.
        </p>
      </div>
      <div></div>
      <div
        class="px-2 text-center"
        :class="visible ? 'opacity-100 translate-y-0 transition-all duration-700 delay-300' : 'opacity-0 translate-y-6'"
      >
        <p class="text-base text-gray-700">
          <strong class="text-[#7ED321]">Paso 2:</strong>
          Indícanos qué productos deseas adquirir.
        </p>
      </div>
      <div></div>
      <div
        class="px-2 pb-10 text-center"
        :class="visible ? 'opacity-100 translate-y-0 transition-all duration-700 delay-500' : 'opacity-0 translate-y-6'"
      >
        <p class="text-base text-gray-700">
          <strong class="text-[#7ED321]">Paso 3:</strong>
          Coordinamos el envío más conveniente para ti.
        </p>
      </div>
    </div>

    <!-- ====== MOBILE ====== -->
    <div class="md:hidden max-w-6xl mx-auto px-6 mt-6 space-y-6">
      <div
        class="step-mobile text-center"
        :class="visible ? 'opacity-100 translate-y-0 transition-all duration-700 delay-100' : 'opacity-0 translate-y-6'"
      >
        <span class="step-number">1</span>
        <img src="../assets/whatsappl.svg" class="icon-img" />
        <p>Contáctanos por WhatsApp y comienza tu compra.</p>
      </div>

      <div
        class="flex justify-center"
        :class="visible ? 'opacity-100 scale-110 animate-pulse transition duration-700 delay-200' : 'opacity-0 scale-90'"
      >
        <img src="../assets/arrow.svg" class="arrow-img rotate-90" />
      </div>

      <div
        class="step-mobile"
        :class="visible ? 'opacity-100 translate-y-0 transition-all duration-700 delay-300' : 'opacity-0 translate-y-6'"
      >
        <span class="step-number blue">2</span>
        <img src="../assets/proceso_pedido.webp" class="icon-img" />
        <p>Dinos qué productos deseas comprar.</p>
      </div>

      <div
        class="flex justify-center"
        :class="visible ? 'opacity-100 scale-110 animate-pulse transition duration-700 delay-400' : 'opacity-0 scale-90'"
      >
        <img src="../assets/arrow.svg" class="arrow-img rotate-90" />
      </div>

      <div
        class="step-mobile pb-10"
        :class="visible ? 'opacity-100 translate-y-0 transition-all duration-700 delay-500' : 'opacity-0 translate-y-6'"
      >
        <span class="step-number">3</span>
        <img src="../assets/camion.svg" class="icon-img" />
        <p>Recibe tu pedido de forma segura.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const visible = ref(false)

let observer
onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      visible.value = entry.isIntersecting // se activa cada vez que aparece
    },
    { threshold: 0.35 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
onUnmounted(() => {
  observer && observer.disconnect()
})
</script>

<style scoped>
.step-number {
  font-size: 4.5rem;
  font-weight: 800;
  background: linear-gradient(to bottom, #7ED321, #1A3012);
  -webkit-background-clip: text;
  color: transparent;
}
.step-number.blue {
  background: linear-gradient(to bottom, #6AD2E0, #2E6AA7);
  -webkit-background-clip: text;
}
.icon-img {
  width: 140px;
  height: 140px;
  object-fit: contain;
}
.arrow-img {
  width: 64px;
  height: 64px;
  opacity: 0.8;
}
.step-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: .75rem;
}
</style>
