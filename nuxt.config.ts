// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    "@nuxt/eslint"
  ],
  routeRules: {
    '/': { redirect: '/upload' }
  },
  runtimeConfig: {
    s3Url: '',
    s3Bucket: '',
    s3AccessKey: '',
    s3SecretKey: '',
    s3Region: '',
  },
})
