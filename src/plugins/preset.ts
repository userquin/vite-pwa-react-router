import type { PluginOption, ResolvedConfig } from 'vite'
import type { ReactRouterPWAContext, ResolvedReactRouterConfig } from '../context'

export function PresetPlugin(ctx: ReactRouterPWAContext) {
  return {
    name: 'vite-pwa:react-router:preset:plugin',
    enforce: 'pre',
    applyToEnvironment(env) {
      return env.name === 'client'
    },
    configResolved(config) {
      // const server =
      //     Object.values(config.environments).find(e => e.consumer === 'server')
      /* Object.entries(config.environments).forEach(([name, { consumer }]) => {
        console.log(name, consumer)
      }) */
      if (true) {
        // console.log(ctx.api)

        // console.log(lookupContext(config))
        try {
          ctx.resolvedReactRouterConfig = lookupContext(config)?.reactRouterConfig
          console.log(ctx.resolvedReactRouterConfig?.routes)
          // console.log(ctx.resolvedReactRouterConfig)
          // if (preset && 'pwaContext' in preset) {
          if (ctx.resolvedReactRouterConfig) {
            // console.log(ctx.resolvedReactRouterConfig.routes)
            // const pwaContext = preset.pwaContext()
            // ctx.resolvedReactRouterConfig = pwaContext.reactRouterConfig
            /* if (build) {
              pwaContext.buildPWA = async () => {
                await ctx.api!.generateSW()
              }
            } */
          }
          else {
            throw new Error('Cannot find ReactRouterPWAPreset, did you forgot to add it to the router.config file?')
          }
        }
        catch {
          // just ignore
        }
      }
    },
  } satisfies PluginOption
}

type ReactRouterContext = ResolvedConfig & {
  __reactRouterPluginContext: {
    reactRouterConfig: ResolvedReactRouterConfig
    publicPath: string
    rootDirectory: string
    entryClientFilePath: string
    entryServerFilePath: string
    viteManifestEnabled: boolean
    isSsrBuild: boolean
  }
}

function lookupContext(resolvedViteConfig: ResolvedConfig) {
  if ('__reactRouterPluginContext' in resolvedViteConfig) {
    const context = resolvedViteConfig as ReactRouterContext
    return context.__reactRouterPluginContext
  }
  throw new Error('Cannot find ReactRouterPluginContext in the resolved Vite configuration: missing __reactRouterPluginContext entry!')
}
