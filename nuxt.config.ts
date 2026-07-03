// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
  ],

  content: {
    database: {
      type: 'libsql',
      url: ':memory:',
    },
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'netlify',
  },

  routeRules: {
    '/': { swr: 3600 },
    '/blog': { swr: 3600 },
    '/blog/**': { swr: 86400 },
    '/projects': { swr: 3600 },
    '/projects/**': { swr: 86400 },
    '/knowledge': { swr: 3600 },
    '/knowledge/**': { swr: 86400 },
    '/about': { prerender: true },
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
