import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import baseLinkResolver from './link-resolver';
import { baseUrl } from './config';

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

export default async function (feed) {
  feed.options = {
    title: 'Alireza Esfahani - Articles',
    link: `${baseUrl}/feed.xml`,
    description: 'Alireza Esfahani Personal Weblog',
  };

  try {
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
        description: PrismicDom.RichText.asText(article.data.article_subtitle),
        content: toHtml(article.data.body),
      });
    });
    responseEn.results.forEach((article) => {
      feed.addItem({
        title: PrismicDom.RichText.asText(article.data.article_title),
        id: `${baseUrl}/articles/${article.uid}`,
        link: `${baseUrl}/articles/${article.uid}`,
        description: PrismicDom.RichText.asText(article.data.article_subtitle),
        content: toHtml(article.data.body),
      });
    });
  } finally {
    feed.addContributor({
      name: 'Alireza Esfahani',
      email: 'alireza@esfahani.dev',
      link: `${baseUrl}/`,
    });
  }
}
