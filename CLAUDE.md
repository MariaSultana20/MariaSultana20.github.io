# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Always follow @PLAN.md. I'm an iOS engineer learning web dev — follow the Learning mode instructions in PLAN.md and refer to @LEARNING.md.

## Project status

A personal portfolio site for Maria Sultana. PLAN.md is the spec. It has every section's content, the links, colours, skill data, folder layout and build order. Build Order steps 1–4 are done: theme, navbar, Hero, About, the Skills sphere, Experience and Projects. Competitive Programming, Achievements and Contact are still placeholders (Step 5).

- Theme tokens live in `src/styles/theme.css` and global rules in `src/styles/global.css`. Each component keeps its own CSS file next to it (for example `Navbar/Navbar.css`).
- Every section renders through the shared `src/components/Section/Section.jsx` wrapper.
  - The `<section>` is full width and the inner div is centred.
  - An optional `background` prop draws behind the content; the Hero uses it for its starfield.
- Shared pieces:
  - `.button` / `.button--primary`, `.tag` / `.tag-list` and `.sr-only` live in `global.css`
  - Scroll-reveal presets live in `src/lib/motion.js`. Spread `{...reveal}` or `{...revealWithDelay(n)}` onto a `motion.*` element.
  - Toggle buttons (skill chips, project filters) use `aria-pressed`, and their CSS selects on `[aria-pressed='true']`.
  - `SocialLinks` is reusable; pick icons with its `only` prop
  - `App.jsx` wraps everything in `<MotionConfig reducedMotion="user">`
- The Hero starfield is a plain 2D `<canvas>`, not three.js, so three.js stays out of the first page load.
- The profile photo is `public/images/profile.jpg`.
- Projects:
  - `ProjectImage` renders `project.image`, or the category-icon placeholder when there is no image.
  - The project marked `featured: true` is shown above the filters and left out of the grid.
- Skills sphere:
  - `Skills.jsx` owns the state (highlighted category, phone vs desktop, Reduce Motion) and the lazy loading.
  - `SkillSphere.jsx` is the separately downloaded file, with three.js, r3f and drei inside. Keep three.js imports out of every other file, or three.js ends up in the first page load.
  - Labels use the self-hosted font `public/fonts/inter-latin-600.woff`, because drei `<Text>` needs a woff or ttf file.
  - The radius values (16 desktop, 14 phone) are sized so the widest labels don't get cut off at the canvas edge. Re-check this when adding long skill names.
  - The labels sit inside a rotating group, so billboarding uses `inverse(parent rotation) × camera rotation`, not a plain copy of the camera's rotation.
- `src/hooks/useActiveSection.js` drives the navbar highlight. The nav items are listed in `Navbar.jsx`.

## Git workflow

- Commit in each smallest step with a meaningful commit message: one logical piece per commit (a data file, a hook, a component, its styles). Don't wait until a whole Build Order step is finished.
- Run `npm run lint` before each commit.
- The remote is `origin` → `https://github.com/MariaSultana20/MariaSultana20.github.io` (branch `main`). Push after each completed piece of work.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # production build to dist/
npm run preview  # serve the built dist/
npm run lint     # ESLint (flat config, eslint.config.js)
```

There is no test framework or TypeScript. The project is plain JS/JSX (ES modules).

## Stack

- React 19, Vite 8, `@vitejs/plugin-react`
- `three`, `@react-three/fiber` v9, `@react-three/drei` v10 for the 3D skill sphere and the hero background
- `framer-motion` for scroll-reveal animations
- `react-icons` for icons
- Contact form: Formspree. There is no backend. The endpoint ID goes in `src/data/links.js`.
- Deploy target: GitHub Pages at `https://mariasultana20.github.io` through GitHub Actions, with Vite `base: '/'`.

## Intended architecture (from Plan.md)

- **Content lives in data files, not in components.** Put it in `src/data/` (`links.js`, `skills.js`, `projects.js`, `experience.js`, `contests.js`). Every URL goes in `links.js`, and components import from there.
- **One folder per section** under `src/components/` (Navbar, Hero, About, Experience, Skills, Projects, CompetitiveProgramming, Achievements, Contact). `App.jsx` puts them together in order on a single scrolling page. The navbar smooth-scrolls to each section and highlights the active one.
- **Skill sphere** (`src/components/Skills/SkillSphere.jsx`) is the centrepiece:
  - drei `<Text>` labels placed on a Fibonacci sphere, each turned to face the camera every frame
  - auto-rotate, drag with inertia, hover to scale and brighten a label
  - legend chips filter by category and dim the others to 25% opacity
  - a visually hidden `<ul>` lists every skill for screen readers
  - lazy-loaded with `React.lazy`, and mounted only when the Skills section scrolls into view, to keep three.js out of the first page load
  - below 768px, shows only the skills marked `core: true`
  - PLAN.md §3.5 has the exact camera, fog and colour values
- **Project screenshots are optional.** Each project in `projects.js` can have an `image` field such as `/images/projects/<file>`. When it is missing, the card shows a gradient placeholder with a category icon.
- **Theme:** dark (`#050c14` background, `#64ffda` teal accent), Inter and JetBrains Mono fonts. Define the colours as CSS variables, which will replace the template's `index.css` tokens.
- **Motion:** every animation must respect `prefers-reduced-motion`, including the sphere's auto-rotate. Below 768px the navbar becomes a hamburger menu.

## Content rules

- The phone number in the CV must **never** appear on the site.
- Static assets in `public/`:
  - `Maria-Sultana-CV.pdf`, which the Resume and Download CV buttons link to
  - The CV PDF is in `.gitignore` because it contains the phone number. It exists only locally until a version without the phone number replaces it.
