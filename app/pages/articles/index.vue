<script setup lang="ts">
import { filter } from '@prismicio/client'
import { normalizeArticles } from '~/utils/utils'
import type { IArticles } from '~/utils/types'

const { $prismic } = useNuxtApp()
const { locale, t } = useI18n()
const config = useRuntimeConfig()
const pageSize = Number(config.public.pageSize) || 10

const langFor = (l: string) => (l === 'en' ? 'en-us' : 'fa-ir')

// Locale-aware feed: /rss.xml on en, /fa/rss.xml on fa.
const rssHref = computed(() =>
  locale.value === 'fa' ? '/fa/rss.xml' : '/rss.xml',
)

const { data, refresh } = await useAsyncData(
  () => `articles-list-${locale.value}`,
  async () => {
    const response = await $prismic.client.get({
      filters: [filter.at('document.type', 'articles')],
      lang: langFor(locale.value),
      pageSize,
      page: 1,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
    })
    return {
      articles: normalizeArticles(response.results),
      totalPages: response.total_pages,
    }
  },
  { watch: [locale] },
)

const articles = ref<IArticles[]>(data.value?.articles ?? [])
const totalPages = ref(data.value?.totalPages ?? 1)
const page = ref(1)
const isLoadingMore = ref(false)

watch(data, (next) => {
  articles.value = next?.articles ?? []
  totalPages.value = next?.totalPages ?? 1
  page.value = 1
})

watch(locale, async () => {
  await refresh()
})

const loadMore = async (nextPage = 1) => {
  isLoadingMore.value = true
  const response = await $prismic.client.get({
    filters: [filter.at('document.type', 'articles')],
    lang: langFor(locale.value),
    pageSize,
    page: nextPage,
    orderings: { field: 'document.first_publication_date', direction: 'desc' },
  })
  articles.value = [...articles.value, ...normalizeArticles(response.results)]
  totalPages.value = response.total_pages
  page.value = nextPage
  isLoadingMore.value = false
}

useHead({
  title: () => `${t('articles.title')} :: ${t('home.title')}`,
})
useSeoMeta({
  description: () => t('seo.articles'),
  ogTitle: () => t('articles.title'),
  twitterTitle: () => t('articles.title'),
  twitterDescription: () => t('seo.articles'),
})
defineOgImage('Default', {
  title: t('articles.title'),
  description: t('seo.articles'),
  locale: locale.value,
})
</script>

<template>
  <section class="container articles">
    <SectionTitle :title="t('articles.title')" />
    <article v-for="article in articles" :key="article.uid" class="article">
      <ArticleTitle
        :id="article.uid"
        has-link
        :title="article.title"
        :subtitle="article.subtitle"
        :date="article.date ?? ''"
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
        {{ t('loadMore') }}
      </Button>
      <div v-if="articles.length > 0 && totalPages === page" class="done">
        &bull; &bull;
      </div>
      <a
        v-if="articles.length > 0"
        class="rss-link"
        :href="rssHref"
        :title="t('articles.subscribe')"
        :aria-label="t('articles.subscribe')"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="6.18" cy="17.82" r="2.18" />
          <path
            d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83C19.56 11.4 12.6 4.44 4 4.44z"
          />
          <path
            d="M4 10.1v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"
          />
        </svg>
      </a>
    </footer>
  </section>
</template>

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

.rss-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 24px;
  color: var(--text-light);
  font-family: var(--text-font);
  font-size: 14px;
  transition: color 0.2s ease-in-out;
  svg {
    display: block;
  }
  &:hover,
  &:focus-visible {
    color: var(--primary-text);
  }
}
</style>
