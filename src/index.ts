import type { PluginOption } from 'vite'
import type { ReactRouterPWAContext } from './context'
import type {
  ReactRouterPWAInjectManifest,
  ReactRouterPWAOptions,
  ReactRouterPWASWOptions,
} from './types'
import { VitePWA as PWAPlugin } from 'vite-plugin-pwa'
import { version } from '../package.json'
import { configurePWA } from './config'
import { PresetPlugin } from './plugins/preset'
import { SWPlugin } from './plugins/sw'
import { VirtualPlugin } from './plugins/virtual'

export type {
  ReactRouterPWAInjectManifest,
  ReactRouterPWAOptions,
  ReactRouterPWASWOptions,
}

export function ReactRouterVitePWAPlugin(
  config: ReactRouterPWAOptions = {},
) {
  const ctx: ReactRouterPWAContext = {
    options: undefined!,
    resolvedReactRouterConfig: undefined!,
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
  const pwaPlugin = PWAPlugin(pwaOptions)
  ctx.api = pwaPlugin.find(p => p.name === 'vite-plugin-pwa')?.api
  return [
    VirtualPlugin(),
    [...pwaPlugin.filter(p => p.name !== 'vite-plugin-pwa:build')] as PluginOption,
    PresetPlugin(ctx),
    SWPlugin(ctx),
  ] as PluginOption
}
