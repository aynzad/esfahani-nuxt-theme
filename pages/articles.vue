<template>
  <section class="articles">
    <h1 class="title">{{ header }}</h1>
    <p class="paragraph">{{ content }}</p>
  </section>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import PrismicConfig from './../prismic.config.js';
export default {
  async asyncData() {
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
    let article = {};
    const results = await api.query(
      Prismic.Predicates.at('document.type', 'articles'),
      { lang: 'en-us' }
    );
    article = results.results[0];
    const header = PrismicDom.RichText.asText(article.data.article_title);
    const content = PrismicDom.RichText.asText(article.data.article_content);
    return {
      article,
      header,
      content,
    };
  },
};
</script>

<style scoped>
.articles {
  margin: 25px 0;
  padding: 0 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.title {
  margin: 50px 0;
}
p {
  color: #000;
  margin: 15px 0 5px;
  max-width: 450px;
  line-height: 1.44;
}
</style>
