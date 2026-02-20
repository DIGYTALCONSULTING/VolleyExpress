<template>
  <footer
    class="w-full bg-neutral-900 text-gray-400 digytal-footer"
    aria-label="Créditos del sitio y contacto del desarrollador"
  >
    <!-- Datos estructurados: Organization (no afecta UI) -->
    <div itemscope itemtype="https://schema.org/Organization" class="sr-only">
      <meta itemprop="name" content="Digytal Consulting" />
      <meta itemprop="url" content="https://wa.me/573144706996" />
      <meta itemprop="areaServed" content="Colombia" />
      <meta itemprop="knowsAbout" content="Desarrollo web, soluciones digitales, consultoría TI" />
    </div>

    <div
      class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-1 py-1 space-y-3 md:space-y-0"
    >
      <p class="text-xs text-center md:text-left leading-relaxed">
        Sitio web diseñado y desarrollado por
        <a
          href="https://wa.me/573144706996"
          target="_blank"
          rel="noopener noreferrer"
          class="ml-1 font-semibold text-[#00A884] hover:text-[#00C46E] transition-colors duration-300"
          aria-label="Contactar a Digytal Consulting por WhatsApp"
          title="Digytal Consulting · Desarrollo web y soluciones digitales"
        >
          <span itemprop="name">Digytal Consulting</span>
        </a>
        <span class="hidden sm:inline">—</span>
        <span class="block sm:inline">
          consultora en desarrollo web y soluciones digitales en Colombia.
        </span>

        <!-- Copy SEO invisible (no afecta UI) -->
        <span class="sr-only">
          Agencia de desarrollo web en Colombia. Diseño UX/UI, performance, SEO técnico y despliegues.
        </span>
      </p>

      <a
        href="https://wa.me/573144706996"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a Digytal Consulting por WhatsApp para hablar de un proyecto"
        class="flex items-center gap-2 bg-[#00A884] hover:bg-[#00C46E] text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-md transition-all duration-300"
        title="Hablemos de tu proyecto"
      >
        Contáctanos para hablar de tu proyecto
      </a>
    </div>
  </footer>
</template>
