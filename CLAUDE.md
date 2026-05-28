# Esfahani Nuxt Theme

Bilingual (English + Farsi/RTL) Nuxt 4 SSR site backed by Prismic CMS. See @README.md for setup and env vars, @package.json for the script list.

## Commands

- `pnpm dev` — dev server
- `pnpm typecheck` — `nuxt typecheck` (vue-tsc, strict)
- `pnpm lint` / `pnpm format` — ESLint flat config / Prettier
- `pnpm test` — Vitest, node env, `test/**/*.test.ts`
- `pnpm check` — prettier + lint + typecheck + test. Run this before declaring work done.

Always use `pnpm` (10.28.1, pinned via `packageManager`). Node 24.x. Husky runs `lint-staged` on pre-commit and `pnpm test` on pre-push.

## Code style overrides (defaults assumed otherwise)

- Prettier: **no semicolons**, single quotes, 2-space, trailing commas (`all`).
- ESLint: `vue/multi-word-component-names` off, `vue/html-self-closing` off, `@typescript-eslint/no-explicit-any` is `warn` not `error`.
- SCSS preprocessor auto-prepends `@use "~/assets/css/_main.scss" as *` — don't re-import it per-file.

## Layout

- `app/` — Nuxt srcDir: `pages/`, `components/` (auto-imported flat, no path prefix), `layouts/`, `utils/`.
- `server/` — `api/` (data endpoints), `routes/` (RSS/Atom/JSON feeds + `/fa/*` mirrors), `plugins/sitemap-prismic.ts`, `utils/`.
- `modules/` — local Nuxt modules (e.g. `strip-router-volar-plugin.ts`).
- `i18n/locales/` — `en.json`, `fa.json`.
- `.prismic-custom-types/` — JSON schemas to seed a Prismic repo (not runtime code).

## Non-obvious gotchas

- **`nuxt-seo-utils` is pinned to `^7.x`** — v8 ships unhead 2 which breaks the head-merge here. Do not bump. **`@takumi-rs/core`** is required for OG-image rendering (handles RTL/Persian); OG components use the `.takumi.vue` suffix and are picked up by `nuxt-og-image` automatically.
- **`sitemap.autoI18n: false` is intentional** — `server/plugins/sitemap-prismic.ts` already emits both `/` and `/fa/*` URLs. Re-enabling autoI18n duplicates them.
- **`app.head.titleTemplate: '%s'`** — pages already include `" :: Alireza Esfahani"`. Do not introduce another template or `nuxt-seo-utils` will double-brand the title.
- **i18n strategy is `prefix_except_default`** — English at `/`, Farsi at `/fa/*`. Vazirmatn must keep the `arabic` subset in `nuxt.config.ts` or Persian falls back to a system font.
- **Gemini Projects auto-translation** lives in `server/utils/gemini.ts`; missing `NUXT_GEMINI_API_KEY` falls back to English **silently and on purpose**. Don't add error-surfacing here.

## Workflow

- **Do not commit or push on the user's behalf.** Stage at most; leave commit messages and final commits for the user. Applies even when executing an approved plan.
- For UI changes, run `pnpm dev` and verify in the browser at both `/` and `/fa/`. Typecheck/lint passing ≠ feature working.
- Inline comments in `nuxt.config.ts` document the _why_ for each non-default — preserve or update them rather than silently dropping them in edits.

## Rules

- Always use Context7 MCP for library documentation
- Always use named exports
- Never re-export in index.ts
- Only add comments when absolutely necessary (complex logic, non-obvious behavior, or workarounds)

## Plan mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
