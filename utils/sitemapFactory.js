import Prismic from 'prismic-javascript';

export default async function () {
  let faArticles = [];
  let enArticles = [];
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
    faArticles = responseFa.results.map(
      (article) => `/articles/fa/${article.uid}`
    );
    enArticles = responseEn.results.map(
      (article) => `/articles/${article.uid}`
    );
  } catch {}
  return [...enArticles, ...faArticles];
}
