import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// One star per this many square pixels, so big screens get more stars.
const AREA_PER_STAR = 6000

/**
 * A subtle, slowly drifting starfield drawn on a 2D <canvas>.
 * <canvas> is a bitmap you draw on with code, like overriding draw(_:) in a UIView.
 */
export default function Starfield() {
  // useRef gives direct access to the real <canvas> element (like an @IBOutlet).
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let stars = []
    let frameId = null
    let isVisible = true

    // Size the bitmap to the element, times devicePixelRatio for sharp Retina rendering
    // (the same idea as UIScreen.main.scale).
    function resize() {
      const { width, height } = canvas.getBoundingClientRect()
      const scale = window.devicePixelRatio || 1
      canvas.width = width * scale
      canvas.height = height * scale
      ctx.setTransform(scale, 0, 0, scale, 0, 0)

      const count = Math.round((width * height) / AREA_PER_STAR)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.15 + 0.03, // pixels per frame
        phase: Math.random() * Math.PI * 2, // offsets the twinkle so stars don't pulse together
      }))
      draw(0)
    }

    function draw(time) {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time / 900 + star.phase)
        ctx.globalAlpha = 0.25 + 0.55 * twinkle
        ctx.fillStyle = star.radius > 1.2 ? '#64ffda' : '#ccd6f6' // a few teal stars
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // requestAnimationFrame calls `tick` before the next screen refresh (like CADisplayLink).
    function tick(time) {
      const { height } = canvas.getBoundingClientRect()
      for (const star of stars) {
        star.y -= star.speed
        if (star.y < 0) star.y = height // wrap around to the bottom
      }
      draw(time)
      frameId = requestAnimationFrame(tick)
    }

    function start() {
      if (!reduceMotion && isVisible && frameId === null) frameId = requestAnimationFrame(tick)
    }

    function stop() {
      if (frameId !== null) cancelAnimationFrame(frameId)
      frameId = null
    }

    // Redraw when the element changes size (window resize, phone rotation).
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    // Pause the animation while the hero is scrolled off screen, to save battery.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) start()
      else stop()
    })
    visibilityObserver.observe(canvas)

    start()

    // Cleanup when the component is removed: stop the loop and the observers.
    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
    }
  }, [reduceMotion]) // With Reduce Motion on, stars are drawn once and stay still.

  // aria-hidden: purely decorative, so screen readers skip it.
  return <canvas ref={canvasRef} className="hero__stars" aria-hidden="true" />
}
