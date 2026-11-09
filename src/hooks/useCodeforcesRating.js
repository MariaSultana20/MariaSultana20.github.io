import { useEffect, useState } from 'react'

const CACHE_KEY_PREFIX = 'codeforces:'

// sessionStorage is like a UserDefaults that's wiped when the tab closes.
// It only stores strings, so objects go through JSON (like Codable to/from Data).
// Reading or writing can throw (e.g. storage disabled), so both are wrapped in try/catch.
function readCache(handle) {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY_PREFIX + handle)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeCache(handle, data) {
  try {
    sessionStorage.setItem(CACHE_KEY_PREFIX + handle, JSON.stringify(data))
  } catch {
    // Not being able to cache is fine; we'd just fetch again next time.
  }
}

/**
 * Live Codeforces rating for `handle`, with a fallback if the request fails.
 *
 * Returns { status, profile }:
 * - status 'loading' → profile is the fallback, shown while we wait
 * - status 'live'    → profile came from the API (or this visit's cache)
 * - status 'offline' → the request failed; profile is the fallback
 * Like an enum with associated values: enum State { case loading, live(Profile), offline }
 */
export function useCodeforcesRating(handle, fallback) {
  // The initializer function runs once, on the first render (like a lazy var).
  // If this visit already fetched the rating, start "live" straight away, with no request.
  const [state, setState] = useState(() => {
    const cached = readCache(handle)
    return cached ? { status: 'live', profile: cached } : { status: 'loading', profile: fallback }
  })
  const alreadyCached = state.status === 'live'

  useEffect(() => {
    if (alreadyCached) return

    // AbortController cancels the request if the component goes away (like task.cancel()).
    const controller = new AbortController()

    async function load() {
      try {
        // fetch + await ≈ try await URLSession.shared.data(from: url)
        const response = await fetch(
          `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`,
          { signal: controller.signal },
        )
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        // .json() ≈ JSONDecoder, except the result is a plain object: no Codable struct needed.
        const body = await response.json()
        if (body.status !== 'OK') throw new Error(body.comment ?? 'Codeforces API error')

        const { rating, rank, maxRating, maxRank } = body.result[0]
        const profile = { rating, rank, maxRating, maxRank }
        writeCache(handle, profile)
        setState({ status: 'live', profile })
      } catch (error) {
        if (error.name === 'AbortError') return // we cancelled it ourselves; not a failure
        setState({ status: 'offline', profile: fallback })
      }
    }

    load()
    return () => controller.abort()
  }, [handle, fallback, alreadyCached])

  return state
}
