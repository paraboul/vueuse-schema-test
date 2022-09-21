import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createHead } from '@vueuse/head'
import { installSchemaOrg } from '@vueuse/schema-org-vite/vite'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const head = createHead()

  app.use(head)

  const s = installSchemaOrg({ app, router }, {
    canonicalHost: 'https://www.test.org',
    defaultLanguage: "fr-FR",
})

  app.use(router)
  return { app, router, head }
}
