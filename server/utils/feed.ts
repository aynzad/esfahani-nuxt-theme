import { Feed } from 'feed'
import { asText, createClient, filter, type RichTextField } from '@prismicio/client'
import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

type Locale = 'en' | 'fa'
type FeedFormat = 'rss' | 'atom' | 'json'

// Locale → Prismic lang, URL prefix, channel language tag, and the articles-page
// description (kept in sync with i18n/locales/*.json `seo.articles`; the i18n runtime
// isn't available in a Nitro route, so the strings live here).
const LOCALES: Record<Locale, { lang: string, prefix: string, language: string, description: string }> = {
  en: {
    lang: 'en-us',
    prefix: '',
    language: 'en',
    description: 'Articles by Alireza Esfahani on life, software engineering, front-end, and web development.',
  },
  fa: {
    lang: 'fa-ir',
    prefix: '/fa',
    language: 'fa',
    description: 'نوشته‌های علیرضا اصفهانی درباره زندگی، مهندسی نرم‌افزار، فرانت‌اند و توسعه وب.',
  },
}

const MAX_ITEMS = 50

function buildEmptyFeed(locale: Locale, site: string): Feed {
  const { prefix, language, description } = LOCALES[locale]
  return new Feed({
    title: 'Alireza Esfahani',
    description,
    id: `${site}${prefix}/articles`,
    link: `${site}${prefix}/articles`,
    language,
    favicon: `${site}/favicon-32x32.png`,
    copyright: `© ${new Date().getFullYear()} Alireza Esfahani`,
    author: { name: 'Alireza Esfahani', link: site },
    feedLinks: {
      rss: `${site}${prefix}/rss.xml`,
      atom: `${site}${prefix}/atom.xml`,
      json: `${site}${prefix}/feed.json`,
    },
  })
}

export async function buildFeed(locale: Locale, event?: H3Event): Promise<Feed> {
  const { public: { apiUrl, siteUrl } } = useRuntimeConfig(event)
  const site = (siteUrl ?? '').replace(/\/$/, '')
  const feed = buildEmptyFeed(locale, site)

  if (!apiUrl) {
    console.warn('[feed] NUXT_PUBLIC_API_URL is unset; serving empty feed')
    return feed
  }

  try {
    const { lang, prefix } = LOCALES[locale]
    const client = createClient(apiUrl, { fetch })
    const response = await client.get({
      filters: [filter.at('document.type', 'articles')],
      lang,
      pageSize: MAX_ITEMS,
      page: 1,
      orderings: { field: 'document.first_publication_date', direction: 'desc' },
    })

    let newest: Date | undefined
    for (const doc of response.results) {
      if (!doc.uid) continue
      const url = `${site}${prefix}/articles/${doc.uid}`
      const date = new Date(doc.first_publication_date)
      if (!newest || date > newest) newest = date
      feed.addItem({
        title: asText(doc.data.article_title as RichTextField),
        id: url,
        link: url,
        description: asText(doc.data.article_subtitle as RichTextField),
        date,
        category: (doc.tags ?? []).map(name => ({ name })),
      })
    }
    // `options` is a public, mutable field of Feed; the channel <updated>/<lastBuildDate>
    // tracks the newest article rather than build time (set post-loop since it's only
    // known after iterating). Revisit if a future feed major makes options read-only.
    if (newest) feed.options.updated = newest
  }
  catch (err) {
    console.warn('[feed] failed to load Prismic content:', err)
  }

  return feed
}

// Backs every route file: build the locale's feed, set the right Content-Type, serialise.
export async function defineFeedRoute(event: H3Event, locale: Locale, format: FeedFormat): Promise<string> {
  const feed = await buildFeed(locale, event)
  if (format === 'json') {
    setHeader(event, 'Content-Type', 'application/feed+json; charset=utf-8')
    return feed.json1()
  }
  if (format === 'atom') {
    setHeader(event, 'Content-Type', 'application/atom+xml; charset=utf-8')
    return feed.atom1()
  }
  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  return feed.rss2()
}
