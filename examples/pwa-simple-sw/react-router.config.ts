import type { Config } from '@react-router/dev/config'
import { ReactRouterVitePWAPreset } from '@vite-pwa/react-router/preset'

const spa = process.env.SPA === 'true'

export default {
  ssr: !spa,
  prerender: spa ? undefined : ['/'],
  presets: [ReactRouterVitePWAPreset()],
} satisfies Config
