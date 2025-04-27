import { ReactRouterVitePWAPreset } from '@vite-pwa/react-router/preset'

export default {
  ssr: process.env.SPA !== 'true',
  presets: [ReactRouterVitePWAPreset()],
}
