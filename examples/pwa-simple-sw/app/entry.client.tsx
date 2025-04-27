/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { HydratedRouter } from 'react-router/dom'

import('virtual:pwa-register').then(({ registerSW }) => {
  registerSW({
    immediate: true,
    onRegisteredSW(swScriptUrl) {
      console.log('SW registered: ', swScriptUrl)
    },
    onOfflineReady() {
      console.log('PWA application ready to work offline')
    },
  })
})

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  )
})
