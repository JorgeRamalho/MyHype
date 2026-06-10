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
/**
 * O index.html (raiz "html5") importa ../typescript/main.tsx, que fica fora da
 * raiz do Vite. No dev server a URL "../" colapsa para "/typescript/main.tsx" e
 * o arquivo não é encontrado; este plugin reescreve o src para o caminho /@fs/
 * absoluto (apenas em dev — no build o caminho relativo funciona normalmente).
 */
const mainEntryFsUrl =
  '/@fs/' + path.resolve(__dirname, 'typescript/main.tsx').replace(/\\/g, '/')

const entryOutsideRoot = {
  name: 'my-hype:entry-fora-da-raiz',
  apply: 'serve' as const,
  transformIndexHtml(html: string) {
    return html.replace('../typescript/main.tsx', mainEntryFsUrl)
  },
}

export default defineConfig({
  root: 'html5',
  publicDir: path.resolve(__dirname, 'assets'),
  plugins: [react(), entryOutsideRoot],
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
