import { motion } from 'framer-motion'
import { FaMedal } from 'react-icons/fa'
import { HiAcademicCap, HiExternalLink } from 'react-icons/hi'
import Section from '../Section/Section'
import { achievements, education } from '../../data/achievements'
import { reveal, revealWithDelay } from '../../lib/motion'
import './Achievements.css'

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements & Education">
      <div className="achievements">
        <motion.div {...reveal}>
          <h3 className="achievements__heading">Achievements</h3>
          <ul className="achievements__list">
            {achievements.map((item) => (
              <li key={item.id} className="achievement">
                <FaMedal className="achievement__icon" aria-hidden="true" />
                <div>
                  <p className="achievement__title">{item.title}</p>
                  {item.detail && <p className="achievement__detail">{item.detail}</p>}
                  {item.link && (
                    <a className="achievement__link" href={item.link} target="_blank" rel="noopener noreferrer">
                      View certificate <HiExternalLink aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...revealWithDelay(0.15)}>
          <h3 className="achievements__heading">Education</h3>
          <article className="education-card">
            <HiAcademicCap className="education-card__icon" aria-hidden="true" />
            <h4 className="education-card__school">{education.institution}</h4>
            <p className="education-card__degree">{education.degree}</p>
            <p className="education-card__cgpa">{education.cgpa}</p>
            <p className="education-card__meta">
              <time>{education.period}</time> · {education.location}
            </p>
          </article>
        </motion.div>
      </div>
    </Section>
  )
}
