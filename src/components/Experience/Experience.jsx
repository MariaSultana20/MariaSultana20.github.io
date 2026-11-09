import { motion } from 'framer-motion'
import { HiExternalLink } from 'react-icons/hi'
import Section from '../Section/Section'
import { experience } from '../../data/experience'
import { revealWithDelay } from '../../lib/motion'
import './Experience.css'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      {/* <ol> = ordered list: the order (newest first) carries meaning. */}
      <ol className="timeline">
        {experience.map((job, index) => (
          // Each entry fades up a little after the one above it.
          <motion.li key={job.id} className="timeline__item" {...revealWithDelay(index * 0.08)}>
            {/* The dot on the line. Decorative, so hidden from screen readers. */}
            <span className="timeline__dot" aria-hidden="true" />

            <article className="timeline__card">
              <header>
                <h3 className="timeline__role">{job.role}</h3>
                <p className="timeline__org">{job.organization}</p>
                <p className="timeline__meta">
                  {/* <time> marks the text as a date for browsers and search engines. */}
                  <time>{job.period}</time>
                  {job.location && <span> · {job.location}</span>}
                </p>
              </header>

              <ul className="timeline__bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              {/* `&&` renders the right side only if the left side is truthy, like `if let`. */}
              {job.tech && (
                <ul className="tag-list" aria-label="Technologies">
                  {job.tech.map((name) => (
                    <li key={name} className="tag">
                      {name}
                    </li>
                  ))}
                </ul>
              )}

              {job.link && (
                <a className="timeline__link" href={job.link.href} target="_blank" rel="noopener noreferrer">
                  {job.link.label} <HiExternalLink aria-hidden="true" />
                </a>
              )}
            </article>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
