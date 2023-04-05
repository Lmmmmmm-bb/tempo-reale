// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 5173,
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@nuxtjs/device',
    '@vueuse/nuxt',
  ],
  css: [
    '~/index.css',
    '@unocss/reset/tailwind.css',
  ],
  colorMode: { classSuffix: '' },
  googleFonts: {
    families: {
      'Varela+Round': true,
      'Noto+Sans+SC': true,
    },
    prefetch: true,
    preconnect: true,
    preload: true,
  },
  device: {
    refreshOnResize: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Nuxt Starter',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
      ],
      meta: [
        { name: 'description', content: 'Nuxt3 starter' },
      ],
    },
  },
});
