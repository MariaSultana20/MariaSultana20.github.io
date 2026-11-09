// Projects (PLAN.md §3.6).
//
// Adding a screenshot later: drop the file into public/images/projects/ and set
//   image: '/images/projects/<file>'
// on the project. Until then the card shows a placeholder. No component changes needed.
import { projects as repoLinks } from './links'

// Filter tabs, in order. 'All' shows every non-featured project.
export const projectFilters = ['All', 'iOS', 'Flutter', 'Web']

export const projects = [
  {
    id: 'keepfresh',
    featured: true,
    title: 'KeepFresh — iOS Expiry Tracker',
    category: 'iOS',
    date: 'Jul 2026 – Present',
    tech: ['Swift', 'UIKit', 'SwiftData', 'Firebase Auth'],
    description:
      'Tracks product expiry dates with a colour-coded inventory (expired / expiring soon / good), category search and filters, and local push reminders. Programmatic UIKit, MVVM-C, protocol-based services.',
    // Featured card only: 3–4 highlight bullets.
    highlights: [
      'Colour-coded inventory: expired, expiring soon and good',
      'Category search and filters',
      'Scheduled local reminders before items expire',
      'MVVM-C with protocol-based services, built in programmatic UIKit',
    ],
    github: repoLinks.keepFresh,
    image: null,
  },
  {
    id: 'quickdeal',
    title: 'QuickDeal — Marketplace Platform',
    category: 'Flutter',
    date: 'Jan 2025 – Jul 2025',
    tech: ['Flutter', 'Dart', 'Firebase', 'Supabase', 'Riverpod'],
    description:
      'Clients request quotes and vendors bid. Role-based access, real-time updates, digital agreements and payment workflows.',
    github: repoLinks.quickDeal,
    image: null,
  },
  {
    id: 'smart-cafeteria',
    title: 'Smart Cafeteria App',
    category: 'Flutter',
    date: 'Mar 2024 – Oct 2024',
    tech: ['Flutter', 'Firebase'],
    description: 'Android food-ordering app for the campus cafeteria that cuts queues at peak hours.',
    github: repoLinks.smartCafeteria,
    image: null,
  },
  {
    id: 'bongojourney',
    title: 'BongoJourney — AI Tour Planner',
    category: 'Web',
    date: 'Aug 2023 – Dec 2023',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Flask'],
    description: 'Full-stack planner that generates personalised AI-assisted travel plans.',
    github: repoLinks.bongoJourney,
    image: null,
  },
  {
    id: 'smart-printing',
    title: 'Smart Printing System',
    category: 'Web',
    date: 'Mar 2023 – Jul 2023',
    tech: ['React', 'Node.js', 'Express', 'Oracle SQL'],
    description: 'Find nearby print shops, place orders, track status, pay and leave reviews.',
    github: repoLinks.smartPrinting,
    image: null,
  },
]
