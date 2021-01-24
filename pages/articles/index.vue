<template>
  <div>
    <section v-for="article in articles" :key="article.uid" class="articles">
      <NuxtLink
        :to="localePath({ name: 'articles-id', params: { id: article.uid } })"
      >
        {{ getTitle(article) }}
      </NuxtLink>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { apiUrl } from '~/utils/config';

export default Vue.extend({
  name: 'Articles',
  async asyncData({ app }) {
    const lang = app.i18n.locale === 'en' ? 'en-us' : 'fa-ir';
    const api = await Prismic.getApi(apiUrl);
    const results = await api.query(
      Prismic.Predicates.at('document.type', 'articles'),
      { lang }
    );
    const articles = results.results;
    return {
      articles,
    };
  },
  methods: {
    getTitle: (article: Document) => {
      return PrismicDom.RichText.asText(article.data.article_title);
    },
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
