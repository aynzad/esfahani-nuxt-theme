import { type Client, createClient, type PrismicDocument } from '@prismicio/client'
import type { NitroApp } from 'nitropack/types'
import type { SitemapSourcesHookCtx, SitemapUrl } from '@nuxtjs/sitemap'
import { defineNitroPlugin, useRuntimeConfig } from '#imports'

// @nuxtjs/sitemap declares this hook only inside its own module file, so re-declare
// it here to type `nitroApp.hooks.hook('sitemap:sources', …)` natively.
declare module 'nitropack/types' {
  interface NitroRuntimeHooks {
    'sitemap:sources': (ctx: SitemapSourcesHookCtx) => void | Promise<void>
  }
}

// Prismic dates use a colon-less offset ("+0000") that isn't valid W3C; normalise it.
function toW3CDate(date: string | null | undefined): string | undefined {
  if (!date) return undefined
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
}

// Collect rich-text image URLs from a document (image nodes: `{ type: 'image', url }`).
function collectImageUrls(value: unknown, found = new Set<string>()): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) collectImageUrls(item, found)
  }
  else if (value && typeof value === 'object') {
    const node = value as Record<string, unknown>
    if (node.type === 'image' && typeof node.url === 'string') {
      found.add(node.url.split('?')[0]!)
    }
    for (const key of Object.keys(node)) collectImageUrls(node[key], found)
  }
  return found
}

async function getSingleSafe(client: Client, type: string, lang: string) {
  try {
    return await client.getSingle(type, { lang })
  }
  catch {
    return null
  }
}

function newestDate(docs: PrismicDocument[]): string | undefined {
  const times = docs
    .map(d => new Date(d.last_publication_date).getTime())
    .filter(t => !Number.isNaN(t))
  return times.length ? new Date(Math.max(...times)).toISOString() : undefined
}

function articleUrl(doc: PrismicDocument, prefix: string): SitemapUrl {
  const images = [...collectImageUrls(doc.data)].map(loc => ({ loc }))
  return {
    loc: `${prefix}/articles/${doc.uid}`,
    changefreq: 'monthly',
    priority: 1,
    lastmod: toW3CDate(doc.last_publication_date),
    ...(images.length ? { images } : {}),
  }
}

// Feed Prismic-backed URLs (both locales) into the sitemap at render time.
export default defineNitroPlugin((nitroApp: NitroApp) => {
  nitroApp.hooks.hook('sitemap:sources', async (ctx) => {
    const { public: { apiUrl } } = useRuntimeConfig()
    if (!apiUrl) return

    const client = createClient(apiUrl, { fetch })

    const locales = [
      { lang: 'en-us', prefix: '' },
      { lang: 'fa-ir', prefix: '/fa' },
    ]

    try {
      const urls: SitemapUrl[] = (
        await Promise.all(
          locales.map(async ({ lang, prefix }): Promise<SitemapUrl[]> => {
            const [about, contact, articles] = await Promise.all([
              getSingleSafe(client, 'about', lang),
              getSingleSafe(client, 'contact', lang),
              client.getAllByType('articles', { lang }),
            ])

            return [
              // Home & projects have no content source, so no lastmod (not faked).
              { loc: prefix || '/', changefreq: 'monthly', priority: 0.8 },
              { loc: `${prefix}/projects`, changefreq: 'monthly', priority: 0.8 },
              {
                loc: `${prefix}/articles`,
                changefreq: 'monthly',
                priority: 0.8,
                lastmod: newestDate(articles),
              },
              {
                loc: `${prefix}/about`,
                changefreq: 'monthly',
                priority: 0.8,
                lastmod: toW3CDate(about?.last_publication_date),
              },
              {
                loc: `${prefix}/contact`,
                changefreq: 'monthly',
                priority: 0.8,
                lastmod: toW3CDate(contact?.last_publication_date),
              },
              ...articles.map(a => articleUrl(a, prefix)),
            ]
          }),
        )
      ).flat()

      ctx.sources.push({
        context: { name: 'prismic:articles', description: 'URLs from Prismic' },
        urls,
      })
    }
    catch (err) {
      console.warn('[sitemap] failed to load Prismic content:', err)
    }
  })
})
