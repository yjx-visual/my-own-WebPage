// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://jaceyou.com',
    name: 'JaceYou - Developer'
  },

  routeRules: {
    '/': { swr: 3600 },
    '/blog': { swr: 3600 },
    '/blog/**': { swr: 86400 },
    '/projects': { swr: 3600 },
    '/projects/**': { swr: 86400 },
    '/knowledge': { swr: 3600 },
    '/knowledge/**': { swr: 86400 },
    '/about': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'netlify'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    providers: {
      google: false,
      googleicons: false
    }
  }
})
