<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  title: () => `${t('home.title')} :: ${t('home.job')}`,
})
useSeoMeta({
  description: () => t('seo.home'),
  ogTitle: () => t('home.title'),
  twitterTitle: () => t('home.title'),
  twitterDescription: () => t('seo.home'),
})
defineOgImage('Default', {
  title: t('home.title'),
  description: t('seo.home'),
  locale: locale.value,
})
</script>

<template>
  <div />
</template>
