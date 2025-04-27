import type { PluginOption, ResolvedConfig } from 'vite'
import type { ReactRouterPWAContext, ResolvedReactRouterConfig } from '../context'

export function PresetPlugin(ctx: ReactRouterPWAContext) {
  return {
    name: 'vite-pwa:react-router:preset:plugin',
    enforce: 'pre',
    configResolved(config) {
      console.log(config.environments)
      try {
        console.log(lookupContext(config))
      }
      catch (e) {
        console.error('Cannot find ReactRouterPluginContext in the resolved Vite configuration: missing __reactRouterPluginContext entry!', e)
      }
      if (config.build.ssr) {
        // console.log(ctx.api)

        console.log(lookupContext(config))
        // ctx.resolvedReactRouterConfig = lookupContext(config)?.reactRouterConfig
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
