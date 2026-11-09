# Learning Web Development Through My Portfolio
*A guide for an iOS engineer (Swift · UIKit · SwiftUI · Combine · MVVM-C)*

You already know most of the ideas behind modern web development. React works a lot like SwiftUI, JavaScript's `async/await` works like Swift's, and three.js works like SceneKit. This guide maps what you know to the web, then walks through what each build step of the portfolio teaches.

**How to use it:** before each build step in `PLAN.md`, read the matching section below. After Claude writes the code, do the "Check yourself" tasks **by hand**. That's where the learning happens.

---

## Part 1 — The Big Picture

### How a website works
1. The browser downloads **HTML** (structure), **CSS** (styling) and **JavaScript** (behaviour).
2. React is a JavaScript library that **builds the HTML for you** from components, much as SwiftUI builds views from `body`.
3. **Vite** is the build tool, a bit like Xcode's build system:
   - During development, `npm run dev` runs a live-reloading server (similar to SwiftUI Previews).
   - For release, `npm run build` bundles everything into small static files in `dist/`.
4. **GitHub Pages** serves those static files. The site has no server-side code, just files.

### Your iOS → Web dictionary

| iOS concept | Web equivalent | Notes |
|---|---|---|
| Swift | **JavaScript** (or TypeScript) | JS has dynamic types. TypeScript adds Swift-like type safety. |
| Xcode | **VS Code + terminal** | You run commands yourself (`npm run dev`) |
| Swift Package Manager / CocoaPods | **npm** | `package.json` ≈ `Package.swift`; `node_modules/` ≈ downloaded packages |
| `Info.plist` / build settings | `vite.config.js`, `package.json` | |
| SwiftUI `View` | **React component** (a function returning JSX) | Same idea: UI is a function of state |
| `body` | the component's `return (...)` | |
| `@State` | **`useState`** | `const [count, setCount] = useState(0)` |
| `@Binding` / init parameters | **props** | Data passed from parent to child |
| `.onAppear` / `.task` | **`useEffect`** | Runs side effects after rendering |
| `@Environment` / `EnvironmentObject` | **React Context** | Shared data without passing it down by hand |
| `ForEach(items)` | **`items.map(item => <Card key={item.id} />)`** | `key` ≈ `Identifiable.id` |
| Auto Layout / `HStack` / `VStack` | **CSS Flexbox & Grid** | `display: flex; flex-direction: row` ≈ `HStack` |
| Size classes | **Media queries** | `@media (max-width: 768px) { ... }` |
| Asset catalog colours | **CSS variables** | `--accent: #64ffda;` then `color: var(--accent)` |
| `UIView.animate` / `withAnimation` | **CSS transitions / framer-motion** | |
| `URLSession` + `async/await` | **`fetch` + `async/await`** | Almost the same syntax |
| `Codable` | **`response.json()`** | JSON becomes plain JS objects; no decoding step |
| `UserDefaults` | **`localStorage` / `sessionStorage`** | |
| SceneKit / RealityKit | **three.js / react-three-fiber** | Scene, camera, mesh, render loop |
| `CADisplayLink` | **`requestAnimationFrame` / r3f `useFrame`** | Runs once per frame |
| Accessibility (VoiceOver labels) | **Semantic HTML, `alt`, ARIA** | Screen readers rely on these |
| TestFlight / App Store | **GitHub Pages / Vercel** | Deploying takes seconds; there's no review |
| Instruments | **Chrome DevTools + Lighthouse** | Performance, network, accessibility audits |

### The three languages of the web
- **HTML:** *what* is on the page (headings, paragraphs, buttons, images). In React you write it as **JSX** inside JavaScript.
- **CSS:** *how* it looks (colours, spacing, layout, animation).
- **JavaScript:** *what it does* (state, events, fetching data).

---

## Part 2 — What Each Build Step Teaches

### Step 1 — Setup, Theme, Navbar
**You'll learn:**
- **Project structure:**
  - `index.html` is the single page.
  - `src/main.jsx` mounts React into it, like `@main App`.
  - `src/App.jsx` is the root component.
- **npm basics:** `npm install`, `npm run dev`, and what `package.json` scripts are.
- **CSS variables:** the theme (`--bg`, `--text`, `--accent`), the web version of an asset catalog.
- **Google Fonts:** loading Inter and JetBrains Mono.
- **Flexbox:** the navbar is `display: flex; justify-content: space-between`, like an `HStack` with a `Spacer()`.
- **`position: fixed`:** keeps the navbar pinned to the top.
- **Smooth scrolling:** `html { scroll-behavior: smooth; }` and anchor links (`href="#about"`).
- **Media queries:** switching to the hamburger menu below 768px.
- **IntersectionObserver:** highlighting the nav link for the section on screen. It notices when an element scrolls into view.

**Check yourself:**
- [ ] Change `--accent` to another colour and watch the whole site update.
- [ ] Open Chrome DevTools (Cmd+Opt+I), select the navbar, and change its padding live.
- [ ] Explain the difference between `display: flex` and `display: grid` in your own words.

### Step 2 — Hero & About
**You'll learn:**
- **Components and props:** e.g. a `<StatCounter value={1600} label="problems solved" />` component used four times.
- **`useState` + `useEffect`:**
  - The typing animation is a timer that updates state, like a `Timer.publish` in SwiftUI.
  - `useEffect` also returns a **cleanup function** that clears the timer, like cancelling a Combine subscription.
- **framer-motion:** `<motion.div initial={{opacity:0}} animate={{opacity:1}}>`, a declarative animation much like `.transition()` in SwiftUI.
- **Images in `public/`:** anything in `public/` is served as-is (`/images/profile.jpg`).
- **Accessibility:** `alt` text on images and real `<a>` and `<button>` elements.

**Check yourself:**
- [ ] Add a fourth typing title, then remove it.
- [ ] Find the `useEffect` cleanup in the typing component and explain why the timer would leak without it.
- [ ] Change the stat counter's animation speed.

### Step 3 — The 3D Skill Sphere ⭐
**You'll learn:**
- **three.js concepts** (you know these from SceneKit):
  - **Scene:** the world
  - **Camera:** `PerspectiveCamera` with a field of view (`fov`)
  - **Mesh:** geometry plus material; here, each text label
  - **Renderer:** draws to a `<canvas>`
- **react-three-fiber (r3f):** writes three.js with React components. `<Canvas>` is the scene, and `<Text>` (from drei) is a 3D label.
- **`useFrame`:** runs code every frame, like `CADisplayLink`. This is where the rotation happens.
- **`useRef`:** holds a reference to the 3D object without re-rendering, a bit like keeping a `weak var` to a view.
- **Maths:** the **Fibonacci sphere** spreads points evenly; spherical → Cartesian coordinates.
- **Billboarding:** copying the camera's rotation so the labels always face you.
- **Pointer events:**
  - Drag to rotate with `onPointerDown/Move/Up`.
  - Momentum: keep a velocity and multiply it by a friction value like 0.95 each frame.
- **Lazy loading:** `React.lazy` + `Suspense` delays downloading three.js until it's needed, like on-demand resources.
- **`prefers-reduced-motion`:** the web version of iOS's Reduce Motion setting.

**Check yourself:**
- [ ] Change the sphere's radius and rotation speed.
- [ ] Add a new skill to `skills.js` and confirm the Fibonacci layout re-spaces everything automatically.
- [ ] Change the friction value and feel the difference when dragging.
- [ ] Turn on "Reduce motion" in macOS System Settings → Accessibility → Display and confirm the sphere stops.

### Step 4 — Experience & Projects
**You'll learn:**
- **Data-driven UI:** the content lives in `src/data/*.js` and components `.map()` over it, like a `List` over an array of models.
- **`key` prop:** why React needs a stable `id` for list items (the same reason as `Identifiable`).
- **CSS Grid:** the project cards use `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`, a responsive grid in one line.
- **Filtering with state:** a `filter` state plus `projects.filter(p => filter === 'All' || p.category === filter)`.
- **Conditional rendering:** `{project.image ? <img .../> : <Placeholder />}`.
- **Hover effects:** `transform: translateY(-4px)` and `transition`.

**Check yourself:**
- [ ] Add a fake project to `projects.js` and watch it appear, then remove it.
- [ ] Change the grid's minimum card width and resize the browser.
- [ ] Explain what happens when two items share the same `key`.

### Step 5 — Competitive Programming, Achievements, Contact
**You'll learn:**
- **Static data cards:** the Codeforces and CodeChef cards read fixed values from `src/data/contests.js`, the same data-driven pattern as Step 4.
- **Forms in React:**
  - Controlled inputs (`value` + `onChange`), like `TextField` bound to `@State`
  - `event.preventDefault()` stops the browser's default page reload on submit
- **Sending data with `fetch`:** a POST to Formspree.
  ```js
  const response = await fetch('https://formspree.io/f/<id>', { method: 'POST', body: new FormData(form) });
  ```
  This is almost identical to `URLSession.shared.upload(for:from:)`.
- **Sending, success and error states:** like handling `Result` in Swift.
- **Honeypot fields:** a simple spam-trap trick.

**Check yourself:**
- [ ] Change the Codeforces max rating in `src/data/contests.js` and watch the card update.
- [ ] Open DevTools → **Network**, submit the contact form, and find the POST request to Formspree. Read its response.
- [ ] Submit the contact form and check that the email reaches your inbox.

### Step 6 — Polish: Responsive, Accessibility, Performance, SEO
**You'll learn:**
- **DevTools device mode** (Cmd+Shift+M): test iPhone and iPad sizes.
- **Lighthouse** (DevTools → Lighthouse tab): scores for Performance, Accessibility, Best Practices and SEO. Think of it as Instruments plus an accessibility audit.
- **Semantic HTML:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`. Screen readers and search engines use them.
- **Keyboard navigation:** Tab through the page. Every button must be reachable and visibly focused.
- **Colour contrast:** text must stand out enough from its background (WCAG AA).
- **SEO and social previews:** `<title>`, `<meta name="description">`, Open Graph tags, and the favicon.

**Check yourself:**
- [ ] Run Lighthouse and get every score above 90.
- [ ] Navigate the whole site with only the keyboard.
- [ ] Paste your site link into a LinkedIn post draft (don't publish) and see the preview card.

### Step 7 — Deploy
**You'll learn:**
- **Git workflow:** you already know this from Samsung.
- **GitHub Actions:** CI that builds and deploys automatically on every push to `main`. It's like Xcode Cloud.
- **Static hosting:** what `npm run build` produces in `dist/`, and why GitHub Pages can serve it.

**Check yourself:**
- [ ] Make a small text change, push, and watch the Actions tab deploy it.
- [ ] Open your live site on your iPhone.

---

## Part 3 — Learning With Claude Code (without just copy-pasting)

Ask Claude to **explain**, not only to build. Useful prompts:
- `Explain this file line by line, comparing it to SwiftUI where possible.`
- `Why did you use useEffect here? What would break without the cleanup?`
- `Don't write the code — give me hints so I can implement the project filter myself.`
- `Quiz me with 5 questions about what we built in this step.`
- `What's the SwiftUI equivalent of this React pattern?`

**Good habits:**
- Read every change Claude shows you before you accept it. If you don't understand a line, ask.
- After each step, **change something yourself**, even if it's small.
- Keep a short `NOTES.md` of new things you learn, written in your own words.
- Use **Plan mode** for big steps, so you see the approach before any code is written.

---

## Part 4 — Resources (free)

| Topic | Resource |
|---|---|
| HTML/CSS/JS reference | [MDN Web Docs](https://developer.mozilla.org/) is the "Apple Developer Documentation" of the web |
| React | [react.dev/learn](https://react.dev/learn), the official tutorial; start with "Thinking in React" |
| CSS Flexbox | [Flexbox Froggy](https://flexboxfroggy.com/), a game |
| CSS Grid | [Grid Garden](https://cssgridgarden.com/), a game |
| JavaScript | [javascript.info](https://javascript.info/) |
| react-three-fiber | [docs.pmnd.rs/react-three-fiber](https://docs.pmnd.rs/react-three-fiber) |
| three.js | [threejs.org/manual](https://threejs.org/manual/) |
| framer-motion | [motion.dev](https://motion.dev/) |
| Accessibility | [web.dev/learn/accessibility](https://web.dev/learn/accessibility) |
| Performance | [web.dev/learn/performance](https://web.dev/learn/performance) |

---

## Part 5 — Glossary

- **DOM:** the browser's tree of page elements, like the UIView hierarchy.
- **JSX:** HTML-like syntax inside JavaScript, compiled to function calls.
- **Component:** a reusable function that returns UI.
- **Props:** inputs to a component.
- **State:** data that, when it changes, re-renders the component.
- **Hook:** a function starting with `use…` (`useState`, `useEffect`, `useRef`) that adds features to components.
- **Bundle:** the final optimised JS/CSS files produced by `npm run build`.
- **Responsive design:** one layout that adapts to any screen size.
- **Viewport:** the visible area of the browser window.
- **CORS:** the browser rule about which websites may call which APIs.
- **SEO:** search engine optimisation, which helps Google understand your page.
- **Lighthouse:** Chrome's built-in quality audit tool.
