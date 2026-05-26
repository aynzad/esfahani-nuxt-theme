export interface IArticles {
  uid: string
  title: string
  subtitle: string
  date: string
  tags: string[]
  readTime?: number
}

export interface IProject {
  id: number
  name: string // hyphens already replaced with spaces
  description: string
  url: string // html_url
  homepage: string // demo/website URL ('' when none), normalized to include a scheme
  topics: string[]
  stars: number // stargazers_count
  date: string // pushed_at (ISO)
}

export type SliceName = 'text' | 'quote' | 'code' | 'lang'
