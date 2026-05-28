<script setup lang="ts">
import { asHTML, asText } from '@prismicio/client'

const { $prismic } = useNuxtApp()
const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data: page } = await useAsyncData(
  () => `about-${locale.value}`,
  async () => {
    const lang = locale.value === 'en' ? 'en-us' : 'fa-ir'
    try {
      return await $prismic.client.getSingle('about', { lang })
    } catch {
      return null
    }
  },
  { watch: [locale] },
)

if (!page.value) {
  await navigateTo(localePath('/'))
}

const name = computed<string>(() =>
  page.value ? (asText(page.value.data.name) ?? '') : '',
)
const picture = computed<{ url: string } | null>(
  () => page.value?.data.picture ?? null,
)
const content = computed(() =>
  page.value ? asHTML(page.value.data.content) : '',
)

useHead({
  title: () => `${t('about.title')} :: ${t('home.title')}`,
})
useSeoMeta({
  description: () => t('seo.about'),
  ogTitle: () => t('about.title'),
  twitterTitle: () => t('about.title'),
  twitterDescription: () => t('seo.about'),
})
defineOgImage('Default', {
  title: t('about.title'),
  description: t('seo.about'),
  locale: locale.value,
})
</script>

<template>
  <article class="container about">
    <SectionTitle :title="t('about.title')" />
    <img v-if="picture" :src="picture.url" :alt="name" />
    <!-- h2 under the SectionTitle h1 ("About me") to keep one h1 per page. -->
    <h2>{{ name }}</h2>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="content" v-html="content" />
    <footer>
      <div class="done">&bull; &bull;</div>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
.about {
  text-align: center;

  img {
    width: 150px;
    margin-top: 40px;
    border-radius: 50%;
  }
  h2 {
    font-size: 36px;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 30px;
    font-variation-settings: 'wght' var(--weight-semibold);
  }
  .content :deep() {
    text-align: initial;
    font-family: var(--text-font);
    & > div {
      margin-bottom: 16px;
    }
    img {
      max-width: 100%;
    }
    p {
      font-size: 18px;
      line-height: 29px;
      margin-bottom: 15px;
    }
    ul,
    ol {
      margin-bottom: 15px;
      margin-top: 5px;
      font-size: 18px;
      line-height: 29px;
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
}
</style>
