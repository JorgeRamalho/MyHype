declare global {
  interface Window {
    /** Definido em html5/index.html antes do bundle (modo Live Server). */
    __MY_HYPE_ASSET_BASE__?: string
  }
}

/** Resolve caminho de arquivo público: Vite usa `/`; Live Server usa `../dist/`. */
export function publicAsset(path: string): string {
  const file = path.replace(/^\//, '')
  const base = typeof window !== 'undefined' ? window.__MY_HYPE_ASSET_BASE__ : undefined
  if (base) {
    const normalized = base.endsWith('/') ? base : `${base}/`
    return new URL(file, normalized).href
  }
  return path.startsWith('/') ? path : `/${file}`
}
