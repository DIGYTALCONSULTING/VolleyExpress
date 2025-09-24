// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // 👇 MUY IMPORTANTE para GitHub Pages: usa el nombre EXACTO del repo
  base: '/VolleyExpressShop/',
  plugins: [
    vue(),
    tailwindcss(),
  ],
})
