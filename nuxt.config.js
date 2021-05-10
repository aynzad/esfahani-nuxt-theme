import { resolve } from 'path';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import baseLinkResolver from './utils/link-resolver';
const sitemapFactory = require('./utils/sitemapFactory');

const baseUrl = process.env.BASE_URL;

const linkResolver = (doc) => {
  return `${baseUrl}${baseLinkResolver(doc)}`;
};

const toHtml = (body) => {
  let html = '';
  body.forEach((row) => {
    if (row.slice_type === 'text') {
      row.items.forEach((item) => {
        html += PrismicDom.RichText.asHtml(item.text, linkResolver);
      });
    }
    if (row.slice_type === 'quote') {
      row.items.forEach((item) => {
        html += `
        <q>
        ${PrismicDom.RichText.asHtml(item.text, linkResolver)}
        </q>`;
      });
    }
    if (row.slice_type === 'code') {
      row.items.forEach((item) => {
        html += `
        <pre>
        ${PrismicDom.RichText.asHtml(item.text, linkResolver)}
        </pre>`;
      });
    }
  });
  return html;
};

export default {
  head: {
    title: 'Alireza Esfahani',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Alireza Esfahani Personal Website/Weblog',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Alireza, Esfahani, Personal, Website, Weblog, Developer, Front end, Front-end developer, Javascript',
      },
      { name: 'author', content: 'Alireza Esfahani' },
      { name: 'apple-mobile-web-app-title', content: 'Alireza Esfahani' },
      { name: 'application-name', content: 'Alireza Esfahani' },
      { name: 'msapplication-TileColor', content: '#C62641' },
      { name: 'theme-color', content: '#C62641' },
      { name: 'og:type', content: 'website' },
      { name: 'og:image', content: '/meta-image-en.png' },
      { name: 'twitter:image', content: '/meta-image-en.png' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#C62641' },
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      process.env.IS_STAGING === 'true'
        ? {
            name: 'robots',
            content: 'noindex, nofollow, noarchive, nocache, noimageindex',
          }
        : {
            name: 'robots',
            content: 'index',
          },
    ],
  },
  loading: { color: '#C62641' },
  buildModules: ['@nuxt/typescript-build'],
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },
  modules: [
    '@nuxtjs/feed',
    'nuxt-i18n',
    '@nuxtjs/style-resources',
    [
      'nuxt-highlightjs',
      {
        style: 'dracula',
      },
    ],
    '@nuxtjs/sitemap',
  ],
  i18n: {
    seo: true,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
      },
      {
        code: 'fa',
        iso: 'fa-IR',
        file: 'fa.json',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        onlyOnRoot: true,
      },
    },
  },
  sitemap: {
    defaults: {
      changefreq: 'monthly',
      priority: 1,
      lastmod: new Date(),
    },
    routes: async () => {
      const routes = await sitemapFactory();
      return routes;
    },
  },
  feed: [
    {
      path: '/feed.xml', // The route to your feed.
      async create(feed) {
        feed.options = {
          title: 'Alireza Esfahani - Articles',
          link: `${baseUrl}/feed.xml`,
          description: 'Alireza Esfahani Personal Weblog',
        };
        const api = await Prismic.getApi(process.env.API_URL);
        const responseEn = await api.query(
          Prismic.Predicates.at('document.type', 'articles'),
          { lang: 'en-us' }
        );
        const responseFa = await api.query(
          Prismic.Predicates.at('document.type', 'articles'),
          { lang: 'fa-ir' }
        );
        responseFa.results.forEach((article) => {
          feed.addItem({
            title: PrismicDom.RichText.asText(article.data.article_title),
            id: `${baseUrl}/articles/fa/${article.uid}`,
            link: `${baseUrl}/articles/fa/${article.uid}`,
            description: PrismicDom.RichText.asText(
              article.data.article_subtitle
            ),
            content: toHtml(article.data.body),
          });
        });
        responseEn.results.forEach((article) => {
          feed.addItem({
            title: PrismicDom.RichText.asText(article.data.article_title),
            id: `${baseUrl}/articles/${article.uid}`,
            link: `${baseUrl}/articles/${article.uid}`,
            description: PrismicDom.RichText.asText(
              article.data.article_subtitle
            ),
            content: toHtml(article.data.body),
          });
        });
        feed.addContributor({
          name: 'Alireza Esfahani',
          email: 'alireza@esfahani.dev',
          link: `${baseUrl}/`,
        });
      },
      cacheTime: 1000 * 60 * 60 * 14,
      type: 'rss2',
    },
  ],
  styleResources: {
    scss: ['~/assets/css/_main.scss'],
  },
  alias: {
    '~': resolve(__dirname),
    '@': resolve(__dirname),
  },
  env: {
    API_URL: process.env.API_URL || '',
    PAGE_SIZE: process.env.PAGE_SIZE || 2,
  },
};
