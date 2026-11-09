import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently on screen.
 *
 * IntersectionObserver is a browser API that tells you when an element enters
 * or leaves the viewport. You don't have to check scroll positions yourself.
 * It's a bit like UIScrollViewDelegate, but per element.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(null)

  // useEffect runs after the component appears on screen, like .onAppear.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      // Shrink the "viewport" to a thin line across the middle of the screen.
      // A section counts as active while it crosses that line.
      { rootMargin: '-50% 0px -50% 0px' },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    // Cleanup runs when the component goes away, like cancelling a Combine subscription.
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
