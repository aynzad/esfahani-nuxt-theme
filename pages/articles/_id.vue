<template>
  <article class="container article">
    <ArticleTitle
      v-if="uid"
      :id="uid"
      :date="date"
      :title="title"
      :subtitle="subtitle"
      :tags="tags"
      :read-time="readTime"
    />
    <Slice v-if="body.length > 0" :body="body" />
    <footer>
      <div class="done">&bull; &bull;</div>
    </footer>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import ArticleTitle from '~/components/article/articleTitle/index.vue';
import Slice from '~/components/slices/index.vue';
import { apiUrl } from '~/utils/config';

export default Vue.extend({
  name: 'Article',
  components: {
    ArticleTitle,
    Slice,
  },
  async asyncData({ app, params, redirect }: Context) {
    const lang = app.i18n.locale === 'en' ? 'en-us' : 'fa-ir';
    const api = await Prismic.getApi(apiUrl);
    const article = await api.getByUID('articles', params.id, {
      lang,
    });
    if (article) {
      return {
        uid: article.uid,
        title: PrismicDom.RichText.asText(article.data.article_title),
        subtitle: PrismicDom.RichText.asText(article.data.article_subtitle),
        date: article.first_publication_date,
        tags: article.tags,
        readTime: article.data.read_time,
        body: article.data.body,
      };
    } else {
      redirect(app.i18n.locale === 'en' ? '/' : '/fa');
    }
  },
  data() {
    return {
      uid: '',
      title: '',
      subtitle: '',
      date: null as string | null,
      tags: [],
      readTime: null as string | null,
      body: [],
    };
  },
  head() {
    const articleTitle = this.title as string;
    return {
      title: `${articleTitle} :: ${this.$t('home.title')}`,
    };
  },
  watch: {
    '$i18n.locale'() {
      this.reset();
    },
  },
  methods: {
    reset() {
      this.uid = '';
      this.title = '';
      this.subtitle = '';
      this.date = null;
      this.tags = [];
      this.readTime = null;
      this.body = [];
    },
  },
});
</script>

<style lang='scss' scoped>
footer {
  margin: 90px 0;
  width: 100%;
  text-align: center;
  @include breakpoint(xs, max) {
    margin: 45px 0;
  }
}

.done {
  color: var(--text-light);
}
</style>
