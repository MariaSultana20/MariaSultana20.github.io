import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section from '../Section/Section'
import FeaturedProject from './FeaturedProject'
import ProjectCard from './ProjectCard'
import { projectFilters, projects } from '../../data/projects'
import './Projects.css'

const featured = projects.find((project) => project.featured)
const others = projects.filter((project) => !project.featured)

export default function Projects() {
  // Like @State var filter = "All"
  const [filter, setFilter] = useState('All')

  // Recomputed on every render from state: no need to store the filtered list separately.
  const visible = others.filter((project) => filter === 'All' || project.category === filter)

  return (
    <Section id="projects" title="Projects">
      {/* The featured card stays visible whatever filter is selected. */}
      <FeaturedProject project={featured} />

      <div className="project-filters" role="group" aria-label="Filter projects">
        {projectFilters.map((name) => (
          <button
            key={name}
            type="button"
            className="project-filters__button"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {/* aria-live: screen readers announce this text whenever it changes. */}
      <p className="sr-only" aria-live="polite">
        {visible.length > 0
          ? `Showing ${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`
          : `No other ${filter} projects; ${featured.title} is featured above`}
      </p>

      {visible.length > 0 ? (
        <ul className="project-grid">
          {/* AnimatePresence lets removed cards animate out before they disappear.
              `layout` slides the remaining cards into their new grid positions. */}
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.li
                key={project.id} // stable id, so React knows which card is which (like Identifiable)
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <p className="project-grid__empty">
          My {filter} project is featured above. ↑
        </p>
      )}
    </Section>
  )
}
