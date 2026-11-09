import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Experience from './components/Experience/Experience'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import CompetitiveProgramming from './components/CompetitiveProgramming/CompetitiveProgramming'
import Achievements from './components/Achievements/Achievements'
import Contact from './components/Contact/Contact'
import Footer from './components/Contact/Footer'

// The root component, like the root view inside WindowGroup.
// It's a single scrolling page: the sections stack top to bottom, like a VStack in a ScrollView.
export default function App() {
  return (
    // reducedMotion="user": when the system's Reduce Motion is on, framer-motion skips
    // movement (slides, scales) and keeps only fades, for every animation in the app.
    <MotionConfig reducedMotion="user">
      <Navbar />
      {/* <main> is semantic HTML: it tells screen readers where the main content is. */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <CompetitiveProgramming />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
