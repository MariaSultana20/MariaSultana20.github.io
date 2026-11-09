import { useSyncExternalStore } from 'react'

/**
 * Returns true while a CSS media query matches, e.g. useMediaQuery('(max-width: 768px)').
 * It's the JavaScript side of a CSS @media rule, like reading horizontalSizeClass
 * from the SwiftUI environment. The component re-renders whenever the answer changes.
 *
 * useSyncExternalStore subscribes React to a value that lives outside React
 * (here, the browser's window size), a bit like observing a NotificationCenter value.
 */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    // subscribe: tell React when the match changes; return an unsubscribe function
    (onChange) => {
      const mediaQueryList = window.matchMedia(query)
      mediaQueryList.addEventListener('change', onChange)
      return () => mediaQueryList.removeEventListener('change', onChange)
    },
    // getSnapshot: read the current value
    () => window.matchMedia(query).matches,
  )
}
