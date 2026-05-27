<p align="center"><img align="center" style="width:320px" src="./public/android-chrome-512x512.png"/></p><br/>
<p align="center">
    <span><img src="https://badgen.net/badge/license/MIT/blue" alt="license"></span>
    <span><img src="https://badgen.net/github/releases/aynzad/esfahani-nuxt-theme" alt="release"></span>
    <span><img src="https://badgen.net/github/last-commit/aynzad/esfahani-nuxt-theme" alt="last commit"></span>
    <span><img src="https://badgen.net/github/commits/aynzad/esfahani-nuxt-theme" alt="commits"></span>
    <span><img src="https://badgen.net/github/open-issues/aynzad/esfahani-nuxt-theme" alt="open issues"></span>
</p>

# Esfahani Theme

The **Esfahani Theme** is a multilingue NuxtJs theme which aims to modernize, organize and enhance some aspects of personal website or weblog themes development.

## Live Demo

Live production demo is available on [esfahani.dev](https://esfahani.dev).

## Features

- **Bilingual** — English and Farsi (RTL) via `@nuxtjs/i18n`.
- **Articles** — authored in Prismic, rendered with Shiki code highlighting and per-locale content.
- **Projects** — auto-populated from a GitHub account's public repos (stars, topics, demo links).
- **Farsi auto-translation** — the Projects page is translated on the server with Google Gemini (Vercel AI SDK), cached per string, with graceful fallback to English.
- **SSR + SEO** — server-rendered pages, sitemap (both locales, with article images), and GA4 analytics.
- **Self-hosted fonts** — Josefin Sans, Open Sans, and Vazirmatn via `@nuxt/fonts`.
- **Typed & linted** — TypeScript throughout, ESLint flat config.

## How it works:

- [Nuxt 4](https://nuxt.com/) (Vue 3, Nitro) SSR
- [Prismic](https://prismic.io/) headless CMS for articles/about/contact
- [GitHub REST API](https://docs.github.com/rest) powers the **Projects** page (public repos)
- [Vercel AI SDK](https://ai-sdk.dev/) + [Google Gemini](https://ai.google.dev/) to auto-translate the Projects page into Farsi
- [@nuxtjs/i18n](https://i18n.nuxtjs.org/) — English / Farsi (RTL)
- [Vercel](https://vercel.com/) deployment (auto-detected by Nitro)
- [TypeScript](https://typescriptlang.org/)
- [SASS](http://sass-lang.com/) preprocessor for CSS
- [pnpm](https://pnpm.io/) package manager

## Setup

### Install the project:

```shell
$ git clone https://github.com/aynzad/esfahani-nuxt-theme.git
$ pnpm install
$ cp .env.sample .env
```

Then run it:

```shell
$ pnpm dev      # dev server
$ pnpm build    # production build
```

### Create a `Prismic` repository

1. Create your [prismic](http://prismic.io/dashboard/signup) account.
1. [Create a repository](https://prismic.io/dashboard/new-repository)
1. Set `NUXT_PUBLIC_API_URL` in `.env` to your repository API endpoint.
1. Create a `about` custom type, using [about.json](./.prismic-custom-types/about.json) file.
1. Create a `contact` custom type, using [contact.json](./.prismic-custom-types/contact.json) file.
1. Create a `articles` custom type, using [articles.json](./.prismic-custom-types/articles.json) file.

### Environment variables

Configured in `.env` (see [.env.sample](./.env.sample)):

| Variable                          | Required     | Purpose                                                                        |
| --------------------------------- | ------------ | ------------------------------------------------------------------------------ |
| `NUXT_PUBLIC_API_URL`             | yes          | Prismic repository API endpoint                                                |
| `NUXT_PUBLIC_GITHUB_USERNAME`     | for Projects | GitHub account whose public repos are listed                                   |
| `NUXT_GITHUB_TOKEN`               | no           | Read-only PAT to lift GitHub's 60 req/hr limit                                 |
| `NUXT_GEMINI_API_KEY`             | no           | Gemini key to auto-translate Projects into Farsi (empty = Farsi shows English) |
| `NUXT_GEMINI_MODEL`               | no           | Override Gemini model (default `gemini-2.5-flash`)                             |
| `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` | no           | GA4 measurement id (`G-XXXX`)                                                  |

### Projects page

The Projects page lists the public repositories of `NUXT_PUBLIC_GITHUB_USERNAME` (forks/archived excluded, newest activity first). Each card shows the repo name, description, topics, star count, and a demo link when the repo has a homepage. On the Farsi route the names/descriptions/topics are translated on the server via Gemini (cached per string); without a key it falls back to English.

### Deploy on `Vercel` _(optional)_

You can use [Vercel](https://vercel.com/) for CI and CD your own fork of this project.

1. Create your [Vercel](https://vercel.com/signup) account.
1. [Create a Project](https://vercel.com/new) and import **your** git repository.

## Contributing

Great that you are considering supporting the project. You have a lot of ways to help me grow. I appreciate all contributions, even the smallest.

- Report an issue.
- Propose a feature.
- Send a pull request.
- Star project on the [GitHub](https://github.com/aynzad/esfahani-nuxt-theme)
- Tell about project around your community.

## TODO

- [x] Improve SEO and accessibility
- [] Config test packages (like `vitest`) and Add unit test
- [] Add RSS feed.

## License

It is licensed under the [MIT license](http://opensource.org/licenses/MIT).
