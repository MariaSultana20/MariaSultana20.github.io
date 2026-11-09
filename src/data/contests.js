// Competitive programming content (PLAN.md §3.7).
import { contests as standings, profiles } from './links'

// Static values, no live API call. Update these by hand when the rating changes.
export const codeforces = {
  handle: 'Maria_Sultana',
  maxRank: 'Specialist',
  maxRankColor: '#03a89e', // Codeforces' own colour for Specialist (cyan)
  maxRating: 1441,
  url: profiles.codeforces,
}

export const codechef = {
  handle: 'maria_sultana',
  stars: '3★',
  maxRating: 1663,
  url: profiles.codechef,
}

export const problemsSolved = {
  count: '1,600+',
  judges: 'Codeforces, CodeChef, LeetCode and other judges',
}

export const contestResults = [
  {
    id: 'ngpc-2022',
    place: '6th / 104 teams',
    contest: "National Girls' Programming Contest 2022",
    date: 'Feb 2023',
    team: 'Team MIST Object Grind',
    standings: standings.ngpc2022,
  },
  {
    id: 'luna-2023',
    place: '7th / 140+',
    contest: "Luna Shamsuddoha All Girls' Programming Contest 2023",
    date: 'May 2023',
    standings: standings.lunaShamsuddoha2023,
  },
  {
    id: 'icpc-dhaka-2024',
    place: '33rd / 309 teams',
    contest: 'ICPC Asia Dhaka Regional 2024',
    date: 'Dec 2024',
    team: 'Team MIST FrostByte 2.0',
    standings: standings.icpcDhaka2024,
  },
  {
    id: 'buet-iupc-2024',
    place: '56th / 114 teams',
    contest: 'BUET Inter-University Programming Contest 2024',
    date: 'Nov 2024',
    team: 'Team MIST FrostByte 2.0',
    standings: standings.buetIupc2024,
  },
]
