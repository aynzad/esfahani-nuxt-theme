<script setup lang="ts">
const config = useRuntimeConfig()

// Locale-aware <html lang/dir>, hreflang alternates (incl. x-default), og:locale and
// canonical links — all derived from the active i18n locale.
const i18nHead = useLocaleHead({ seo: true })

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir as 'ltr' | 'rtl' | 'auto' | undefined,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [
    ...(i18nHead.value.meta || []),
    config.public.isStaging
      ? { name: 'robots', content: 'noindex, nofollow, noarchive, nocache, noimageindex' }
      : { name: 'robots', content: 'index' },
  ],
}))

// Site-wide structured data: the website itself and its author/owner.
const siteUrl = config.public.siteUrl
useSchemaOrg([
  defineWebSite({ name: 'Alireza Esfahani' }),
  definePerson({
    name: 'Alireza Esfahani',
    ...(siteUrl ? { url: siteUrl } : {}),
    sameAs: ['https://github.com/aynzad'],
  }),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
