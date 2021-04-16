<template>
  <section class="container articles">
    <section-title :title="$t('articles.title')" />
    <article v-for="article in articles" :key="article.uid" class="article">
      <article-title
        :id="article.uid"
        has-link
        :title="article.title"
        :subtitle="article.subtitle"
        :date="article.date"
        :tags="article.tags"
        :read-time="article.readTime"
      />
    </article>
    <footer>
      <Button
        v-if="articles.length > 0 && totalPages > page"
        :loading="isLoadingMore"
        @click="loadMore(page + 1)"
      >
        {{ $t('loadMore') }}
      </Button>
      <div v-if="articles.length > 0 && totalPages === page" class="done">
        &bull; &bull;
      </div>
    </footer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Prismic from 'prismic-javascript';
import ResolvedApi from 'prismic-javascript/types/ResolvedApi';
import ArticleTitle from '~/components/article/articleTitle/index.vue';
import SectionTitle from '~/components/article/sectionTitle/index.vue';
import Button from '~/components/core/Button.vue';
import { apiUrl, pageSize } from '~/utils/config';
import { normalizeArticles } from '~/utils/utils';
import { IArticles } from '~/utils/types';

export default Vue.extend({
  name: 'Articles',
  components: {
    ArticleTitle,
    SectionTitle,
    Button,
  },
  async asyncData({ app }) {
    const lang = app.i18n.locale === 'en' ? 'en-us' : 'fa-ir';
    const api = await Prismic.getApi(apiUrl);
    const response = await api.query(
      Prismic.Predicates.at('document.type', 'articles'),
      { lang, pageSize, page: 1 }
    );
    const articles = normalizeArticles(response.results);
    const totalPages = response.total_pages;
    return {
      articles,
      totalPages,
    };
  },
  data() {
    return {
      api: null as ResolvedApi | null,
      articles: [] as IArticles[],
      totalPages: 1,
      page: 1,
      isLoadingMore: false,
    };
  },
  head() {
    return {
      title: `${this.$t('articles.title')} :: ${this.$t('home.title')}`,
    };
  },
  watch: {
    '$i18n.locale'() {
      this.reset();
    },
  },
  methods: {
    reset() {
      this.articles = [];
      this.page = 0;
    },
    async loadMore(page = 1) {
      this.isLoadingMore = true;
      const lang = this.$i18n.locale === 'en' ? 'en-us' : 'fa-ir';
      if (!this.api) {
        this.api = await Prismic.getApi(apiUrl);
      }
      const results = await this.api.query(
        Prismic.Predicates.at('document.type', 'articles'),
        { lang, pageSize, page }
      );
      this.page += 1;
      this.isLoadingMore = false;
      this.articles = [...this.articles, ...normalizeArticles(results.results)];
      this.totalPages = results.total_pages;
    },
  },
});
</script>

<style lang="scss" scoped>
.articles {
  margin-top: 10px;
}
.article {
  margin-top: 12px;
  margin-bottom: 54px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @include breakpoint(md, max) {
    margin-top: 10px;
    margin-bottom: 22px;
  }
  @include breakpoint(xs, max) {
    margin-top: 8px;
    margin-bottom: 16px;
  }
}

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
