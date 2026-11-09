import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import ProjectImage from './ProjectImage'
import { reveal } from '../../lib/motion'

/** The wide KeepFresh card that always sits above the filter tabs. */
export default function FeaturedProject({ project }) {
  return (
    <motion.article className="featured-project" {...reveal}>
      <ProjectImage project={project} />

      <div className="featured-project__body">
        <p className="featured-project__badge">Featured · {project.category}</p>
        <h3 className="featured-project__title">{project.title}</h3>
        <p className="project-date">
          <time>{project.date}</time>
        </p>

        <ul className="featured-project__highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <ul className="tag-list" aria-label="Technologies">
          {project.tech.map((name) => (
            <li key={name} className="tag">
              {name}
            </li>
          ))}
        </ul>

        <a className="button button--primary featured-project__button" href={project.github} target="_blank" rel="noopener noreferrer">
          <FaGithub aria-hidden="true" /> View on GitHub
        </a>
      </div>
    </motion.article>
  )
}
