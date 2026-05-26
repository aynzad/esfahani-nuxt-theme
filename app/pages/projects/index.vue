<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => `${t('menu.projects')} :: ${t('home.title')}`,
})
</script>

<template>
  <section class="projects">
    <Construction />
  </section>
</template>
