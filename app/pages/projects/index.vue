<script setup lang="ts">
import type { IProject } from '~/utils/types'

const { t, locale } = useI18n()

// The server returns English for `en` and Gemini-translated text for `fa`; refetches on locale change.
const { data: projects } = await useFetch<IProject[]>('/api/projects', {
  query: { lang: locale },
  default: () => [],
  watch: [locale],
})

useHead({
  title: () => `${t('menu.projects')} :: ${t('home.title')}`,
})
</script>

<template>
  <section class="container projects">
    <SectionTitle :title="t('menu.projects')" />
    <article v-for="project in projects" :key="project.id" class="article">
      <ArticleTitle
        :external-href="project.url"
        :title="project.name"
        :subtitle="project.description"
        :date="project.date"
        :tags="project.topics"
        :stars="project.stars"
        :demo-href="project.homepage || undefined"
        :demo-label="t('projects.demo')"
        no-link-tags
      />
    </article>
  </section>
</template>

<style lang="scss" scoped>
.projects {
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
</style>
