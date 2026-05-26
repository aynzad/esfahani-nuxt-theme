import { defineNuxtModule } from 'nuxt/kit'

/**
 * Nuxt injects `vue-router/volar/sfc-route-blocks` into the generated tsconfig, but
 * the top-level vue-router is 4.x (pinned by @nuxtjs/i18n) and doesn't export that
 * subpath, so `nuxt typecheck` fails to resolve it. This project doesn't use <route>
 * blocks, so strip the plugin. Deferred to `modules:done` so our filter runs after
 * Nuxt core has pushed the plugin.
 */
export default defineNuxtModule({
  meta: { name: 'strip-router-volar-plugin' },
  setup(_options, nuxt) {
    nuxt.hook('modules:done', () => {
      nuxt.hook('prepare:types', ({ tsConfig }) => {
        const plugins = tsConfig.vueCompilerOptions?.plugins
        if (Array.isArray(plugins)) {
          tsConfig.vueCompilerOptions!.plugins = plugins.filter(
            p => p !== 'vue-router/volar/sfc-route-blocks',
          )
        }
      })
    })
  },
})
