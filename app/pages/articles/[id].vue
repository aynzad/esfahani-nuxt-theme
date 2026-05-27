<script setup lang="ts">
import { asText } from '@prismicio/client'
import SliceZone from '~/components/slices/SliceZone.vue'

const { $prismic } = useNuxtApp()
const { locale, t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const { data: article } = await useAsyncData(
  () => `article-${String(route.params.id)}-${locale.value}`,
  async () => {
    const lang = locale.value === 'en' ? 'en-us' : 'fa-ir'
    try {
      return await $prismic.client.getByUID('articles', String(route.params.id), { lang })
    }
    catch {
      return null
    }
  },
  { watch: [locale] },
)

if (!article.value) {
  await navigateTo(localePath('/'))
}

const uid = computed(() => article.value?.uid ?? '')
const title = computed<string>(() => (article.value ? asText(article.value.data.article_title) ?? '' : ''))
const subtitle = computed<string>(() => (article.value ? asText(article.value.data.article_subtitle) ?? '' : ''))
const date = computed(() => article.value?.first_publication_date ?? '')
const tags = computed(() => article.value?.tags ?? [])
const readTime = computed<number | undefined>(() => article.value?.data.read_time)
const body = computed(() => article.value?.data.body ?? [])

useHead({
  title: () => `${title.value} :: ${t('home.title')}`,
})
useSeoMeta({
  description: () => subtitle.value,
  keywords: () => tags.value.join(', '),
  ogType: 'article',
  ogTitle: () => title.value,
  twitterTitle: () => title.value,
  twitterDescription: () => subtitle.value,
})
defineOgImage('Default', {
  title: title.value,
  description: subtitle.value,
  locale: locale.value,
})
useSchemaOrg([
  defineArticle({
    headline: title.value,
    description: subtitle.value,
    datePublished: date.value || undefined,
    author: { name: t('home.title') },
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: t('home.title'), item: localePath('/') },
      { name: t('articles.title'), item: localePath('/articles') },
      { name: title.value },
    ],
  }),
])
</script>

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
    <SliceZone v-if="body.length > 0" :body="body" />
    <footer>
      <div class="done">&bull; &bull;</div>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
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
