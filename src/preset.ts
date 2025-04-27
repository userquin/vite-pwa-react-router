import type { Preset } from '@react-router/dev/config'
import type { VitePluginPWAAPI } from 'vite-plugin-pwa'

export function ReactRouterVitePWAPreset(): Preset {
  return {
    name: 'vite-pwa:react-router:preset',
    reactRouterConfig() {
      return {
        async buildEnd({ viteConfig }) {
          console.log('Building PWA...')

          const api: VitePluginPWAAPI | undefined = viteConfig.plugins.find(p => p.name === 'vite-plugin-pwa')?.api
          await api?.generateSW()
        },
      }
    },
  }
}
