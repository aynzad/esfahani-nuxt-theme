<script setup lang="ts">
import { filter } from '@prismicio/client'
import { normalizeArticles } from '~/utils/utils'
import type { IArticles } from '~/utils/types'

const { $prismic } = useNuxtApp()
const { locale, t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const pageSize = Number(config.public.pageSize) || 10

const langFor = (l: string) => (l === 'en' ? 'en-us' : 'fa-ir')

const tagParam = computed(() => String(route.params.tag ?? ''))

const { data } = await useAsyncData(
  () => `tag-${tagParam.value}-${locale.value}`,
  async () => {
    const response = await $prismic.client.get({
      filters: [filter.at('document.tags', [tagParam.value])],
      lang: langFor(locale.value),
      pageSize,
      page: 1,
    })
    if (!response || response.results.length === 0) return null
    return {
      articles: normalizeArticles(response.results),
      totalPages: response.total_pages,
    }
  },
  { watch: [locale] },
)

if (!data.value) {
  await navigateTo(localePath('/'))
}

const articles = ref<IArticles[]>(data.value?.articles ?? [])
const totalPages = ref(data.value?.totalPages ?? 1)
const page = ref(1)
const isLoadingMore = ref(false)

watch(data, (next) => {
  articles.value = next?.articles ?? []
  totalPages.value = next?.totalPages ?? 1
  page.value = 1
})

const loadMore = async (nextPage = 1) => {
  isLoadingMore.value = true
  const response = await $prismic.client.get({
    filters: [filter.at('document.tags', [tagParam.value])],
    lang: langFor(locale.value),
    pageSize,
    page: nextPage,
  })
  articles.value = [...articles.value, ...normalizeArticles(response.results)]
  totalPages.value = response.total_pages
  page.value = nextPage
  isLoadingMore.value = false
}

useHead({
  title: () => `${t('tags.title', { tag: tagParam.value })} :: ${t('home.title')}`,
})
useSeoMeta({
  description: () => t('seo.tags', { tag: tagParam.value }),
  ogTitle: () => t('tags.title', { tag: tagParam.value }),
  twitterTitle: () => t('tags.title', { tag: tagParam.value }),
  twitterDescription: () => t('seo.tags', { tag: tagParam.value }),
})
defineOgImage('Default', {
  title: t('tags.title', { tag: tagParam.value }),
  description: t('seo.tags', { tag: tagParam.value }),
  locale: locale.value,
})
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: t('home.title'), item: localePath('/') },
      { name: t('articles.title'), item: localePath('/articles') },
      { name: t('tags.title', { tag: tagParam.value }) },
    ],
  }),
])
</script>

<template>
  <section class="container articles tag">
    <SectionTitle :title="t('tags.title', { tag: tagParam })" />
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
</style>
