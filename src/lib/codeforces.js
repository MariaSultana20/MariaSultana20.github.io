// Codeforces rank → colour, based on Codeforces' own rank colours.
// A few are lightened (same hue) because the originals (e.g. pupil #008000, expert #0000ff)
// are too dark to read on this site's navy background.
const RANK_COLORS = {
  newbie: '#a0a0a0', // CF: #808080 (grey)
  pupil: '#3cb371', // CF: #008000 (green)
  specialist: '#03a89e', // CF: #03a89e (cyan), unchanged
  expert: '#6b8cff', // CF: #0000ff (blue)
  'candidate master': '#d35cd3', // CF: #aa00aa (violet)
  master: '#ff8c00', // CF: #ff8c00 (orange), unchanged
  'international master': '#ff8c00',
  grandmaster: '#ff5050', // CF: #ff0000 (red)
  'international grandmaster': '#ff5050',
  'legendary grandmaster': '#ff5050',
}

export function rankColor(rank) {
  return RANK_COLORS[rank?.toLowerCase()] ?? 'var(--text)'
}

// "candidate master" → "Candidate Master"
export function formatRank(rank) {
  return rank ? rank.replace(/\b\w/g, (letter) => letter.toUpperCase()) : ''
}
