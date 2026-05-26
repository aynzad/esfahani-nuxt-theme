export interface IArticles {
  uid: string
  title: string
  subtitle: string
  date: string
  tags: string[]
  readTime?: number
}

export type SliceName = 'text' | 'quote' | 'code' | 'lang'
