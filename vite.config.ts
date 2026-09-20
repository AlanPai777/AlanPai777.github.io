import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Unlike `vite preview` or a real static host (GitHub Pages), `vite dev`
// does not resolve a directory-style request (e.g. /projects/<slug>/) to
// that directory's index.html when the directory lives under publicDir.
// This closes that gap so static project pages behave the same way in
// `npm run dev` as everywhere else they're actually served.
function publicDirIndexFallback(): Plugin {
  const publicDir = resolve(import.meta.dirname, 'public')

  return {
    name: 'public-dir-index-fallback',
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'GET' || !req.url) return next()
          const url = req.url.split('?')[0]
          if (!url.endsWith('/') || url === '/') return next()

          const indexPath = resolve(publicDir, `.${url}index.html`)
          if (indexPath.startsWith(publicDir) && existsSync(indexPath)) {
            res.setHeader('Content-Type', 'text/html')
            res.end(readFileSync(indexPath))
            return
          }
          next()
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), publicDirIndexFallback()],
  // Multi-page site, not a client-routed SPA — disable Vite's dev-only SPA
  // history fallback so a directory-style request like /projects/<slug>/
  // resolves to that directory's static index.html (matching how GitHub
  // Pages actually serves it) instead of silently falling back to the
  // homepage's index.html in dev.
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        work: resolve(import.meta.dirname, 'work/index.html'),
      },
    },
  },
})
