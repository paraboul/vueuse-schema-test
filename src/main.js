import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createHead } from '@vueuse/head'
import { createSchemaOrg, useVueUseHead } from '@vueuse/schema-org'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const head = createHead()

  app.use(head)

  const schemaOrg = createSchemaOrg({
    head,
    canonicalHost: 'https://example.com',
    provider: {
      useRoute: () => router.currentRoute,
      setupDOM: useVueUseHead(head)
    }
  })
  schemaOrg.setupDOM()
  app.use(schemaOrg)


  app.use(router)
  return { app, router, head }
}
