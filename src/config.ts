import type { ReactRouterPWAContext } from './context'
import type { ReactRouterPWAOptions } from './types'
import { createHash } from 'node:crypto'
import { createReadStream, readFileSync } from 'node:fs'
import { lstat } from 'node:fs/promises'
import { resolve as resolvePath } from 'node:path'
import * as process from 'node:process'
import { SWPlugin } from './plugins/sw'

export function configurePWA(
  ctx: ReactRouterPWAContext,
  pwaOptions: ReactRouterPWAOptions,
) {
  const pwa = preparePWAOptions(ctx, pwaOptions)
  pwa.integration = {
    closeBundleOrder: 'post',
    async configureOptions(viteOptions, options) {
      ctx.resolvedConfig = await loadReactRouterConfig()

      const { ssr, basename, buildDirectory } = ctx.resolvedConfig
      let config: Partial<
        import('workbox-build').BasePartial
          & import('workbox-build').GlobPartial
          & import('workbox-build').RequiredGlobDirectoryPartial
      >

      if (options.strategies === 'injectManifest') {
        const swOptions = ctx.options.injectManifest
        ctx.sw.promptForUpdate = options.registerType !== 'autoUpdate'
        ctx.sw.cleanupOutdatedCaches = swOptions.cleanupOutdatedCaches ?? true
        // We need ctx.sw.enablePrecaching option for remix virtual module,
        // there is no callback to get resolved pwa options.
        // We can only initialize the default injectionPoint: should be fixed in vite-plugin-pwa,
        // the fix is about calling another new hook after calling configureOptions.
        options.injectManifest = options.injectManifest ?? {
          injectionPoint: 'self.__WB_MANIFEST',
        }
        if ('injectionPoint' in options.injectManifest)
          ctx.sw.enablePrecaching = options.injectManifest.injectionPoint !== undefined
        else
          ctx.sw.enablePrecaching = true

        if (ctx.sw.enablePrecaching) {
          if (ssr)
            ctx.sw.navigateFallback = basename || viteOptions.base || '/'
          else
            ctx.sw.navigateFallback = 'index.html'
        }
        options.injectManifest.plugins ??= []
        options.injectManifest.plugins.push(SWPlugin(ctx))

        config = options.injectManifest
      }
      else {
        options.workbox = options.workbox ?? {}
        if (!('navigateFallback' in options.workbox)) {
          if (ssr)
            options.workbox.navigateFallback = basename ?? viteOptions.base ?? '/'
          else
            options.workbox.navigateFallback = 'index.html'
        }

        if (ssr && !('navigateFallbackAllowlist' in options.workbox))
          options.workbox.navigateFallbackAllowlist = [new RegExp(`^${options.workbox.navigateFallback}$`)]

        config = options.workbox
      }

      if (!('globDirectory' in config))
        config.globDirectory = `${buildDirectory}/client`

      if (!('dontCacheBustURLsMatching' in config))
        config.dontCacheBustURLsMatching = /assets\//
    },
    async beforeBuildServiceWorker(options) {
      const { appDirectory, routes, ssr } = ctx.resolvedConfig
      // we only need to handle custom build in SSR:
      // - in dev mode, the pwa plugin will do the work for us
      // - when building, we need to include the navigateFallback entry in the sw precache manifest
      // build flag is enabled in the remix preset in the buildEnd hook
      if (ctx.build && ssr) {
        const entryPoint = Object.values(routes).find(r => r.index === true)
        if (entryPoint) {
          // assume the fallback is the root page, remix integration will allow to configure it
          // we're going to add the / route with the corresponding tsx file hash
          const path = resolvePath(appDirectory, entryPoint.file)
          if (options.strategies === 'injectManifest') {
            options.injectManifest.manifestTransforms ??= []
            options.injectManifest.manifestTransforms.push(async (entries) => {
              entries.push({
                url: options.base,
                revision: await createRevision(path),
                size: await lstat(path).then(s => s.size),
              })
              return { manifest: entries, warnings: [] }
            })
          }
          else {
            options.workbox.additionalManifestEntries ??= []
            options.workbox.additionalManifestEntries.push({
              url: options.base,
              revision: await createRevision(path),
            })
          }
        }
        // prepare context to clean up the server folder in the preset
        ctx.resolvedPWAOptions = options
      }
    },
  }

  return pwa
}

async function createRevision(path: string): Promise<string> {
  return await new Promise((resolve, reject) => {
    const cHash = createHash('MD5')
    const stream = createReadStream(path, 'utf-8')
    stream.on('error', (err) => {
      reject(err)
    })
    stream.on('data', chunk => cHash.update(chunk as BinaryType))
    stream.on('end', () => {
      resolve(cHash.digest('hex'))
    })
  })
}

function preparePWAOptions(ctx: ReactRouterPWAContext, pwaOptions: ReactRouterPWAOptions): ReactRouterPWAOptions {
  const { swOptions, ...pwa } = pwaOptions
  const {
    injectManifest = {},
  } = swOptions ?? {}
  const {
    cleanupOutdatedCaches = true,
    clientsClaimMode = 'auto',
  } = injectManifest
  ctx.options = {
    injectManifest: {
      cleanupOutdatedCaches,
      clientsClaimMode,
    },
  }

  return pwa
}

async function loadReactRouterConfig(): Promise<ReactRouterPWAContext['resolvedConfig']> {
  const rootDirectory = process.env.REACT_ROUTER_ROOT ?? process.cwd()
  const storeFilePath = `${rootDirectory}/.react-router/react-router-pwa-rotues.json`
  const reactRouterResolvedConfig = readFileSync(storeFilePath)
  return JSON.parse(reactRouterResolvedConfig.toString())
}
