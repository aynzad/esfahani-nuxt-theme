<script setup lang="ts">
import { asHTML } from '@prismicio/client'

const { $prismic } = useNuxtApp()
const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data: page } = await useAsyncData(
  () => `contact-${locale.value}`,
  async () => {
    const lang = locale.value === 'en' ? 'en-us' : 'fa-ir'
    try {
      return await $prismic.client.getSingle('contact', { lang })
    } catch {
      return null
    }
  },
  { watch: [locale] },
)

if (!page.value) {
  await navigateTo(localePath('/'))
}

const content = computed(() =>
  page.value ? asHTML(page.value.data.content) : '',
)

useHead({
  title: () => `${t('contact.title')} :: ${t('home.title')}`,
})
useSeoMeta({
  description: () => t('seo.contact'),
  ogTitle: () => t('contact.title'),
  twitterTitle: () => t('contact.title'),
  twitterDescription: () => t('seo.contact'),
})
defineOgImage('Default', {
  title: t('contact.title'),
  description: t('seo.contact'),
  locale: locale.value,
})
</script>

<template>
  <article class="container contact">
    <SectionTitle :title="t('contact.title')" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="content" v-html="content" />
    <footer>
      <div class="done">&bull; &bull;</div>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
.contact {
  .content :deep() {
    margin: 30px 0;
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
