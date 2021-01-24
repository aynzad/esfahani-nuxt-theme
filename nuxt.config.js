export default {
  head: {
    title: 'Alireza Esfahani',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Alireza Esfahani website',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#fff' },
  buildModules: ['@nuxt/typescript-build'],
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },
  modules: ['nuxt-i18n'],
  i18n: {
    seo: true,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
      },
      {
        code: 'fa',
        iso: 'fa-IR',
      },
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        onlyOnRoot: true, // recommended
      },
      messages: {
        en: {
          alirezaEsfahani: 'Alireza Esfahani',
          frontendDeveloper: 'Front-end developer',
          switchLocale: 'فارسی',
          articles: 'Articles',
        },
        fa: {
          alirezaEsfahani: 'علیرضا اصفهانی',
          frontendDeveloper: 'توسعه‌دهنده فرانت‌اند',
          switchLocale: 'English',
          articles: 'نوشته‌ها',
        },
      },
    },
  },
  env: {
    API_URL: process.env.API_URL || '',
  },
};
