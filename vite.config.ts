import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * html5/index.html usa #app-boot para o Live Server (bundle em dist/).
 * No dev e no build, o bloco é trocado por ../typescript/main.tsx.
 * No dev, o caminho é reescrito para /@fs/ absoluto (entry fora da raiz do Vite).
 */
const mainEntryFsUrl =
  '/@fs/' + path.resolve(__dirname, 'typescript/main.tsx').replace(/\\/g, '/')

const appBootScript = /<script type="module" id="app-boot">[\s\S]*?<\/script>/

const viteDevHtml = {
  name: 'my-hype:vite-dev-html',
  apply: 'serve' as const,
  transformIndexHtml(html: string) {
    return html.replace(
      appBootScript,
      `<script type="module" src="${mainEntryFsUrl}"></script>`,
    )
  },
}

const viteBuildHtml = {
  name: 'my-hype:vite-build-html',
  apply: 'build' as const,
  transformIndexHtml: {
    order: 'pre' as const,
    handler(html: string) {
      return html.replace(
        appBootScript,
        '<script type="module" src="../typescript/main.tsx"></script>',
      )
    },
  },
}

/** Gera dist/live-manifest.json para html5/index.html no Live Server. */
const liveServerManifest = {
  name: 'my-hype:live-server-manifest',
  apply: 'build' as const,
  writeBundle(_options, bundle) {
    const jsChunk = Object.values(bundle).find(
      (item) => item.type === 'chunk' && item.isEntry && item.fileName.endsWith('.js'),
    )
    const cssAsset = Object.values(bundle).find(
      (item) => item.type === 'asset' && item.fileName.endsWith('.css'),
    )
    if (!jsChunk || jsChunk.type !== 'chunk' || !cssAsset || cssAsset.type !== 'asset') {
      throw new Error('Não foi possível gerar live-manifest.json a partir do build.')
    }
    fs.writeFileSync(
      path.resolve(__dirname, 'dist/live-manifest.json'),
      JSON.stringify({ js: jsChunk.fileName, css: cssAsset.fileName }, null, 2),
    )
  },
}

export default defineConfig({
  root: 'html5',
  publicDir: path.resolve(__dirname, 'assets'),
  plugins: [react(), viteDevHtml, viteBuildHtml, liveServerManifest],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'typescript'),
      '@css': path.resolve(__dirname, 'css3'),
      '@js': path.resolve(__dirname, 'javascript'),
    },
  },
  server: {
    host: true,
    port: 5173,
    fs: { allow: [path.resolve(__dirname)] },
    allowedHosts: ['.trycloudflare.com'],
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['.trycloudflare.com'],
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    base: './',
  },
})
