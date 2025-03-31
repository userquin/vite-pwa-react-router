import type { Preset } from '@react-router/dev/config'
import type { RouteConfig } from '@react-router/dev/routes'
import type { ResolvedVitePWAOptions, VitePluginPWAAPI } from 'vite-plugin-pwa'
import type { ReactRouterPWAInjectManifest } from './types'

export interface ReactRouterPWASWContext {
  version: string
  enablePrecaching: boolean
  navigateFallback?: string
  clientsClaimMode: 'auto' | boolean
  cleanupOutdatedCaches: boolean
  promptForUpdate: boolean
  routes: RouteConfig
}

export interface ResolvedPWASWOptions {
  injectManifest: Required<ReactRouterPWAInjectManifest>
}

export interface ReactRouterPWAContext {
  resolvedPWAOptions?: ResolvedVitePWAOptions
  api?: VitePluginPWAAPI
  build: boolean
  sw: ReactRouterPWASWContext
  resolvedConfig: Parameters<NonNullable<Preset['reactRouterConfigResolved']>>['0']['reactRouterConfig']
  options: ResolvedPWASWOptions
}
