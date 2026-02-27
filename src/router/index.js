import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Balones from '../views/Balones.vue'
import Rodilleras from '../views/Rodilleras.vue'
import Accesorios from '../views/Accesorios.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Implementos de Voleibol en Medellín | Balones y Accesorios | Volley Expres Shop',
      description:
        'Compra implementos de voleibol en Medellín: balones, rodilleras, accesorios y regalos deportivos. Atención por WhatsApp y envío nacional.'
    }
  },
  {
    path: '/balones-voleibol',
    name: 'balones',
    component: Balones,
    meta: {
      title: 'Balones de Voleibol en Medellín | Volley Expres Shop',
      description:
        'Balones de voleibol Mikasa y Molten en Medellín. Opciones para entrenamiento y competencia con envío nacional por Volley Expres Shop.'
    }
  },
  {
    path: '/rodilleras-voleibol',
    name: 'rodilleras',
    component: Rodilleras,
    meta: {
      title: 'Rodilleras de Voleibol en Medellín | Volley Expres Shop',
      description:
        'Rodilleras de voleibol para entrenamiento y competencia en Medellín. Modelos Mizuno, Nike, Asics y más, con atención por WhatsApp.'
    }
  },
  {
    path: '/accesorios-voleibol',
    name: 'accesorios',
    component: Accesorios,
    meta: {
      title: 'Accesorios de Voleibol en Medellín | Volley Expres Shop',
      description:
        'Accesorios y regalos de voleibol en Medellín: llaveros, collares, stickers y más. Compra online con envío nacional.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

const ensureMetaTag = (name) => {
  let tag = document.head.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  return tag
}

const ensureOgTag = (property) => {
  let tag = document.head.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  return tag
}

router.afterEach((to) => {
  const title = to.meta?.title || 'Volley Expres Shop'
  const description = to.meta?.description || 'Tienda de implementos de voleibol en Medellín.'

  document.title = title
  ensureMetaTag('description').setAttribute('content', description)
  ensureOgTag('og:title').setAttribute('content', title)
  ensureOgTag('og:description').setAttribute('content', description)
})

export default router
