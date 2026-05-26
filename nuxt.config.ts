export default defineNuxtConfig({
  compatibilityDate: '2026-05-26',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/prismic',
    '@nuxtjs/sitemap',
    '@nuxt/fonts',
    'nuxt-gtag',
    '@nuxtjs/mdc',
    '@nuxt/eslint',
  ],

  fonts: {
    defaults: {
      styles: ['normal', 'italic'],
    },
    // `["min max"]` requests the variable-weight range (needed by font-variation-settings);
    // `global` because the theme only references fonts via CSS variables, which the scanner can't see.
    families: [
      { name: 'Josefin Sans', provider: 'google', weights: ['100 700'], global: true },
      { name: 'Open Sans', provider: 'google', weights: ['300 800'], global: true },
      // `arabic` subset is required or Persian text falls back to a system font.
      {
        name: 'Vazirmatn',
        provider: 'google',
        weights: ['100 900'],
        subsets: ['arabic', 'latin', 'latin-ext'],
        global: true,
      },
    ],
  },

  typescript: {
    strict: true,
  },

  runtimeConfig: {
    githubToken: '',
    geminiApiKey: '',
    geminiModel: 'gemini-2.5-flash',
    public: {
      apiUrl: '',
      pageSize: 10,
      isStaging: false,
      googleAnalyticsId: '',
      githubUsername: '',
    },
  },

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  app: {
    head: {
      title: 'Alireza Esfahani',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Alireza Esfahani Personal Website/Weblog',
        },
        {
          name: 'keywords',
          content:
            'Alireza, Esfahani, Personal, Website, Weblog, Developer, Front end, Front-end developer, Javascript',
        },
        { name: 'author', content: 'Alireza Esfahani' },
        { name: 'apple-mobile-web-app-title', content: 'Alireza Esfahani' },
        { name: 'application-name', content: 'Alireza Esfahani' },
        { name: 'msapplication-TileColor', content: '#C62641' },
        { name: 'theme-color', content: '#C62641' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/meta-image-en.png' },
        { name: 'twitter:image', content: '/meta-image-en.png' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#C62641' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      ],
    },
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', dir: 'ltr' },
      { code: 'fa', language: 'fa-IR', file: 'fa.json', dir: 'rtl' },
    ],
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  prismic: {
    endpoint: process.env.NUXT_PUBLIC_API_URL || '',
    linkResolver: '~/utils/link-resolver',
  },

  sitemap: {
    // URLs come from server/plugins/sitemap-prismic.ts and already include /fa/* paths,
    // so disable the per-locale auto-split that would otherwise drop them.
    autoI18n: false,
  },

  site: {
    url: 'https://esfahani.dev',
    name: 'Alireza Esfahani',
  },

  gtag: {
    // Ignore legacy UA-* ids; nuxt-gtag only supports GA4 (G-*).
    id: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID?.startsWith('G-')
      ? process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID
      : undefined,
  },

  mdc: {
    highlight: {
      theme: 'dracula',
      langs: ['ts', 'js', 'json', 'bash', 'shell', 'vue', 'html', 'css', 'scss', 'yaml', 'md', 'tsx', 'jsx'],
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/_main.scss" as *;\n',
        },
      },
    },
    build: {
      rollupOptions: {
        // Silence only the harmless SOURCEMAP_BROKEN warning from Nuxt's preload polyfill.
        onwarn(warning, defaultHandler) {
          if (
            warning.code === 'SOURCEMAP_BROKEN'
            && warning.plugin === 'nuxt:module-preload-polyfill'
          ) {
            return
          }
          defaultHandler(warning)
        },
      },
    },
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt'],
    },
  },
})
