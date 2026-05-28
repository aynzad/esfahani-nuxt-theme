import {
  asHTML,
  asText,
  type PrismicDocument,
  type RichTextField,
} from '@prismicio/client'
import linkResolver from './link-resolver'
import type { IArticles } from './types'

export const normalizeArticles = (articles: PrismicDocument[]): IArticles[] =>
  articles.map((article) => ({
    uid: article.uid ?? '',
    title: asText(article.data.article_title as RichTextField),
    subtitle: asText(article.data.article_subtitle as RichTextField),
    date: article.first_publication_date,
    tags: article.tags,
    readTime: article.data.read_time as number | undefined,
  }))

export const toHtml = (content: RichTextField): string =>
  asHTML(content, { linkResolver })

export const toText = (content: RichTextField): string => asText(content)
