# Alan's Portfolio

My personal portfolio, built with React + TypeScript + Vite + Tailwind CSS.

Live site: https://AlanPai777.github.io

## What's here

- **Home** (`/`): intro, about, and highlights, with cinematic video backgrounds.
- **Work** (`/work/`): a directory of my projects. Each entry opens its own project page.
- **Project pages** (`/projects/<slug>/`): self-contained static pages, one per project, each with an abstract, a link to the report (PDF), and a link to the code.

Blog and contact pages are planned but not built yet.

## Tech stack

React 19, TypeScript, Vite 8, Tailwind CSS v4, framer-motion, lucide-react. Deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the production build locally
npm run lint
```

## How the site is structured

The site is a multi-page static build rather than a client-routed SPA, because GitHub Pages is a static host. Each real page is its own Vite entry (see `vite.config.ts`). The individual project pages are plain HTML files under `public/projects/<slug>/`, copied as-is into the build.

To add a project: create `public/projects/<slug>/index.html` (copy an existing one as a template), put its PDF and media in the same folder, then add an entry to the `WORKS` list in `src/WorkPage.tsx`.

## License

The source code is released under the [MIT License](LICENSE). The papers, PDFs, videos, and other content in `public/` are © Alan Pai, all rights reserved, and are not covered by that license.
