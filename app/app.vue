<script setup lang="ts">
const { locale, locales } = useI18n()
const config = useRuntimeConfig()

type LocaleDir = 'ltr' | 'rtl' | 'auto'
const currentLocale = computed(() => {
  const list = locales.value as Array<{ code: string, language?: string, dir?: LocaleDir }>
  return list.find(item => item.code === locale.value)
})

useHead(() => ({
  htmlAttrs: {
    lang: currentLocale.value?.language ?? 'en-US',
    dir: currentLocale.value?.dir ?? 'ltr',
  },
  meta: [
    config.public.isStaging
      ? { name: 'robots', content: 'noindex, nofollow, noarchive, nocache, noimageindex' }
      : { name: 'robots', content: 'index' },
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
