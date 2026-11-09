import { FaGithub } from 'react-icons/fa'
import ProjectImage from './ProjectImage'

/** One card in the projects grid. */
export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <ProjectImage project={project} />

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-date">
          <time>{project.date}</time>
        </p>
        <p className="project-card__description">{project.description}</p>

        <ul className="tag-list" aria-label="Technologies">
          {project.tech.map((name) => (
            <li key={name} className="tag">
              {name}
            </li>
          ))}
        </ul>

        {/* aria-label names the project, so screen readers don't hear five identical "GitHub" links. */}
        <a
          className="project-card__link"
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
        >
          <FaGithub aria-hidden="true" /> GitHub
        </a>
      </div>
    </article>
  )
}
