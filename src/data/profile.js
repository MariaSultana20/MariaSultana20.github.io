// Text content for the Hero and About sections (from PLAN.md §3.2 and §3.3).
// Edit the words here; the components only handle layout and behaviour.

export const name = 'Maria Sultana'

// The typing animation in the Hero cycles through these.
export const heroTitles = ['Software Engineer', 'Tech Enthusiast', 'iOS Specialist']

export const tagline =
  'I build polished iOS apps at Samsung and solve algorithmic problems for fun.'

export const location = 'Dhaka, Bangladesh'

export const summary =
  'Software engineer with 1+ year of production iOS experience building Samsung SmartThings features. ' +
  'Delivers maintainable Swift applications using UIKit, SwiftUI, TDD, and modern concurrency; ' +
  'brings strong algorithms foundations from 1,600+ solved problems and ICPC competition.'

// Files in public/ are served from the site root, so public/images/profile.jpg → /images/profile.jpg
export const photo = {
  src: '/images/profile.jpg',
  alt: 'Maria Sultana',
  width: 722,
  height: 1280,
}

// About-section stat counters.
// `value` is the number that counts up; `prefix`/`suffix` are shown around it unchanged.
// A stat with `text` instead of `value` is shown as-is, with no counting.
export const stats = [
  { id: 'users', text: 'Millions', label: 'of SmartThings users reached' },
  { id: 'problems', value: 1600, suffix: '+', label: 'problems solved' },
  { id: 'icpc', value: 33, suffix: 'rd / 309', label: 'at ICPC Asia Dhaka Regional 2024' },
  { id: 'cgpa', value: 3.73, decimals: 2, suffix: ' / 4.00', label: 'CGPA' },
]
