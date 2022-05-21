import App from './App.vue'
import { createSSRApp, reactive } from 'vue'
import { createRouter } from './router'
import { createHead } from '@vueuse/head'
import { createSchemaOrg } from '@vueuse/schema-org'

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
    useRoute: () => reactive({...router.currentRoute.value})
  })
  app.use(schemaOrg)

  app.use(router)
  return { app, router, head }
}
