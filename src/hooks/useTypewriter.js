import { useEffect, useState } from 'react'

/**
 * Types each word letter by letter, pauses, deletes it, then moves to the next word.
 * Returns the text to show right now.
 *
 * How it works: every change of state schedules ONE timer for the next letter.
 * When the timer fires it updates state, React re-renders, and the effect schedules
 * the next timer. It's like chaining DispatchQueue.main.asyncAfter calls.
 */
export function useTypewriter(words, { typeMs = 90, deleteMs = 45, pauseMs = 1600 } = {}) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    let delay = isDeleting ? deleteMs : typeMs
    let next

    if (!isDeleting && text === word) {
      // Finished typing: wait, then start deleting.
      delay = pauseMs
      next = () => setIsDeleting(true)
    } else if (isDeleting && text === '') {
      // Finished deleting: move on to the next word (wrapping around with %).
      next = () => {
        setIsDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }
    } else {
      // Add or remove one letter.
      next = () => setText(isDeleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }

    const timer = setTimeout(next, delay)
    // Cleanup: cancel the pending timer if the component disappears or state changes first.
    // Without this, timers would keep firing after the Hero is gone (a leak).
    return () => clearTimeout(timer)
  }, [words, wordIndex, text, isDeleting, typeMs, deleteMs, pauseMs])

  return text
}
