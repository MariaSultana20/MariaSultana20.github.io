import { motion } from 'framer-motion'
import Section from '../Section/Section'
import StatCounter from './StatCounter'
import { photo, stats, summary } from '../../data/profile'
import { reveal, revealWithDelay } from '../../lib/motion'
import './About.css'

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

        <motion.div className="about__photo" {...revealWithDelay(0.15)}>
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
