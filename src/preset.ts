import type { Preset } from '@react-router/dev/config'

export function ReactRouterVitePWAPreset(): Preset {
  return {
    name: 'vite-pwa:react-router:preset',
    reactRouterConfig() {
      return {
        async buildEnd({ viteConfig }) {
          // find the preset plugin and use the exposed hook
          // eslint-disable-next-line no-console
          console.log(viteConfig)
          // const buildPWA = context.buildPWA
          //
          // if (!buildPWA)
          //   throw new Error('Cannot find ReactRouterPWAPlugin, did you forgot to add it to the vite.config file?')
          //
          // await buildPWA()
        },
      }
    },
  }
}
