<script setup>
import Nvar_section from './components/Nvar_section.vue'
import Footer_section from './components/Footer_section.vue'
import Firma_DG from './components/Firma_DG.vue'
import PichuChatbot from './components/PichuChatbot.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- Navegación -->
  <Nvar_section msg="" />

  <!-- CONTENIDO PRINCIPAL -->
  <main>
    <RouterView />
  </main>

  <!-- Footer -->
  <footer>
    <Footer_section msg="" />
    <Firma_DG msg="" />
  </footer>

  <!-- Chatbot (fuera del flujo principal) -->
  <PichuChatbot msg="" />
</template>
