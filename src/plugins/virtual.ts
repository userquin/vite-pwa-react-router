import type { PluginOption } from 'vite'

export function VirtualPlugin() {
  return {
    name: 'vite-pwa:react-router:virtual:plugin',
    enforce: 'pre',
    configEnvironment(name, config) {
      // remix doesn't configure the consumer option
      if (config.consumer === 'server' || name === 'ssr') {
        const resolve = config.resolve ?? {}
        let noExternal = resolve.noExternal ?? []
        if (noExternal === true) {
          noExternal = []
        }
        else if (Array.isArray(noExternal)) {
          noExternal = noExternal.filter(p => p !== 'workbox-window')
        }
        else {
          noExternal = [noExternal]
        }
        noExternal.push(
          'workbox-window',
          'virtual:pwa-info',
          'virtual:pwa-assets/head',
          'virtual:vite-pwa/react-router/sw',
        )
        resolve.noExternal = noExternal
        config.resolve = resolve
      }
      else if (config.consumer === 'client' || name === 'client') {
        const optimizeDeps = config.optimizeDeps ?? {}
        const include = optimizeDeps.include ?? []
        include.push('workbox-window')
      }

      return config
    },
  } satisfies PluginOption
}
