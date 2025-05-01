import { PWAManifest } from '@vite-pwa/react-router/components'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

if (!import.meta.env.SSR) {
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
}

export function Layout({ children }: { children: React.ReactNode }) {
  // const data = useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link href="/favicon.ico" rel="icon" sizes="48x48" />
        <link href="/favicon.svg" rel="icon" sizes="any" type="image/svg+xml" />
        <link href="/apple-touch-icon-180x180.png" rel="apple-touch-icon" />
        <Meta />
        <PWAManifest />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
