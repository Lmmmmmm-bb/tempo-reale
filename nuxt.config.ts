// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      domain: 'wss://vcc.zeabur.app',
    },
  },
  devServer: {
    port: 5173,
  },
  imports: {
    dirs: ['types'],
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
      title: 'rtc',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
      ],
      meta: [
        { name: 'description', content: 'rtc' },
      ],
      script: [
        { src: 'https://webrtc.github.io/adapter/adapter-latest.js' },
      ],
    },
  },
});
