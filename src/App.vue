<script setup>
import Hero_section from './components/Hero_section.vue'
import Nvar_section from './components/Nvar_section.vue'
import Implements_section from './components/Implements_section.vue'
import Accesories_section from './components/Accesories_section.vue'
import Peluches_section from './components/Peluches_section.vue'
import Conocenos_section from './components/Conocenos_section.vue'
import process_send_section from './components/Process_send_section.vue'
import Footer_section from './components/Footer_section.vue'
import Firma_DG from './components/Firma_DG.vue'
import PichuChatbot from './components/PichuChatbot.vue'
</script>

<template>
  <!-- Navegación -->
  <Nvar_section msg="" />

  <!-- CONTENIDO PRINCIPAL -->
  <main>

    <!-- Hero -->
    <section>
      <Hero_section msg="" />
    </section>

    <!-- Implementos -->
    <section>
      <Implements_section msg="" />
    </section>

    <!-- Accesorios -->
    <section>
      <Accesories_section msg="" />
    </section>

    <!-- Peluches -->
    <section>
      <Peluches_section msg="" />
    </section>

    <!-- Proceso de envío -->
    <section>
      <process_send_section msg="" />
    </section>

    <!-- Conócenos / confianza -->
    <section>
      <Conocenos_section msg="" />
    </section>

  </main>

  <!-- Footer -->
  <footer>
    <Footer_section msg="" />
    <Firma_DG msg="" />
  </footer>

  <!-- Chatbot (fuera del flujo principal) -->
  <PichuChatbot msg="" />
</template>

