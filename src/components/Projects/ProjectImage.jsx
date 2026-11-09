import { FaApple } from 'react-icons/fa'
import { SiFlutter } from 'react-icons/si'
import { HiGlobeAlt } from 'react-icons/hi'

// Category → placeholder icon.
const CATEGORY_ICONS = {
  iOS: FaApple,
  Flutter: SiFlutter,
  Web: HiGlobeAlt,
}

/**
 * The picture at the top of a project card: the screenshot if the project has one,
 * otherwise a dark teal-tinted placeholder with the category icon and project name.
 * Conditional rendering, like `if let image { Image(image) } else { Placeholder() }`.
 */
export default function ProjectImage({ project }) {
  if (project.image) {
    return (
      <div className="project-image">
        <img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" decoding="async" />
      </div>
    )
  }

  const Icon = CATEGORY_ICONS[project.category] ?? HiGlobeAlt
  // The short name before the dash: "KeepFresh — iOS Expiry Tracker" → "KeepFresh"
  const shortName = project.title.split(' — ')[0]

  return (
    // aria-hidden: the card's heading already names the project, so screen readers skip this.
    <div className="project-image project-image--placeholder" aria-hidden="true">
      <Icon className="project-image__icon" />
      <span className="project-image__name">{shortName}</span>
    </div>
  )
}
