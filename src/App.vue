<template>
  <div>
    <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>
    <router-view v-slot="{ Component }">
      <Suspense>
        <div>
          <component :is="Component" />
        </div>
      </Suspense>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useSchemaOrg, defineWebPage, defineOrganization, defineWebSite, SchemaOrgDebug } from '@vueuse/schema-org/runtime'

useHead({
  title: "Title from vueuse-head"
})

useSchemaOrg([
  // https://vue-schema-org.netlify.app/guide/guides/identity.html
  // @todo select appropriate identity
  // https://vue-schema-org.netlify.app/schema/website.html
  defineWebSite({
    name: 'My Awesome Site',
  }),
  // https://vue-schema-org.netlify.app/schema/webpage.html
  defineWebPage(),
])

</script>

<style>
@font-face {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('./assets/fonts/Inter-Italic.woff2#iefix') format('woff2'),
    url('./assets/fonts/Inter-Italic.woff') format('woff');
}
.inter {
  font-family: 'Inter';
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
