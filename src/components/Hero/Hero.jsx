import { motion, useReducedMotion } from 'framer-motion'
import { HiLocationMarker } from 'react-icons/hi'
import Section from '../Section/Section'
import SocialLinks from '../SocialLinks/SocialLinks'
import Starfield from './Starfield'
import { useTypewriter } from '../../hooks/useTypewriter'
import { heroTitles, location, name, tagline } from '../../data/profile'
import { resume } from '../../data/links'
import './Hero.css'

// framer-motion "variants": named animation states. The parent staggers its children,
// so each line slides up shortly after the previous one (like a delayed withAnimation per row).
//
// Only position animates, not opacity: the hero is the first thing people see, and the browser
// (and Lighthouse's "Largest Contentful Paint") doesn't count text as shown while it's at opacity 0.
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { y: 16 },
  visible: { y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const typed = useTypewriter(heroTitles)

  return (
    <Section id="hero" className="hero" background={<Starfield />}>
      {/* motion.div is a normal <div> that framer-motion can animate. */}
      <motion.div className="hero__content" variants={container} initial="hidden" animate="visible">
        <motion.p className="hero__greeting" variants={item}>
          Hi, I&apos;m
        </motion.p>

        <motion.h1 className="hero__name" variants={item}>
          {name}
        </motion.h1>

        <motion.p className="hero__title" variants={item}>
          {/* Screen readers get the full list once, instead of hearing every typed letter. */}
          <span className="sr-only">{heroTitles.join(', ')}</span>
          <span aria-hidden="true">
            {reduceMotion ? heroTitles.join(' · ') : typed}
            {!reduceMotion && <span className="hero__cursor" />}
          </span>
        </motion.p>

        <motion.p className="hero__tagline" variants={item}>
          {tagline}
        </motion.p>

        <motion.p className="hero__location" variants={item}>
          <HiLocationMarker aria-hidden="true" /> {location}
        </motion.p>

        <motion.div className="hero__actions" variants={item}>
          <a href="#projects" className="button button--primary">
            View My Work
          </a>
          {/* `download` asks the browser to save the file instead of opening it. */}
          <a href={resume} className="button" download>
            Download CV
          </a>
          <a href="#contact" className="button">
            Contact Me
          </a>
        </motion.div>

        <motion.div variants={item}>
          <SocialLinks only={['github', 'linkedin', 'email']} />
        </motion.div>
      </motion.div>
    </Section>
  )
}
