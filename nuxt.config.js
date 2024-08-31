export default defineNuxtConfig({
  css: ['~/assets/scss/main.scss'],
  compatibilityDate: '2024-07-02',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./assets/scss/_variables.scss" as *;'
        }
      }
    }
  },
  head: {
    title: 'The Mind Retreat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Website of the amazing 'The Mind Retreat' healing project." },
    ],
  },
  modules: ['nuxt-swiper'],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
      deployURL: process.env.DEPLOY_URL,
    }
  }
})
