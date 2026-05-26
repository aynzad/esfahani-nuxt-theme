import { useRuntimeConfig } from '#imports'
import type { IProject } from '~/utils/types'
import { translateToFarsi } from '../utils/gemini'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics?: string[]
  stargazers_count: number
  pushed_at: string
  fork: boolean
  archived: boolean
}

// GitHub stores the website field verbatim, so some entries omit the scheme (e.g. "foo.vercel.app").
const normalizeUrl = (url: string | null): string => {
  const trimmed = (url ?? '').trim()
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

const normalize = (repo: GitHubRepo): IProject => ({
  id: repo.id,
  name: repo.name.replaceAll('-', ' '),
  description: repo.description ?? '',
  url: repo.html_url,
  homepage: normalizeUrl(repo.homepage),
  topics: repo.topics ?? [],
  stars: repo.stargazers_count,
  date: repo.pushed_at,
})

// A thrown fetch error is not cached (Nitro only caches successful results), so a transient
// failure isn't pinned for maxAge — the page falls back to [] and the next request retries.
export default defineCachedEventHandler(async (event): Promise<IProject[]> => {
  const config = useRuntimeConfig(event)
  const username = config.public.githubUsername
  if (!username) return []

  const token = config.githubToken
  const lang = String(getQuery(event).lang ?? 'en')

  const repos = await $fetch<GitHubRepo[]>(
    `https://api.github.com/users/${username}/repos`,
    {
      query: { type: 'owner', sort: 'pushed', direction: 'desc', per_page: 100 },
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'esfahani.dev',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  )

  const projects = repos
    .filter(repo => !repo.fork && !repo.archived)
    .map(normalize)

  if (lang === 'fa' && config.geminiApiKey) {
    const strings = projects.flatMap(p => [p.name, p.description, ...p.topics])
    const translated = await translateToFarsi(strings, {
      apiKey: config.geminiApiKey,
      model: config.geminiModel || 'gemini-2.5-flash',
    })
    let i = 0
    for (const project of projects) {
      project.name = translated[i++]!
      project.description = translated[i++]!
      project.topics = project.topics.map(() => translated[i++]!)
    }
  }

  return projects
  // getKey varies the cache by locale so en/fa responses don't collide.
}, { maxAge: 120, getKey: event => `projects-${getQuery(event).lang ?? 'en'}` })
