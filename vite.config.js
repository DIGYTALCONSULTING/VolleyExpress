// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // 👇 nombre EXACTO del repo (respeta mayúsculas)
  base: '/VolleyExpress/',
  // 👇 GitHub Pages leerá /docs
  build: { outDir: 'docs' },
  plugins: [
    vue(),
    tailwindcss(),
  ],
})
