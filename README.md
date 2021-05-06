<p align="center"><img align="center" style="width:320px" src="./static/android-chrome-512x512.png"/></p><br/>
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
Live production demo (`master` branch) is available on [esfahani.dev](https://esfahani.dev) and staging demo (`dev` branch) on [esfahani.vercel.app](https://esfahani.vercel.app/).

## How it works:
- [NuxtJs](https://nuxtjs.org/) SSR
- [Prismic](https://prismic.io/) Headless CMS
- [Vercel](https://prismic.io/) Deployment
- [Typescript](https://typescriptlang.org/)
- [ES6](https://babeljs.io/learn-es2015/) for JavaScript
- [SASS](http://sass-lang.com/) preprocessor for CSS

## Setup

### Install the project:

```shell
$ git clone https://github.com/aynzad/esfahani-nuxt-theme.git
$ yarn
$ mv .env.sample .env
```
### Create a `Prismic` repository

1. Create your [prismic](http://prismic.io/dashboard/signup) account. 
1. [Create a repository](https://prismic.io/dashboard/new-repository)
1. Add your prismic `API_URL` to the `.env` file.
1. Create a `about` custom type, using [about.json](./.prismic-custom-types/about.json) file.
1. Create a `contact` custom type, using [contact.json](./.prismic-custom-types/contact.json) file.
1. Create a `articles` custom type, using [articles.json](./.prismic-custom-types/articles.json) file.

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
- Config test packages (like `jest`).
- Add unit test.
- Add `projects` page.
- Add RSS feed.
- Improve SEO.
## License

It is licensed under the [MIT license](http://opensource.org/licenses/MIT).
