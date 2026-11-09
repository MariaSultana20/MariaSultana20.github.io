import { motion } from 'framer-motion'
import { SiCodechef, SiCodeforces } from 'react-icons/si'
import { HiExternalLink } from 'react-icons/hi'
import { FaTrophy } from 'react-icons/fa'
import Section from '../Section/Section'
import { useCodeforcesRating } from '../../hooks/useCodeforcesRating'
import { formatRank, rankColor } from '../../lib/codeforces'
import { codechef, codeforcesFallback, codeforcesHandle, contestResults, problemsSolved } from '../../data/contests'
import { profiles } from '../../data/links'
import { reveal, revealWithDelay } from '../../lib/motion'
import './CompetitiveProgramming.css'

/** A rank name in its Codeforces colour, e.g. "Specialist" in cyan. */
function Rank({ rank }) {
  return (
    <span className="cp-rank" style={{ color: rankColor(rank) }}>
      {formatRank(rank)}
    </span>
  )
}

function CodeforcesCard() {
  const { status, profile } = useCodeforcesRating(codeforcesHandle, codeforcesFallback)

  return (
    <article className="cp-card">
      <header className="cp-card__header">
        <SiCodeforces className="cp-card__icon" aria-hidden="true" />
        <h3>Codeforces</h3>
        {/* A small status pill: "live" when the data came from the API. */}
        {status === 'live' && <span className="cp-card__live">● live</span>}
      </header>

      {/* aria-live: screen readers announce the rating when it arrives. */}
      <div aria-live="polite">
        {status === 'live' ? (
          <dl className="cp-card__stats">
            <div>
              <dt>Current</dt>
              <dd>
                <strong>{profile.rating}</strong> <Rank rank={profile.rank} />
              </dd>
            </div>
            <div>
              <dt>Max</dt>
              <dd>
                <strong>{profile.maxRating}</strong> <Rank rank={profile.maxRank} />
              </dd>
            </div>
          </dl>
        ) : (
          // Loading or offline: show the static values from data/contests.js.
          <p className="cp-card__fallback">
            <Rank rank={profile.maxRank} />, max rating <strong>{profile.maxRating}</strong>
            <span className="cp-card__note">
              {status === 'loading' ? 'Loading live rating…' : 'Live rating unavailable right now'}
            </span>
          </p>
        )}
      </div>

      <a className="cp-card__link" href={profiles.codeforces} target="_blank" rel="noopener noreferrer">
        @{codeforcesHandle} <HiExternalLink aria-hidden="true" />
      </a>
    </article>
  )
}

export default function CompetitiveProgramming() {
  return (
    <Section id="competitive-programming" title="Competitive Programming">
      <motion.div className="cp-cards" {...reveal}>
        <CodeforcesCard />

        <article className="cp-card">
          <header className="cp-card__header">
            <SiCodechef className="cp-card__icon" aria-hidden="true" />
            <h3>CodeChef</h3>
          </header>
          <dl className="cp-card__stats">
            <div>
              <dt>Stars</dt>
              <dd>
                <strong className="cp-stars">{codechef.stars}</strong>
              </dd>
            </div>
            <div>
              <dt>Max</dt>
              <dd>
                <strong>{codechef.maxRating}</strong>
              </dd>
            </div>
          </dl>
          <a className="cp-card__link" href={codechef.url} target="_blank" rel="noopener noreferrer">
            Profile <HiExternalLink aria-hidden="true" />
          </a>
        </article>

        <article className="cp-card cp-card--highlight">
          <p className="cp-card__big">{problemsSolved.count}</p>
          <h3>problems solved</h3>
          <p className="cp-card__note">across {problemsSolved.judges}</p>
        </article>
      </motion.div>

      <h3 className="cp-subtitle">Contest results</h3>
      <ol className="cp-results">
        {contestResults.map((result, index) => (
          <motion.li key={result.id} className="cp-result" {...revealWithDelay(index * 0.06)}>
            <FaTrophy className="cp-result__icon" aria-hidden="true" />
            <div className="cp-result__body">
              <p className="cp-result__place">{result.place}</p>
              <p className="cp-result__contest">{result.contest}</p>
              <p className="cp-result__meta">
                <time>{result.date}</time>
                {result.team && <> · {result.team}</>}
              </p>
            </div>
            <a
              className="cp-result__link"
              href={result.standings}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Standings for ${result.contest}`}
            >
              Standings <HiExternalLink aria-hidden="true" />
            </a>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
