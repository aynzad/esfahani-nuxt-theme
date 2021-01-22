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
  env: {
    API_URL: process.env.API_URL || '',
  },
};
