// Shared framer-motion presets, so every section reveals itself the same way.

// Scroll-reveal: fade up the first time an element enters the viewport.
// whileInView ≈ an .onAppear that triggers an animation; viewport.once runs it only once.
// Use it by spreading onto a motion element: <motion.div {...reveal}>
export const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

// Same as `reveal`, but starts `delay` seconds later (for staggering items in a list).
export const revealWithDelay = (delay) => ({
  ...reveal,
  transition: { ...reveal.transition, delay },
})
