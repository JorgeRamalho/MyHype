import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Estrutura de pastas do projeto My Hype:
 *  - html5/       -> index.html (raiz do Vite)
 *  - css3/        -> style.css (design system global)
 *  - typescript/  -> código React + TypeScript (componentes, dados, tipos)
 *  - javascript/  -> utilitários em JavaScript puro (máscaras, validações)
 *  - assets/      -> imagens, logo e arquivos públicos
 */
export default defineConfig({
  root: 'html5',
  publicDir: path.resolve(__dirname, 'assets'),
  plugins: [react()],
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
  },
})
