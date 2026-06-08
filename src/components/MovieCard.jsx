import { getImageUrl } from '../services/tmdbApi.js'
import useFavorites from '../hooks/useFavorites.js'

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const posterUrl = getImageUrl(movie.poster_path, 'w500')
  const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown'
  const favorite = isFavorite(movie.id)
  const rating = Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : 'N/A'
  const favoriteIcon = favorite ? '\u2665' : '\u2661'

  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        {posterUrl ? (
          <img
            loading="lazy"
            decoding="async"
            src={posterUrl}
            alt={movie.title}
          />
        ) : (
          <div className="poster-placeholder">Poster unavailable</div>
        )}
      </div>
      <div className="movie-card__content">
        <div className="movie-card__heading">
          <div>
            <h3 className="movie-card__title">{movie.title}</h3>
            <p className="movie-card__year">{releaseYear}</p>
          </div>
          <button
            type="button"
            className={`favorite-button ${favorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(movie)}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span>{favoriteIcon}</span>
          </button>
        </div>
        <div className="movie-card__meta">
          <span className="movie-card__rating">{'\u2605'} {rating}</span>
        </div>
      </div>
    </article>
  )
}
