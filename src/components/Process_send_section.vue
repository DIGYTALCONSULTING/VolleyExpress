<template>
  <section
    id="Proceso_pedido"
    ref="sectionRef"
    class="w-full scroll-mt-24"
    aria-labelledby="titulo-proceso-pedido"
    itemscope
    itemtype="https://schema.org/HowTo"
  >
    <!-- SEO/Schema HowTo (no altera UI) -->
    <meta itemprop="name" content="Proceso de compra y envío de implementos de voleibol en Medellín | Volley Expres Shop" />
    <meta itemprop="description" content="Cómo comprar implementos, accesorios, variedades y regalos de voleibol por WhatsApp en Volley Expres Shop, con entrega en Medellín y Área Metropolitana." />
    <meta itemprop="totalTime" content="PT5M" />
    <meta itemprop="supply" content="WhatsApp" />
    <meta itemprop="tool" content="Teléfono móvil" />

    <!-- Título -->
    <div
      class="w-full max-w-6xl mx-auto px-6 lg:px-8 pt-10"
      :class="visible ? 'opacity-100 translate-y-0 transition-all duration-700 ease-out' : 'opacity-0 translate-y-8'"
    >
      <h2
        id="titulo-proceso-pedido"
        class="text-center text-2xl font-bold mt-10"
      >
        Proceso de compra y envío en Medellín | Volley Expres Shop
      </h2>

      <!-- Copy visible corto (SEO + conversión sin romper UI) -->
      <p class="mt-2 text-gray-700 text-center">
        Compra implementos de voleibol por WhatsApp y recibe tu pedido en Medellín y Área Metropolitana en 3 pasos.
      </p>

      <!-- Copy SEO invisible -->
      <p class="sr-only">
        Cómo comprar implementos, accesorios, variedades y regalos de voleibol en Medellín con Volley Expres Shop:
        contacto por WhatsApp, selección de productos y coordinación de envío.
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
        itemprop="step"
        itemscope
        itemtype="https://schema.org/HowToStep"
      >
        <meta itemprop="name" content="Escríbenos por WhatsApp" />
        <meta itemprop="position" content="1" />
        <meta itemprop="text" content="Contáctanos por WhatsApp para iniciar tu compra de implementos de voleibol en Medellín." />
        <span class="step-number" aria-label="Paso 1">1</span>
      </div>

      <div
        class="flex items-center justify-center"
        :class="visible ? 'opacity-100 scale-110 animate-pulse transition duration-700 delay-200' : 'opacity-0 scale-90'"
        aria-hidden="true"
      >
        <img src="../assets/arrow.svg" alt="Flecha del proceso de compra" class="arrow-img" />
      </div>

      <div
        class="flex items-center justify-center"
        :class="visible ? 'opacity-100 translate-y-0 scale-100 transition-all duration-700 delay-300' : 'opacity-0 translate-y-8 scale-95'"
        itemprop="step"
        itemscope
        itemtype="https://schema.org/HowToStep"
      >
        <meta itemprop="name" content="Elige tus productos" />
        <meta itemprop="position" content="2" />
        <meta itemprop="text" content="Indícanos qué implementos, accesorios o regalos de voleibol deseas comprar." />
        <span class="step-number blue" aria-label="Paso 2">2</span>
      </div>

      <div
        class="flex items-center justify-center"
        :class="visible ? 'opacity-100 scale-110 animate-pulse transition duration-700 delay-400' : 'opacity-0 scale-90'"
        aria-hidden="true"
      >
        <img src="../assets/arrow.svg" alt="Flecha del proceso de compra" class="arrow-img" />
      </div>

      <div
        class="flex items-center justify-center"
        :class="visible ? 'opacity-100 translate-y-0 scale-100 transition-all duration-700 delay-500' : 'opacity-0 translate-y-8 scale-95'"
        itemprop="step"
        itemscope
        itemtype="https://schema.org/HowToStep"
      >
        <meta itemprop="name" content="Coordinamos el envío" />
        <meta itemprop="position" content="3" />
        <meta itemprop="text" content="Coordinamos el envío más conveniente para tu entrega en Medellín y Área Metropolitana." />
        <span class="step-number" aria-label="Paso 3">3</span>
      </div>

      <!-- Fila 2: íconos -->
      <div
        class="flex items-center justify-center p-4"
        :class="visible ? 'opacity-100 scale-100 transition-transform duration-700 delay-100 ease-out' : 'opacity-0 scale-75'"
      >
        <img src="../assets/whatsappl.svg" alt="WhatsApp para comprar implementos de voleibol en Medellín" class="icon-img" />
      </div>
      <div></div>
      <div
        class="flex items-center justify-center p-4"
        :class="visible ? 'opacity-100 scale-100 transition-transform duration-700 delay-300 ease-out' : 'opacity-0 scale-75'"
      >
        <img src="../assets/proceso_pedido.webp" alt="Selección de productos de voleibol en Volley Expres Shop" class="icon-img" />
      </div>
      <div></div>
      <div
        class="flex items-center justify-center p-4"
        :class="visible ? 'opacity-100 scale-100 transition-transform duration-700 delay-500 ease-out' : 'opacity-0 scale-75'"
      >
        <img src="../assets/camion.svg" alt="Envío y entrega de productos deportivos en Medellín" class="icon-img" />
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
        <span class="step-number" aria-label="Paso 1">1</span>
        <img src="../assets/whatsappl.svg" class="icon-img" alt="WhatsApp para comprar voleibol en Medellín" />
        <p>Contáctanos por WhatsApp y comienza tu compra.</p>
      </div>

      <div
        class="flex justify-center"
        :class="visible ? 'opacity-100 scale-110 animate-pulse transition duration-700 delay-200' : 'opacity-0 scale-90'"
        aria-hidden="true"
      >
        <img src="../assets/arrow.svg" class="arrow-img rotate-90" alt="Flecha del proceso" />
      </div>

      <div
        class="step-mobile"
        :class="visible ? 'opacity-100 translate-y-0 transition-all duration-700 delay-300' : 'opacity-0 translate-y-6'"
      >
        <span class="step-number blue" aria-label="Paso 2">2</span>
        <img src="../assets/proceso_pedido.webp" class="icon-img" alt="Selección de productos de voleibol" />
        <p>Dinos qué productos deseas comprar.</p>
      </div>

      <div
        class="flex justify-center"
        :class="visible ? 'opacity-100 scale-110 animate-pulse transition duration-700 delay-400' : 'opacity-0 scale-90'"
        aria-hidden="true"
      >
        <img src="../assets/arrow.svg" class="arrow-img rotate-90" alt="Flecha del proceso" />
      </div>

      <div
        class="step-mobile pb-10"
        :class="visible ? 'opacity-100 translate-y-0 transition-all duration-700 delay-500' : 'opacity-0 translate-y-6'"
      >
        <span class="step-number" aria-label="Paso 3">3</span>
        <img src="../assets/camion.svg" class="icon-img" alt="Envío y entrega en Medellín" />
        <p>Recibe tu pedido de forma segura.</p>
      </div>
    </div>

    <!-- ====== FAQ (VISIBLE) ====== -->
    <div
      class="max-w-6xl mx-auto px-6 lg:px-8 pb-10"
      itemscope
      itemtype="https://schema.org/FAQPage"
      aria-labelledby="faq-proceso-title"
    >
      <h3 id="faq-proceso-title" class="text-center text-xl font-bold mt-8">
        Preguntas frecuentes sobre compras y envíos en Medellín
      </h3>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Q1 -->
        <details class="rounded-2xl border border-gray-200 bg-white p-4" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <summary class="cursor-pointer font-semibold text-gray-900" itemprop="name">
            ¿Cómo hago un pedido por WhatsApp?
          </summary>
          <div class="mt-2 text-gray-700" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">
              Escríbenos por WhatsApp, indícanos el producto (o referencia) que te interesa y te confirmamos precio, disponibilidad y opciones de entrega en todo el país.
            </p>
          </div>
        </details>

        <!-- Q2 -->
        <details class="rounded-2xl border border-gray-200 bg-white p-4" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <summary class="cursor-pointer font-semibold text-gray-900" itemprop="name">
            ¿Realizan entregas en Medellín y el Área Metropolitana?
          </summary>
          <div class="mt-2 text-gray-700" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">
              Sí. Coordinamos el envío más conveniente según tu ubicación dentro de Medellín y el Área Metropolitana, y te compartimos el detalle por WhatsApp.
            </p>
          </div>
        </details>

        <!-- Q3 -->
        <details class="rounded-2xl border border-gray-200 bg-white p-4" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <summary class="cursor-pointer font-semibold text-gray-900" itemprop="name">
            ¿Puedo comprar implementos, accesorios y regalos en un solo pedido?
          </summary>
          <div class="mt-2 text-gray-700" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">
              Sí. Puedes combinar implementos (balones, rodilleras), accesorios y variedades (llaveros, peluches) en un mismo pedido; te ayudamos a armarlo por WhatsApp.
            </p>
          </div>
        </details>

        <!-- Q4 -->
        <details class="rounded-2xl border border-gray-200 bg-white p-4" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <summary class="cursor-pointer font-semibold text-gray-900" itemprop="name">
            ¿Qué información debo enviar para coordinar el envío?
          </summary>
          <div class="mt-2 text-gray-700" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">
              Compártenos el producto que deseas, tu barrio o punto de entrega y un número de contacto. Con eso te confirmamos el costo y el tiempo estimado de entrega.
            </p>
          </div>
        </details>
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
