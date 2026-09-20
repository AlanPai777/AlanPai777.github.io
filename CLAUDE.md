# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start Vite dev server (default port 5173)
npm run build    # tsc -b (typecheck, no emit) + vite build -> dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint (uses .oxlintrc.json)
```

There is no test suite configured in this project.

## Architecture

React 19 + TypeScript + Vite 8, built as a **multi-page static site** (not an SPA with client-side routing) — each real page is its own Vite entry, listed in `vite.config.ts`'s `build.rollupOptions.input`. This is deliberate: the site deploys to GitHub Pages, a static host with no server-side rewrite, so each route needs to be a real HTML file rather than relying on a JS router + a 404.html redirect trick. To add a new page: create `<name>/index.html` (copy an existing one, point its `<script>` at a new `src/<name>-main.tsx`), add a `<name>-main.tsx` entry that mounts a page component, and add the entry to `vite.config.ts`'s `input` map.

Current pages:

- **`/` (home)** — `index.html` -> `src/main.tsx` -> `App` -> `Index`, which composes the page as one vertical stack of sections: `Hero` (inline at the top of `src/Index.tsx`) -> `src/components/AboutSection.tsx` -> `src/components/FeaturedVideoSection.tsx` -> `src/components/PhilosophySection.tsx` -> `src/components/ServicesSection.tsx`.
- **`/work/`** — `work/index.html` -> `src/work-main.tsx` -> `src/WorkPage.tsx`. A directory of external project links (each item is an `<a target="_blank">` out to that project's own separately-hosted site — these are not sub-pages of this repo).

Both pages share `src/components/Navbar.tsx` and `src/components/CrossfadeVideo.tsx` (the hero-style background video) rather than duplicating that markup/logic — reuse these for any new page that wants the same look, instead of re-deriving them.

Each homepage section component is self-contained (owns its own copy, video URLs, and `framer-motion` scroll-in animation) and takes no props — there's no shared page state. Add a new homepage section by creating a component in `src/components/` and inserting it into the `Index` component's render in `src/Index.tsx`.

`Navbar`'s links currently mix real paths (`/work/`) with anchor placeholders (`/#about`, `#`, `/#contact`) for destinations that don't exist as wired-up targets yet (no section `id`s on the homepage, no Blog page) — update these together once those land, don't leave the two conventions to drift.

### Video crossfade (`CrossfadeVideo`)

The hero-style background video does *not* use CSS transitions for its fade. `src/components/CrossfadeVideo.tsx` drives `video.style.opacity` directly via `requestAnimationFrame` (`animateOpacity` helper), keyed off the video element's own events (`canplay`, `timeupdate`, `ended`) so the loop point crossfades to black instead of hard-cutting. If you touch this behavior, keep the fade logic in JS — don't replace it with a CSS `transition` on opacity, since the timing is deliberately synced to `video.currentTime`/`duration`, not to a state change. Both `Index.tsx`'s `Hero` and `WorkPage.tsx` use this component rather than each having their own copy of the effect.

### Scroll-in animations

Sections below the hero use `framer-motion`'s `useInView(ref, { once: true, margin: '-100px' })` per animated element, then branch `animate={inView ? {...} : {}}` off that. This is a manual pattern (not `whileInView`) repeated across `AboutSection`, `FeaturedVideoSection`, `PhilosophySection`, and `ServicesSection` — follow the same pattern for consistency when adding new animated content.

### Styling

- Tailwind CSS v4, wired in via the `@tailwindcss/vite` plugin (`vite.config.ts`) — there is no `tailwind.config.js` or `postcss.config.js`; Tailwind is invoked purely through `@import "tailwindcss"` in `src/index.css`.
- `.liquid-glass` (defined in `src/index.css` under `@layer components`) is the shared frosted-glass treatment used on the navbar, buttons, pills, and cards throughout the site — a translucent background plus a `::before` gradient-border overlay (uses `mask-composite: exclude` to ring only the border). Reuse this class for any new glass-style UI rather than re-deriving the blur/border effect.
- Headings that need the serif display font use inline `style={{ fontFamily: "'Instrument Serif', serif" }}` rather than a Tailwind utility, since the font is loaded via a `@import url(...)` Google Fonts request in `src/index.css` and isn't registered in a Tailwind theme.
- The whole page is dark-mode-only (`bg-black`, white/[opacity] text) — there is no light theme or theme toggle.

### Icons

`lucide-react` (current major, v1.x) no longer ships brand/social logos. `Instagram` and `Twitter` icons are hand-rolled SVG components in `src/components/icons.tsx` (matching lucide's stroke style) rather than imported from the library — use that file, don't try to import `Instagram`/`Twitter` from `lucide-react`.

### Assets

All video sources are local files in `public/videos/` (`hero.mp4`, `featured-video.mp4`, `philosophy.mp4`, `services-research.mp4`, `services-design.mp4`), referenced as root-absolute string constants (`/videos/....mp4`) at the top of each section file. If the site is deployed to a GitHub Pages *project* page (`<user>.github.io/<repo>/`) rather than a *user* page (`<user>.github.io/`), these paths need to move in step with whatever `base` is set in `vite.config.ts` — a root-absolute `/videos/...` path will 404 under a non-root base unless updated to match.

**Self-contained static project pages** (the individual work sites `WorkPage`'s cards link out to — plain HTML/CSS one-pagers with no Vite/React/Tailwind dependency, e.g. an academic-paper-style project page + its PDF) belong in `public/projects/<slug>/`, *not* inside `work/`. `work/` is reserved for the `/work/` page's own Vite entry (`work/index.html` + `src/work-main.tsx`) — anything else dropped next to it is invisible to the production build, since Vite's build only emits files reachable from a registered `rollupOptions.input` entry or from `public/`; Vite's *dev* server will still serve an unregistered HTML file directly (masking the problem locally) even though `vite build` silently drops it. `public/` bypasses this entirely by copying byte-for-byte into `dist/`, same as the videos above.

`vite.config.ts` has a small custom plugin, `publicDirIndexFallback`, that exists only to smooth over one more dev-vs-prod gap for these pages: `vite dev` does not resolve a directory-style URL (`/projects/<slug>/`) to that directory's `index.html` when the directory lives under `publicDir` — `vite preview` and GitHub Pages both do this correctly, dev alone doesn't. The plugin's `configureServer` middleware closes that gap so `npm run dev` behaves the same as production. It only runs in dev (`configureServer` never fires during `vite build`) — don't remove it thinking it's dead code, and don't "fix" the underlying dev-server quirk some other way without also removing this.
