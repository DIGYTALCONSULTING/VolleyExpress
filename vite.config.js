// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/VolleyExpress/' : '/',
  build: { outDir: 'docs' },
  plugins: [vue(), tailwindcss()],
})
