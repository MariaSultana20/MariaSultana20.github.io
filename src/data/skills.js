// Skills for the 3D sphere and the grouped list (PLAN.md §3.5).
// To add a skill, add one line below. The Fibonacci layout re-spaces the sphere automatically.

export const categories = [
  { id: 'ios', label: 'Mobile (iOS)', color: '#f05138' }, // Swift orange
  { id: 'cross', label: 'Cross-platform', color: '#54c5f8' }, // sky blue
  { id: 'languages', label: 'Languages', color: '#64ffda' }, // teal
  { id: 'web', label: 'Web & DB', color: '#a78bfa' }, // violet
  { id: 'practices', label: 'Practices & Tools', color: '#9ae66e' }, // green
]

// `core: true` skills are the ~20 shown on the sphere below 768px; desktop shows them all.
export const skills = [
  // Mobile (iOS)
  { name: 'Swift', category: 'ios', core: true },
  { name: 'SwiftUI', category: 'ios', core: true },
  { name: 'UIKit', category: 'ios', core: true },
  { name: 'WidgetKit', category: 'ios', core: true },
  { name: 'Live Activities', category: 'ios', core: true },
  { name: 'Combine', category: 'ios', core: true },
  { name: 'ReactiveSwift', category: 'ios', core: true },
  { name: 'AVFoundation', category: 'ios', core: false },
  { name: 'SwiftData', category: 'ios', core: false },

  // Cross-platform
  { name: 'Flutter', category: 'cross', core: true },
  { name: 'Dart', category: 'cross', core: true },
  { name: 'Riverpod', category: 'cross', core: false },

  // Languages
  { name: 'C++', category: 'languages', core: true },
  { name: 'C', category: 'languages', core: false },
  { name: 'Kotlin', category: 'languages', core: true },
  { name: 'Java', category: 'languages', core: false },
  { name: 'Python', category: 'languages', core: true },
  { name: 'JavaScript', category: 'languages', core: true },
  { name: 'SQL', category: 'languages', core: false },
  { name: 'Bash', category: 'languages', core: false },

  // Web & DB
  { name: 'React', category: 'web', core: true },
  { name: 'Node.js', category: 'web', core: true },
  { name: 'Express', category: 'web', core: false },
  { name: 'Flask', category: 'web', core: false },
  { name: 'MongoDB', category: 'web', core: true },
  { name: 'Oracle SQL', category: 'web', core: false },
  { name: 'Firebase', category: 'web', core: true },
  { name: 'Supabase', category: 'web', core: false },

  // Practices & Tools
  { name: 'Git', category: 'practices', core: true },
  { name: 'MVVM-C', category: 'practices', core: true },
  { name: 'Redux', category: 'practices', core: false },
  { name: 'TDD', category: 'practices', core: true },
  { name: 'UML', category: 'practices', core: false },
  { name: 'OOP', category: 'practices', core: false },
  { name: 'Agile', category: 'practices', core: false },
  { name: 'Jira', category: 'practices', core: false },
  { name: 'AI Agent', category: 'practices', core: true },
]

// Quick lookup: category id → colour, e.g. categoryColor.ios === '#f05138'
export const categoryColor = Object.fromEntries(categories.map((c) => [c.id, c.color]))
