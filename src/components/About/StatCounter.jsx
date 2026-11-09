import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

// Formats 1600 → "1,600" and 3.73 → "3.73" (with the given number of decimals).
function format(number, decimals) {
  return number.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * One stat tile. Props come from the `stats` array in data/profile.js:
 * - number stats ({ value, prefix, suffix, decimals }) count up from 0
 * - text stats ({ text }) are shown as-is
 */
export default function StatCounter({ value, text, prefix = '', suffix = '', decimals = 0, label }) {
  const ref = useRef(null)
  // useInView flips to true the first time the tile scrolls on screen. `once` keeps it true.
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!isInView || value === undefined || reduceMotion) return
    // animate() tweens a number from 0 to `value`, calling onUpdate on every frame.
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => setCurrent(latest),
    })
    return () => controls.stop() // cleanup: stop the tween if the tile goes away mid-count
  }, [isInView, value, reduceMotion])

  const finalText = text ?? `${prefix}${format(value, decimals)}${suffix}`
  const shownNumber = reduceMotion ? value : current
  const displayText = text ?? `${prefix}${format(shownNumber, decimals)}${suffix}`

  return (
    <div ref={ref} className="stat">
      {/* Screen readers hear the final value once; the counting digits are hidden from them. */}
      <p className="stat__value">
        <span className="sr-only">{finalText}</span>
        <span aria-hidden="true">{displayText}</span>
      </p>
      <p className="stat__label">{label}</p>
    </div>
  )
}
