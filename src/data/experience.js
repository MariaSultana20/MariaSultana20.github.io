// Experience timeline entries (PLAN.md §3.4), newest first.
import { work } from './links'

export const experience = [
  {
    id: 'samsung',
    role: 'iOS Software Engineer, SmartThings iOS',
    organization: 'Samsung R&D Institute Bangladesh (SRBD)',
    period: 'Aug 2025 – Present',
    location: 'Dhaka',
    link: { label: 'SmartThings on the App Store', href: work.smartThingsAppStore },
    bullets: [
      'Develop and maintain iOS features for SmartThings, a large-scale IoT app used by millions, in a 50+ member engineering organization.',
      'Built a Widget with WidgetKit and Live Activities for a core SmartThings module.',
      'Implemented Camera Service features for Ring, Arlo, Google Nest, Aqara, Aeotec and Matter-based cameras.',
      'Refactored the Camera module for faster loading and fixed critical production crashes using TDD.',
      "Work with Samsung's Suwon HQ on feature design and technical implementation.",
    ],
    tech: ['Swift', 'UIKit', 'SwiftUI', 'MVVM-C', 'ReactiveSwift', 'Combine', 'Swift Concurrency', 'Redux architecture'],
  },
  {
    id: 'nogor',
    role: 'Industrial Trainee (Software Engineering, QA)',
    organization: 'Nogor Solutions Limited',
    period: 'Feb 2024 – Mar 2024',
    location: 'Gulshan, Dhaka',
    bullets: [
      'Wrote an SRS, ran end-to-end testing, found critical defects and suggested user-flow improvements based on HCI principles.',
    ],
  },
  {
    id: 'mist-vp',
    role: 'Vice President, Committee of Competitive Programming',
    organization: 'MIST Computer Club',
    period: 'Dec 2023 – Jun 2025',
    bullets: ['Led committee operations and coordinated competitive-programming events.'],
  },
  {
    id: 'mist-member',
    role: 'Executive Member',
    organization: 'MIST Computer Club',
    period: 'May 2023 – Dec 2023',
    bullets: ['Mentored junior students in competitive programming.'],
  },
]
