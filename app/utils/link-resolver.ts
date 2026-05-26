import type { LinkResolverFunction } from '@prismicio/client'

const linkResolver: LinkResolverFunction = (doc) => {
  if (doc.isBroken) return '/not-found'

  switch (doc.type) {
    case 'homepage':
      return '/'
    case 'articles':
      return `/articles/${doc.uid}`
    case 'about':
      return '/about/'
    case 'contact':
      return '/contact/'
    default:
      return '/not-found'
  }
}

export default linkResolver
