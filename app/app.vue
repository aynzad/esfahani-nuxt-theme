<script setup lang="ts">
const config = useRuntimeConfig()

// Locale-aware <html lang/dir>, hreflang alternates (incl. x-default), og:locale and
// canonical links — all derived from the active i18n locale.
const i18nHead = useLocaleHead({ seo: true })
const { locale } = useI18n()
// Absolute feed base so the autodiscovery <link>s resolve even when an HTML scraper has
// no base URL (matches the absolute hreflang/canonical links above). Falls back to a
// root-relative path when siteUrl is unset (local dev).
const feedBase = computed(() => {
  const origin = (config.public.siteUrl ?? '').replace(/\/$/, '')
  return `${origin}${locale.value === 'fa' ? '/fa' : ''}`
})

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir as 'ltr' | 'rtl' | 'auto' | undefined,
  },
  link: [
    ...(i18nHead.value.link || []),
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'Alireza Esfahani — RSS',
      href: `${feedBase.value}/rss.xml`,
    },
    {
      rel: 'alternate',
      type: 'application/atom+xml',
      title: 'Alireza Esfahani — Atom',
      href: `${feedBase.value}/atom.xml`,
    },
    {
      rel: 'alternate',
      type: 'application/feed+json',
      title: 'Alireza Esfahani — JSON Feed',
      href: `${feedBase.value}/feed.json`,
    },
  ],
  meta: [
    ...(i18nHead.value.meta || []),
    config.public.isStaging
      ? {
          name: 'robots',
          content: 'noindex, nofollow, noarchive, nocache, noimageindex',
        }
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
