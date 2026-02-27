<script setup>
import HeroSection from '../components/Hero_section.vue'
import ImplementsSection from '../components/Implements_section.vue'
import ProcessSendSection from '../components/Process_send_section.vue'
import ConocenosSection from '../components/Conocenos_section.vue'
</script>

<template>
  <section>
    <HeroSection />
  </section>
  <section>
    <ImplementsSection productType="balones" />
  </section>
  <section>
    <ProcessSendSection />
  </section>
  <section>
    <ConocenosSection />
  </section>
</template>
