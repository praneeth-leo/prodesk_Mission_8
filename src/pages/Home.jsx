import { useEffect, useReducer, useRef, useState } from 'react'
import { fetchPopularMovies, getImageUrl, hasAuthToken, searchMovies } from '../services/tmdbApi.js'
import SearchBar from '../components/SearchBar.jsx'
import MovieCard from '../components/MovieCard.jsx'
import LoadingSkeleton from '../components/LoadingSkeleton.jsx'
import ErrorState from '../components/ErrorState.jsx'
import useDebounce from '../hooks/useDebounce.js'

const initialMovieState = {
  movies: [],
  totalPages: 1,
  status: 'loading',
  error: '',
}

function movieReducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        movies: action.replace ? [] : state.movies,
        totalPages: action.replace ? 1 : state.totalPages,
        status: 'loading',
        error: '',
      }
    case 'success':
      return {
        ...state,
        movies: action.replace ? action.movies : [...state.movies, ...action.movies],
        totalPages: action.totalPages,
        status: 'success',
        error: '',
      }
    case 'error':
      return {
        ...state,
        status: 'error',
        error: action.error,
      }
    default:
      return state
  }
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [{ movies, totalPages, status, error }, dispatch] = useReducer(movieReducer, initialMovieState)

  const debouncedQuery = useDebounce(query, 500)
  const trimmedQuery = debouncedQuery.trim()
  const sentinelRef = useRef(null)
  const isSearching = Boolean(trimmedQuery)
  const heroMovie = movies[0] || null
  const heroRating = heroMovie && Number.isFinite(heroMovie.vote_average)
    ? heroMovie.vote_average.toFixed(1)
    : 'N/A'

  const handleQueryChange = (nextQuery) => {
    setQuery(nextQuery)
    setPage(1)
  }

  useEffect(() => {
    let ignore = false
    const replace = page === 1

    async function loadMovies() {
      if (!hasAuthToken) {
        dispatch({
          type: 'error',
          error: 'Missing VITE_TMDB_TOKEN environment variable. Add it locally in .env or in Vercel Project Settings, then redeploy.',
        })
        return
      }

      dispatch({ type: 'loading', replace })

      try {
        const response = trimmedQuery
          ? await searchMovies(trimmedQuery, page)
          : await fetchPopularMovies(page)

        if (ignore) return

        dispatch({
          type: 'success',
          movies: response.results || [],
          totalPages: response.total_pages || 1,
          replace,
        })
      } catch (err) {
        if (ignore) return
        console.error(err)
        dispatch({
          type: 'error',
          error: 'Unable to fetch movies. Please check your network and try again.',
        })
      }
    }

    loadMovies()

    return () => {
      ignore = true
    }
  }, [page, trimmedQuery])

  useEffect(() => {
    if (status !== 'success' || page >= totalPages) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((current) => Math.min(current + 1, totalPages))
        }
      },
      { rootMargin: '280px' }
    )

    const node = sentinelRef.current
    if (node) observer.observe(node)
    return () => observer.disconnect()
  }, [page, totalPages, status, trimmedQuery])

  const hasEmptyResults = status === 'success' && movies.length === 0

  return (
    <>
      {status === 'loading' && movies.length === 0 ? (
        <LoadingSkeleton variant="hero" />
      ) : (
        <section
          className="hero"
          style={{
            backgroundImage: heroMovie
              ? `linear-gradient(180deg, rgba(5,5,5,0.85), rgba(3,3,3,0.96)), url(${getImageUrl(
                  heroMovie.backdrop_path || heroMovie.poster_path,
                  'w1280'
                )})`
              : 'linear-gradient(180deg, rgba(5,5,5,0.95), rgba(3,3,3,0.98))',
          }}
        >
          <div className="hero__overlay" />
          <div className="hero__content">
            <p className="eyebrow">{isSearching ? 'Search results' : 'Featured premiere'}</p>
            <h2 className="hero__title">{heroMovie ? heroMovie.title : 'Discover premium cinema'}</h2>
            <p className="hero__tagline">
              {heroMovie
                ? heroMovie.overview
                : 'Browse the best films with elegant visuals, smooth transitions, and a luxurious movie experience.'}
            </p>
            {heroMovie ? (
              <div className="hero__details">
                <span className="hero__badge">{heroMovie.release_date?.slice(0, 4) || 'Year unknown'}</span>
                <span className="hero__badge">Rating {heroRating}</span>
              </div>
            ) : null}
            <div className="stats-grid">
              <article className="stats-card">
                <strong>{movies.length}</strong>
                <p>Loaded titles</p>
              </article>
              <article className="stats-card">
                <strong>{totalPages}</strong>
                <p>Available pages</p>
              </article>
              <article className="stats-card">
                <strong>{isSearching ? 'Search' : 'Popular'}</strong>
                <p>Current mode</p>
              </article>
            </div>
          </div>
        </section>
      )}

      <section className="search-section">
        <SearchBar value={query} onChange={handleQueryChange} />
        <div className="search-summary">
          <p>
            {status === 'success'
              ? `${movies.length.toLocaleString()} movies available`
              : 'Browse premium titles or search for your next favorite movie.'}
          </p>
          {isSearching ? <p className="subtitle">Showing results for "{trimmedQuery}"</p> : null}
        </div>
      </section>

      {status === 'error' ? (
        <ErrorState
          title="Network error"
          message={error}
          actionLabel="Retry browsing"
          actionPath="/"
        />
      ) : hasEmptyResults ? (
        <ErrorState
          title="No results found"
          message={`We couldn't find any movies for "${trimmedQuery}". Try another keyword.`}
          actionLabel="Clear search"
          actionPath="/"
        />
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {status === 'loading' && movies.length > 0 ? (
        <p className="loading-note">Loading more premium movies...</p>
      ) : null}
      <div ref={sentinelRef} />
    </>
  )
}
