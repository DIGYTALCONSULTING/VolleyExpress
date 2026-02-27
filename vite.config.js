import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

const prerenderRoutes = [
  '/',
  '/balones-voleibol',
  '/rodilleras-voleibol',
  '/accesorios-voleibol'
]

const optionalPlugins = []
if (process.env.PRERENDER === 'true') {
  try {
    const { default: prerender } = await import('vite-plugin-prerender')
    optionalPlugins.push(prerender({ routes: prerenderRoutes }))
  } catch (error) {
    console.warn(
      '[vite] PRERENDER=true pero falta vite-plugin-prerender. Instala la dependencia para habilitar prerender.'
    )
  }
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), ...optionalPlugins],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
