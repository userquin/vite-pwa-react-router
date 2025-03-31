<p align='center'>
<img src='./hero.png' alt="@vite-pwa/react-router - Zero-config PWA Plugin for React Router"><br>
Zero-config PWA Plugin for React Router
</p>

<p align='center'>
<a href='https://www.npmjs.com/package/@vite-pwa/react-router' target="__blank">
<img src='https://img.shields.io/npm/v/@vite-pwa/react-router?color=33A6B8&label=' alt="NPM version">
</a>
<a href="https://www.npmjs.com/package/@vite-pwa/react-router" target="__blank">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@vite-pwa/react-router?color=476582&label=">
</a>
<a href="https://vite-pwa-org.netlify.app/frameworks/react-router" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20guides&color=2e859c" alt="Docs & Guides">
</a>
<br>
<a href="https://github.com/vite-pwa/react-router" target="__blank">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/vite-pwa/react-router?style=social">
</a>
</p>

<br>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## 🚀 Features

- 📖 [**Documentation & guides**](https://vite-pwa-org.netlify.app/)
- 👌 **Zero-Config**: sensible built-in default configs for common use cases
- 🔩 **Extensible**: expose the full ability to customize the behavior of the plugin
- 🦾 **Type Strong**: written in [TypeScript](https://www.typescriptlang.org/)
- 🔌 **Offline Support**: generate service worker with offline support (via Workbox)
- ⚡ **Fully tree shakable**: auto inject Web App Manifest
- 💬 **Prompt for new content**: built-in support for Vanilla JavaScript, Vue 3, React, Svelte, SolidJS and Preact
- ⚙️ **Stale-while-revalidate**: automatic reload when new content is available
- ✨ **Static assets handling**: configure static assets for offline support
- 🐞 **Development Support**: debug your custom service worker logic as you develop your application
- 🛠️ **Versatile**: integration with meta frameworks: [îles](https://github.com/ElMassimo/iles), [SvelteKit](https://github.com/sveltejs/kit), [VitePress](https://github.com/vuejs/vitepress), [Astro](https://github.com/withastro/astro), [Nuxt 3](https://github.com/nuxt/nuxt), [Remix](https://github.com/remix-run/remix) and [React Router](https://github.com/remix-run/react-router)
- 💥 **PWA Assets Generator**: generate all the PWA assets from a single command and a single source image
- 🚀 **PWA Assets Integration**: serving, generating and injecting PWA Assets on the fly in your application

## 📦 Install

`@vite-pwa/react-router` requires **React Router 7 or above**.

```bash
npm i @vite-pwa/react-router -D

# yarn
yarn add @vite-pwa/react-router -D

# pnpm
pnpm add @vite-pwa/react-router -D
```

## 🦄 Usage

Import the `@vite-pwa/react-router` helper, create the Remix PWA Preset and the PWA Plugin and configure them in your Vite configuration file:

```ts
// vite.config.js
import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { RemixVitePWA } from '@vite-pwa/remix'
import { defineConfig } from 'vite'

installGlobals()

const { RemixVitePWAPlugin, RemixPWAPreset } = RemixVitePWA()

export default defineConfig({
  plugins: [
    remix({
      presets: [RemixPWAPreset()],
    }),
    RemixVitePWAPlugin({
      // PWA options
    })
  ]
})
```
Read the [📖 documentation](https://vite-pwa-org.netlify.app/frameworks/react-router) for a complete guide on how to configure and use
this plugin.

[//]: # ()
[//]: # (## ⚡️ Examples)

[//]: # ()
[//]: # (You need to stop the dev server once started and then run `npm run build && npm run preview` to see the PWA in action.)

[//]: # (<table>)

[//]: # (<thead>)

[//]: # (<tr>)

[//]: # (<th>Example</th>)

[//]: # (<th>Source</th>)

[//]: # (<th>Playground</th>)

[//]: # (</tr>)

[//]: # (</thead>)

[//]: # (<tbody>)

[//]: # (<tr>)

[//]: # (<td><code>Auto Update PWA</code></td>)

[//]: # (<td><a href="https://github.com/vite-pwa/remix/tree/main/examples/pwa-simple">GitHub</a></td>)

[//]: # (<td>)

[//]: # (<a href="https://stackblitz.com/fork/github/vite-pwa/remix/tree/main/examples/pwa-simple" target="_blank" rel="noopener noreferrer">)

[//]: # (  <img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Open in StackBlitz" width="162" height="32">)

[//]: # (</a>)

[//]: # (</td>)

[//]: # (</tr>)

[//]: # (<tr>)

[//]: # (<td><code>Prompt for Update PWA</code></td>)

[//]: # (<td><a href="https://github.com/vite-pwa/remix/tree/main/examples/pwa-prompt">GitHub</a></td>)

[//]: # (<td>)

[//]: # (<a href="https://stackblitz.com/fork/github/vite-pwa/remix/tree/main/examples/pwa-prompt" target="_blank" rel="noopener noreferrer">)

[//]: # (  <img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="Open in StackBlitz" width="162" height="32">)

[//]: # (</a>)

[//]: # (</td>    )

[//]: # (</tr>)

[//]: # (</tbody>)

[//]: # (</table>)

## 👀 Full config

Check out the following links for more details:

- [Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Workbox](https://developers.google.com/web/tools/workbox)

## 📄 License

[MIT](./LICENSE) License &copy; 2025-PRESENT [Anthony Fu](https://github.com/antfu)
