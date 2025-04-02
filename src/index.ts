import type { PluginOption } from 'vite'
import type { ReactRouterPWAContext } from './context'
import type { ReactRouterPWAOptions } from './types'
import { VitePWA as PWAPlugin } from 'vite-plugin-pwa'
import { version } from '../package.json'
import { configurePWA } from './config'
import { SWPlugin } from './plugins/sw'

export function ReactRouterVitePWA(
  config: ReactRouterPWAOptions = {},
) {
  const ctx: ReactRouterPWAContext = {
    options: undefined!,
    resolvedConfig: undefined!,
    api: undefined,
    build: false,
    sw: {
      version,
      enablePrecaching: true,
      navigateFallback: undefined,
      clientsClaimMode: 'auto',
      cleanupOutdatedCaches: true,
      promptForUpdate: false,
      routes: [],
    },
  }
  const pwaOptions = configurePWA(ctx, config)
  return [
    // remove the build plugin: this plugin will copy registerSW.js and webmanifest to the server build
    PWAPlugin(pwaOptions),
    SWPlugin(ctx),
    // BuildPlugin(ctx),
  ] as PluginOption
}
