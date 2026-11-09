# Maria Sultana — Portfolio Plan

A personal portfolio site inspired by [mdyasin044/MyPortfolio](https://mdyasin044.github.io/MyPortfolio/). Its centrepiece is an interactive **3D rotating skill sphere**.

**Hero titles:** Software Engineer · Tech Enthusiast · iOS Specialist

---

## 0. Links (from the CV)

**Contact & profiles**
| Name | URL |
|---|---|
| Email | mailto:mariasultanaprofessional@gmail.com |
| LinkedIn | https://www.linkedin.com/in/mariasultana20/ |
| GitHub | https://github.com/MariaSultana20 |
| Codeforces | https://codeforces.com/profile/Maria_Sultana |
| CodeChef | https://www.codechef.com/users/maria_sultana |
| LeetCode | https://leetcode.com/u/Maria_Sultana/ |
| VJudge | https://vjudge.net/user/13118910 |

The phone number (`tel:+8801757672780`) is in the CV but is **not** shown on the site.

**Work**
| Name | URL |
|---|---|
| SmartThings on the App Store | https://apps.apple.com/us/app/smartthings/id1222822904 |

**Project repos**
| Project | URL |
|---|---|
| KeepFresh | https://github.com/MariaSultana20/KeepFresh |
| QuickDeal | https://github.com/Learnathon-By-Geeky-Solutions/flutterfly |
| Smart Cafeteria App | https://github.com/MdSadiqulAlam/smart_cafeteria |
| BongoJourney | https://github.com/jawads12/BongoJourney.AI |
| Smart Printing System | https://github.com/Naiem890/Smart-Printing-Shop |

**Contest standings & awards**
| Item | URL |
|---|---|
| National Girls' Programming Contest 2022 | https://toph.co/c/national-girls-programming-contest-2022/standings |
| Luna Shamsuddoha All Girls' Programming Contest 2023 | https://toph.co/c/luna-shamsuddoha-girls-in-ict-day-celebration-2023/standings |
| ICPC Asia Dhaka Regional 2024 | https://icpc.global/regionals/finder/Dhaka-2025/standings (confirmed correct) |
| BUET Inter-University Programming Contest 2024 | https://toph.co/c/inter-university-buet-cse-fest-2024/standings |
| MIST Dean's Award 2022 | https://drive.google.com/file/d/19-vv-w6y964bHpt4c3D1TkFoqPIJGpVF/view?usp=drive_link |

Store all of these in `src/data/links.js` so every component reads them from one place.

---

## 1. Tech Stack

| Part | Choice | Notes |
|---|---|---|
| Framework | **React 19** + Vite | The current `npm create vite` template installs it |
| 3D sphere | `three`, `@react-three/fiber` **v9**, `@react-three/drei` **v10** | r3f v9 needs React 19 |
| Animations | `framer-motion` | Sections fade and slide in on scroll |
| Icons | `react-icons` | Social and tech icons |
| Contact form | **Formspree** | No backend and no API keys in the client code. The form POSTs to a Formspree endpoint ID. |
| Hosting | GitHub Pages at **`https://mariasultana20.github.io`** | The repo must be named `MariaSultana20.github.io`. Deployed by a GitHub Actions workflow, with Vite `base: '/'`. |

Install command:

```bash
npm install three @react-three/fiber @react-three/drei framer-motion react-icons
```

---

## 2. Visual Style

- **Theme:** dark
  - Background `#050c14`
  - Surface/cards `#0b1622`
  - Main text `#ccd6f6`
  - Secondary text `#8892b0`
- **Accent:** teal `#64ffda`. Use it for links, buttons, highlights and active nav items. Hover state: `#4fd1b5`.
- **Fonts:** Inter for body and headings, JetBrains Mono for small "code-style" labels. Both from Google Fonts.
- **Motion:** gentle scroll-reveal animations. Turn all motion off when the user's system has `prefers-reduced-motion` set.
- **Layout:** works on phones. The fixed navbar becomes a hamburger menu below 768px.
- **Branding & SEO:**
  - Page `<title>`: **"Maria Sultana — iOS Engineer"**
  - Meta description taken from the About summary
  - An **"MS" favicon**: teal letters on a dark navy rounded square, as SVG plus a PNG fallback
  - Open Graph/Twitter card image (1200×630) with your name, title and teal accent

---

## 3. Sections (in order)

### 3.1 Navbar
- A fixed bar at the top: a "MS" logo on the left and links on the right (About, Experience, Skills, Projects, Achievements, Contact).
- Links smooth-scroll to each section and highlight the section currently on screen.
- A **Resume** button that opens `/Maria-Sultana-CV.pdf`.

### 3.2 Hero
- Greeting: "Hi, I'm **Maria Sultana**"
- Typing animation that cycles through:
  - **Software Engineer**
  - **Tech Enthusiast**
  - **iOS Specialist**
- Tagline: "I build polished iOS apps at Samsung and solve algorithmic problems for fun."
- Buttons: **View My Work**, **Download CV**, **Contact Me**
- Social icons: GitHub, LinkedIn, Email
- Background: a subtle starfield or particle field (r3f or canvas)
- Location note: Dhaka, Bangladesh

### 3.3 About
- Summary:
  > Software engineer with 1+ year of production iOS experience building Samsung SmartThings features. Delivers maintainable Swift applications using UIKit, SwiftUI, TDD, and modern concurrency; brings strong algorithms foundations from 1,600+ solved problems and ICPC competition.
- Animated stat counters:
  - **Millions** of SmartThings users reached
  - **1,600+** problems solved
  - **33rd / 309** at ICPC Asia Dhaka Regional 2024
  - **3.73 / 4.00** CGPA
- Profile photo from `public/images/`. Use the file that's already there. Show it as a rounded image with a teal border/glow and a subtle hover lift. Its alt text is "Maria Sultana".

### 3.4 Experience (vertical timeline)

**Samsung R&D Institute Bangladesh (SRBD) — iOS Software Engineer, SmartThings iOS**
*Aug 2025 – Present · Dhaka* · [App Store link]
- Develop and maintain iOS features for SmartThings, a large-scale IoT app used by millions, in a 50+ member engineering organization.
- Built a Widget with WidgetKit and Live Activities for a core SmartThings module.
- Implemented Camera Service features for Ring, Arlo, Google Nest, Aqara, Aeotec and Matter-based cameras.
- Refactored the Camera module for faster loading and fixed critical production crashes using TDD.
- Work with Samsung's Suwon HQ on feature design and technical implementation.
- Tech: Swift, UIKit, SwiftUI, MVVM-C, ReactiveSwift, Combine, Swift Concurrency, Redux architecture

**Nogor Solutions Limited — Industrial Trainee (Software Engineering, QA)**
*Feb 2024 – Mar 2024 · Gulshan, Dhaka*
- Wrote an SRS, ran end-to-end testing, found critical defects and suggested user-flow improvements based on HCI principles.

**MIST Computer Club — Vice President, Committee of Competitive Programming**
*Dec 2023 – Jun 2025*
- Led committee operations and coordinated competitive-programming events.

**MIST Computer Club — Executive Member**
*May 2023 – Dec 2023*
- Mentored junior students in competitive programming.

### 3.5 Skills — Rotating Skill Sphere ⭐

**Layout:** the sphere on one side, a grouped skill list on the other. On mobile they stack.

**Skills by category, with colours:**

| Category | Colour | Skills |
|---|---|---|
| Mobile (iOS) | Swift orange `#f05138` | Swift, SwiftUI, UIKit, WidgetKit, Live Activities, Combine, ReactiveSwift, AVFoundation, SwiftData |
| Cross-platform | Sky blue `#54c5f8` | Flutter, Dart, Riverpod |
| Languages | Teal `#64ffda` | C++, C, Kotlin, Java, Python, JavaScript, SQL, Bash |
| Web & DB | Violet `#a78bfa` | React, Node.js, Express, Flask, MongoDB, Oracle SQL, Firebase, Supabase |
| Practices & Tools | Green `#9ae66e` | Git, MVVM-C, Redux, TDD, UML, OOP, Agile, Jira |

**Implementation (`src/components/Skills/SkillSphere.jsx`):**
- `<Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 75 }}>` with `<fog attach="fog" args={['#050c14', 0, 70]} />`
- Labels are drei `<Text>` elements.
- **Fibonacci sphere** layout, so the points are spread evenly for any number of skills:
  ```js
  const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  pos.setFromSphericalCoords(radius, phi, theta);
  ```
- Each label faces the camera every frame (`quaternion.copy(camera.quaternion)`).
- **Interaction:**
  - Auto-rotates at about 0.3 rad/s.
  - Drag to rotate, with momentum or inertia.
  - Auto-rotation resumes after the drag ends.
  - Hovering a label makes it grow (scale ×1.3), lerps it toward white or a bright colour, and sets `cursor: pointer`.
  - Clicking a legend chip highlights that category and dims the others to 25% opacity.
- **Responsive:**
  - Smaller radius and font size on mobile.
  - **Below 768px, show only about 20 core skills.** Each skill in `skills.js` has a `core: true/false` flag. Core skills: Swift, SwiftUI, UIKit, WidgetKit, Live Activities, Combine, ReactiveSwift, Flutter, Dart, C++, Kotlin, Python, JavaScript, React, Node.js, Firebase, MongoDB, Git, MVVM-C, TDD.
  - Desktop shows the full set.
- **Performance (lazy loading):**
  - Load the sphere with `React.lazy(() => import('./SkillSphere'))` inside `<Suspense>`, and mount it only when the Skills section scrolls into view (IntersectionObserver).
  - Until then, show a lightweight placeholder: a faint teal ring.
  - This keeps three.js (~600 KB) out of the first page load.
- **Accessibility:**
  - With `prefers-reduced-motion`, the sphere does not auto-rotate.
  - A visually hidden `<ul>` lists every skill for screen readers.
- Skill data lives in `src/data/skills.js`.

### 3.6 Projects

**⭐ Featured project: KeepFresh.** A large card at the top of the section:
- A wide layout with a screenshot or placeholder on one side and details on the other
- A "Featured · iOS" badge
- 3–4 highlight bullets: colour-coded inventory, category search and filters, scheduled local reminders, MVVM-C with protocol-based services
- Tech tags and a GitHub button

**Other projects:** QuickDeal, Smart Cafeteria, BongoJourney and Smart Printing, in a grid below the featured card. Each card has a screenshot, title, date, one-line description, tech tags and a GitHub link. Filter tabs: **All / iOS / Flutter / Web**. The featured card always stays visible above the tabs.

| Project | Category | Date | Tech | Description |
|---|---|---|---|---|
| **KeepFresh — iOS Expiry Tracker** | iOS | Jul 2026 – Present | Swift, UIKit, SwiftData, Firebase Auth | Tracks product expiry dates with a colour-coded inventory (expired / expiring soon / good), category search and filters, and local push reminders. Programmatic UIKit, MVVM-C, protocol-based services. |
| **QuickDeal — Marketplace Platform** | Flutter | Jan 2025 – Jul 2025 | Flutter, Dart, Firebase, Supabase, Riverpod | Clients request quotes and vendors bid. Role-based access, real-time updates, digital agreements and payment workflows. |
| **Smart Cafeteria App** | Flutter | Mar 2024 – Oct 2024 | Flutter, Firebase | Android food-ordering app for the campus cafeteria that cuts queues at peak hours. |
| **BongoJourney — AI Tour Planner** | Web | Aug 2023 – Dec 2023 | React, Node.js, Express, MongoDB, Flask | Full-stack planner that generates personalised AI-assisted travel plans. |
| **Smart Printing System** | Web | Mar 2023 – Jul 2023 | React, Node.js, Express, Oracle SQL | Find nearby print shops, place orders, track status, pay and leave reviews. |

Project data lives in `src/data/projects.js`.

**Screenshots (to be added later):**
- Each project gets an optional `image` field in `projects.js`.
- Until a screenshot is added, the card shows a **placeholder**: a dark gradient card with a teal tint, a large category icon (Apple / Flutter / Web) and the project name.
- To add one later, drop the file into `public/images/projects/` and set `image: '/images/projects/<file>'`. No component changes are needed.

### 3.7 Competitive Programming
- **Profile cards** (static values in `src/data/contests.js`; no live API calls). Each card's link shows the real handle:
  - **Codeforces:** max rank **Specialist** (in Codeforces' cyan, `#03a89e`), max rating 1441. Link: `@Maria_Sultana`
  - **CodeChef:** 3★, max rating 1663. Link: `@maria_sultana`
  - **1,600+ problems** solved across Codeforces, CodeChef, LeetCode and other judges
- **Contest results** (each with a "Standings" link):
  - 6th / 104 teams, National Girls' Programming Contest 2022 (Feb 2023), Team MIST Object Grind
  - 7th / 140+, Luna Shamsuddoha All Girls' Programming Contest 2023 (May 2023)
  - 33rd / 309 teams, ICPC Asia Dhaka Regional 2024 (Dec 2024), Team MIST FrostByte 2.0
  - 56th / 114 teams, BUET Inter-University Programming Contest 2024 (Nov 2024), Team MIST FrostByte 2.0

### 3.8 Achievements & Education
- **Achievements:**
  - 4th, Independence Day Programming Contest 2023
  - 2nd Runner-Up, MIST Intra-Department Girls' Programming Contest
  - Runner-Up, MIST Solo Blind Contest
  - Top 10, Robo Soccer, Chittagong Science Carnival 2.0 (Oct 2023), Team MIST Black Bird
  - MIST Dean's Award 2022
- **Education:** Military Institute of Science and Technology (MIST)
  - B.Sc. in Computer Science and Engineering, CGPA 3.73 / 4.00
  - Apr 2021 – Jun 2025, Dhaka

### 3.9 Contact & Footer
- Heading: "Let's build something together."
- Contact form (name, email, message) sent through **Formspree**.
  - Create a free form at formspree.io and put its endpoint ID in `src/data/links.js`.
  - Show success and error states.
  - Add a honeypot field to block spam.
- Email: mariasultanaprofessional@gmail.com. The phone number is **not** shown publicly.
- Social icons: GitHub, LinkedIn, Codeforces, CodeChef, LeetCode
- Footer: "Designed & built by Maria Sultana · © 2026"

---

## 4. Folder Structure

```
maria-portfolio/
├── public/
│   ├── Maria-Sultana-CV.pdf
│   └── images/
│       ├── profile.jpg
│       └── projects/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Experience/
│   │   ├── Skills/        (SkillSphere.jsx, Skills.jsx)
│   │   ├── Projects/
│   │   ├── CompetitiveProgramming/
│   │   ├── Achievements/
│   │   └── Contact/
│   ├── data/              (links.js, skills.js, projects.js, experience.js, contests.js)
│   ├── styles/            (theme.css / global.css)
│   ├── App.jsx
│   └── main.jsx
├── PLAN.md
├── LEARNING.md
└── CLAUDE.md
```

---

## 5. Build Order

> **Learning mode:** I'm an iOS engineer who is new to web development. My learning guide is `LEARNING.md`.
>
> **Instructions for Claude, at every step:**
> - Explain new web concepts by comparing them to Swift/SwiftUI/UIKit equivalents.
> - Keep code readable over clever, and add short comments on web-specific patterns.
> - After finishing a step, summarise what was built and which concepts it used.
> - Then point me to the matching "Check yourself" tasks in `LEARNING.md`.

1. **Setup:** Vite + React project, theme variables, fonts, navbar, empty section components, smooth scrolling
2. **Hero & About:** typing animation, stat counters, social links
3. **Skill Sphere ⭐:** Fibonacci layout, colours, drag and auto-rotate, hover, legend filter, accessibility
4. **Experience & Projects:** timeline, project cards, filter tabs
5. **Competitive Programming, Achievements, Contact:** cards, contest list, contact form
6. **Polish:** responsive pass, accessibility (contrast, keyboard navigation, alt text), Lighthouse score above 90, SEO meta tags and Open Graph image
7. **Deploy:** GitHub Actions workflow to GitHub Pages

---

## 6. Still Needed

- [x] Profile photo (in `public/images/`)
- [x] ICPC standings link confirmed
- [ ] Project screenshots: later. Placeholders are shown until they're added.
- [x] Formspree endpoint ID (`xzeelnpq`, in `src/data/links.js`)
- [x] GitHub repo `MariaSultana20.github.io` created; deployed by `.github/workflows/deploy.yml`
- [x] CV without the phone number (`public/Maria-Sultana-CV.pdf`)
