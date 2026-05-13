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
        'Compra implementos de voleibol en Medellín: balones, rodilleras, accesorios y regalos deportivos. Atención por WhatsApp y envío nacional.',
      canonical: '/'
    }
  },
  {
    path: '/balones-voleibol',
    name: 'balones',
    component: Balones,
    meta: {
      title: 'Balones de Voleibol en Medellín | Volley Expres Shop',
      description:
        'Balones de voleibol Mikasa y Molten en Medellín. Opciones para entrenamiento y competencia con envío nacional por Volley Expres Shop.',
      canonical: '/balones-voleibol'
    }
  },
  {
    path: '/rodilleras-voleibol',
    name: 'rodilleras',
    component: Rodilleras,
    meta: {
      title: 'Rodilleras de Voleibol en Medellín | Volley Expres Shop',
      description:
        'Rodilleras de voleibol para entrenamiento y competencia en Medellín. Modelos Mizuno, Nike, Asics y más, con atención por WhatsApp.',
      canonical: '/rodilleras-voleibol'
    }
  },
  {
    path: '/accesorios-voleibol',
    name: 'accesorios',
    component: Accesorios,
    meta: {
      title: 'Accesorios de Voleibol en Medellín | Volley Expres Shop',
      description:
        'Accesorios y regalos de voleibol en Medellín: llaveros, collares, stickers y más. Compra online con envío nacional.',
      canonical: '/accesorios-voleibol'
    }
  }
]

const SITE_URL = 'https://volleyexpresshop.com'
const DEFAULT_IMAGE = `${SITE_URL}/logo_ves.png`

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

const ensureLinkTag = (rel) => {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  return tag
}

const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

router.afterEach((to) => {
  const title = to.meta?.title || 'Volley Expres Shop'
  const description = to.meta?.description || 'Tienda de implementos de voleibol en Medellín.'
  const canonical = absoluteUrl(to.meta?.canonical || to.path || '/')
  const image = to.meta?.image || DEFAULT_IMAGE

  document.title = title
  ensureMetaTag('description').setAttribute('content', description)
  ensureLinkTag('canonical').setAttribute('href', canonical)
  ensureOgTag('og:title').setAttribute('content', title)
  ensureOgTag('og:description').setAttribute('content', description)
  ensureOgTag('og:url').setAttribute('content', canonical)
  ensureOgTag('og:image').setAttribute('content', image)
  ensureMetaTag('twitter:title').setAttribute('content', title)
  ensureMetaTag('twitter:description').setAttribute('content', description)
  ensureMetaTag('twitter:image').setAttribute('content', image)
})

export default router
