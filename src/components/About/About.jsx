import { motion } from 'framer-motion'
import Section from '../Section/Section'
import StatCounter from './StatCounter'
import { photo, stats, summary } from '../../data/profile'
import './About.css'

// Scroll-reveal: fade up the first time this enters the viewport.
// whileInView ≈ an .onAppear that triggers an animation; viewport.once runs it only once.
const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="about">
        <motion.div className="about__text" {...reveal}>
          <p className="about__summary">{summary}</p>

          {/* Each stat object becomes a <StatCounter>. {...stat} passes every field as a prop. */}
          <div className="about__stats">
            {stats.map((stat) => (
              <StatCounter key={stat.id} {...stat} />
            ))}
          </div>
        </motion.div>

        <motion.div className="about__photo" {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
          {/* width/height let the browser reserve space before the image loads (no layout jump).
              loading="lazy" waits to download it until it's near the screen. */}
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </Section>
  )
}
