import { motion } from 'framer-motion'
import { SiCodechef, SiCodeforces } from 'react-icons/si'
import { HiExternalLink } from 'react-icons/hi'
import { FaTrophy } from 'react-icons/fa'
import Section from '../Section/Section'
import { codechef, codeforces, contestResults, problemsSolved } from '../../data/contests'
import { reveal, revealWithDelay } from '../../lib/motion'
import './CompetitiveProgramming.css'

export default function CompetitiveProgramming() {
  return (
    <Section id="competitive-programming" title="Competitive Programming">
      <motion.div className="cp-cards" {...reveal}>
        <article className="cp-card">
          <header className="cp-card__header">
            <SiCodeforces className="cp-card__icon" aria-hidden="true" />
            <h3>Codeforces</h3>
          </header>
          {/* <dl> is a "description list": term (dt) + value (dd) pairs. */}
          <dl className="cp-card__stats">
            <div>
              <dt>Max rank</dt>
              <dd>
                {/* An inline style sets one CSS value from data, like .foregroundColor(rankColor). */}
                <strong style={{ color: codeforces.maxRankColor }}>{codeforces.maxRank}</strong>
              </dd>
            </div>
            <div>
              <dt>Max rating</dt>
              <dd>
                <strong>{codeforces.maxRating}</strong>
              </dd>
            </div>
          </dl>
          <a className="cp-card__link" href={codeforces.url} target="_blank" rel="noopener noreferrer">
            @{codeforces.handle} <HiExternalLink aria-hidden="true" />
          </a>
        </article>

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
              <dt>Max rating</dt>
              <dd>
                <strong>{codechef.maxRating}</strong>
              </dd>
            </div>
          </dl>
          <a className="cp-card__link" href={codechef.url} target="_blank" rel="noopener noreferrer">
            @{codechef.handle} <HiExternalLink aria-hidden="true" />
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
