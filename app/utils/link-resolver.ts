import type { LinkResolverFunction } from '@prismicio/client'

const linkResolver: LinkResolverFunction = (doc) => {
  if (doc.isBroken) return '/not-found'

  // Prefix Farsi docs with the /fa locale (i18n strategy: prefix_except_default).
  // Without this, previewing a Farsi document resolves to the English route and
  // the article page can't find an en-us version, so it redirects to home.
  const prefix = doc.lang === 'fa-ir' ? '/fa' : ''

  switch (doc.type) {
    case 'homepage':
      return prefix || '/'
    case 'articles':
      return `${prefix}/articles/${doc.uid}`
    case 'about':
      return `${prefix}/about/`
    case 'contact':
      return `${prefix}/contact/`
    default:
      return '/not-found'
  }
}

export default linkResolver
