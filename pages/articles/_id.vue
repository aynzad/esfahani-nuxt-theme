<template>
  <section class="articles">
    <h1 class="title">{{ header }}</h1>
    <p class="paragraph">{{ content }}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import { apiUrl } from '~/utils/config';

export default Vue.extend({
  name: 'Article',
  async asyncData({ app, params, redirect }: Context) {
    const lang = app.i18n.locale === 'en' ? 'en-us' : 'fa-ir';
    const api = await Prismic.getApi(apiUrl);
    const article = await api.getByUID('articles', params.id, {
      lang,
    });
    if (article) {
      const header = PrismicDom.RichText.asText(article.data.article_title);
      const content = PrismicDom.RichText.asText(article.data.article_content);
      return {
        header,
        content,
      };
    } else {
      redirect(app.i18n.locale === 'en' ? '/' : '/fa');
    }
  },
});
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
