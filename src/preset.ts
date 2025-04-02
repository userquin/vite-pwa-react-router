import type { Preset } from '@react-router/dev/config'

export function ReactRouterPreset(): Preset {
  return {
    name: 'vite-pwa:react-router:preset',
    reactRouterConfig() {
      return {
        async buildEnd({ viteConfig }) {
          const remixPwaBuildPlugin = viteConfig.plugins.find(plugin => plugin.name === 'vite-pwa:react-router:build')

          if (!remixPwaBuildPlugin)
            throw new Error('Remix PWA Plugin must be preset in vite.config')

          // await remixPwaBuildPlugin.onBuildEnd()
        },
      }
    },
    reactRouterConfigResolved({ reactRouterConfig }) {
      // eslint-disable-next-line no-console
      console.log(reactRouterConfig)
    },
  }
}
