import { lazy, Suspense, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import Section from '../Section/Section'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { categories, skills } from '../../data/skills'
import './Skills.css'

// React.lazy: SkillSphere.jsx (and three.js with it, ~600 KB) becomes a separate file
// that is only downloaded the first time <SkillSphere> renders. Like on-demand resources in iOS.
const SkillSphere = lazy(() => import('./SkillSphere'))

// Takes one skill from each category in turn: [ios1, cross1, lang1, …, ios2, cross2, …].
// The Fibonacci layout places skills in order from top to bottom, so without this
// each category would form its own coloured band on the sphere.
function interleaveByCategory(list) {
  const queues = categories.map((category) => list.filter((skill) => skill.category === category.id))
  const mixed = []
  while (queues.some((queue) => queue.length > 0)) {
    for (const queue of queues) {
      if (queue.length > 0) mixed.push(queue.shift())
    }
  }
  return mixed
}

// Shown while the sphere's code downloads, and if WebGL isn't available.
function SpherePlaceholder() {
  return <div className="sphere-placeholder" aria-hidden="true" />
}

export default function Skills() {
  // null = no highlight; otherwise a category id like 'ios'.
  const [activeCategory, setActiveCategory] = useState(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const reduceMotion = useReducedMotion()

  // useInView is a small wrapper around IntersectionObserver. With `once`, it stays true
  // after the first time. The 200px margin starts the download just before it scrolls in.
  const sphereSlotRef = useRef(null)
  const shouldLoadSphere = useInView(sphereSlotRef, { once: true, margin: '200px' })

  // Phones get the ~20 core skills so the smaller sphere stays readable.
  const sphereSkills = interleaveByCategory(isMobile ? skills.filter((skill) => skill.core) : skills)

  // Clicking the highlighted chip again clears the highlight.
  const toggleCategory = (id) => setActiveCategory((current) => (current === id ? null : id))

  return (
    <Section id="skills" title="Skills">
      <div className="skills">
        <div className="skills__visual">
          {/* Legend chips. aria-pressed tells screen readers it's a toggle button. */}
          <div className="skills__legend" role="group" aria-label="Highlight a skill category">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className="chip"
                aria-pressed={activeCategory === category.id}
                onClick={() => toggleCategory(category.id)}
                // A CSS variable set per element: each chip uses its own category colour.
                style={{ '--chip-color': category.color }}
              >
                <span className="chip__dot" aria-hidden="true" />
                {category.label}
              </button>
            ))}
          </div>

          <div ref={sphereSlotRef} className="skills__sphere-slot">
            {shouldLoadSphere ? (
              // Suspense shows `fallback` until the lazy component's code has arrived.
              <Suspense fallback={<SpherePlaceholder />}>
                <SkillSphere
                  skills={sphereSkills}
                  // Sized so the widest labels stay inside the canvas even when they swing to the front edge.
                  radius={isMobile ? 14 : 16}
                  fontSize={isMobile ? 1.8 : 1.4}
                  activeCategory={activeCategory}
                  autoRotate={!reduceMotion}
                  fallback={<SpherePlaceholder />}
                />
              </Suspense>
            ) : (
              <SpherePlaceholder />
            )}

            {/* The canvas is invisible to screen readers, so list every skill for them here. */}
            <ul className="sr-only">
              {skills.map((skill) => (
                <li key={skill.name}>{skill.name}</li>
              ))}
            </ul>
          </div>

          <p className="skills__hint" aria-hidden="true">
            {isMobile ? 'Drag to spin' : 'Drag to spin · hover a skill'}
          </p>
        </div>

        {/* Grouped list beside the sphere (it stacks below on phones). */}
        <div className="skills__groups">
          {categories.map((category) => {
            const isDimmed = activeCategory !== null && activeCategory !== category.id
            return (
              <div
                key={category.id}
                className={`skill-group ${isDimmed ? 'skill-group--dimmed' : ''}`}
                style={{ '--chip-color': category.color }}
              >
                <h3 className="skill-group__title">{category.label}</h3>
                <ul className="skill-group__list">
                  {skills
                    .filter((skill) => skill.category === category.id)
                    .map((skill) => (
                      <li key={skill.name} className="skill-tag">
                        {skill.name}
                      </li>
                    ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
