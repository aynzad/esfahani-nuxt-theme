import { describe, expect, it } from 'vitest'
import type { PrismicDocument } from '@prismicio/client'
import linkResolver from '../../app/utils/link-resolver'

const doc = (props: Partial<PrismicDocument>) => props as PrismicDocument

describe('linkResolver', () => {
  it('routes the homepage to /', () => {
    expect(linkResolver(doc({ type: 'homepage' }))).toBe('/')
  })

  it('routes an articles doc to its uid path', () => {
    expect(linkResolver(doc({ type: 'articles', uid: 'hello-world' }))).toBe(
      '/articles/hello-world',
    )
  })

  it('routes the about and contact pages with trailing slashes', () => {
    expect(linkResolver(doc({ type: 'about' }))).toBe('/about/')
    expect(linkResolver(doc({ type: 'contact' }))).toBe('/contact/')
  })

  it('falls back to /not-found for unknown types', () => {
    expect(linkResolver(doc({ type: 'mystery' }))).toBe('/not-found')
  })

  it('routes a broken link to /not-found regardless of type', () => {
    expect(
      linkResolver(doc({ type: 'articles', uid: 'x', isBroken: true })),
    ).toBe('/not-found')
  })
})
