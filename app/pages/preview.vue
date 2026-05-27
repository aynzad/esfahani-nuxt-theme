<script setup lang="ts">
// Prismic preview entry. We override @nuxtjs/prismic's default /preview page on
// purpose: its usePrismicPreview() relies on usePrismic(), whose Vue inject()
// returns a client-less fallback in this project, so the default page can never
// resolve and silently fails to redirect. Here we use the app-provided
// $prismic.client — the same accessor the rest of the app uses — which is reliable.
// resolvePreviewURL() reads the `token` and `documentId` query params itself.
import linkResolver from '~/utils/link-resolver'

const { $prismic } = useNuxtApp()
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const url = await $prismic.client.resolvePreviewURL({ linkResolver, defaultURL: '/' })
    await navigateTo(url)
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
    console.error('[prismic preview] could not resolve preview URL:', err)
  }
})
</script>

<template>
  <section style="font-family: sans-serif; padding: 2rem; text-align: center; color: #555">
    <p v-if="!error">Loading preview…</p>
    <p v-else>Preview could not be resolved: {{ error }}</p>
  </section>
</template>
