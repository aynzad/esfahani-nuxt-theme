import { describe, expect, it } from 'vitest'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import { normalizeArticles, toHtml, toText } from '../../app/utils/utils'

const richText = (text: string): RichTextField =>
  [{ type: 'paragraph', text, spans: [] }] as RichTextField

const article = (
  overrides: Partial<{
    uid: string | null
    title: string
    subtitle: string
    date: string
    tags: string[]
    readTime: number
  }> = {},
) =>
  ({
    uid: 'uid' in overrides ? overrides.uid : 'my-article',
    first_publication_date: overrides.date ?? '2026-01-01T00:00:00+0000',
    tags: overrides.tags ?? ['nuxt', 'testing'],
    data: {
      article_title: richText(overrides.title ?? 'Title'),
      article_subtitle: richText(overrides.subtitle ?? 'Subtitle'),
      read_time: overrides.readTime ?? 5,
    },
  }) as unknown as PrismicDocument

describe('normalizeArticles', () => {
  it('maps Prismic documents to the flat IArticles shape', () => {
    const [result] = normalizeArticles([
      article({
        uid: 'hello-world',
        title: 'Hello World',
        subtitle: 'An intro',
        date: '2026-05-01T00:00:00+0000',
        tags: ['intro'],
        readTime: 3,
      }),
    ])

    expect(result).toEqual({
      uid: 'hello-world',
      title: 'Hello World',
      subtitle: 'An intro',
      date: '2026-05-01T00:00:00+0000',
      tags: ['intro'],
      readTime: 3,
    })
  })

  it('falls back to an empty uid when the document has none', () => {
    const [result] = normalizeArticles([article({ uid: null })])
    expect(result.uid).toBe('')
  })

  it('maps each document in the list', () => {
    const results = normalizeArticles([
      article({ uid: 'a' }),
      article({ uid: 'b' }),
    ])
    expect(results.map((r) => r.uid)).toEqual(['a', 'b'])
  })
})

describe('toText', () => {
  it('extracts plain text from a rich text field', () => {
    expect(toText(richText('Just text'))).toBe('Just text')
  })
})

describe('toHtml', () => {
  it('renders a rich text field to HTML', () => {
    expect(toHtml(richText('Paragraph body'))).toBe('<p>Paragraph body</p>')
  })
})
