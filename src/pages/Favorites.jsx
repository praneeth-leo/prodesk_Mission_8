import useFavorites from '../hooks/useFavorites.js'
import ErrorState from '../components/ErrorState.jsx'
import MovieCard from '../components/MovieCard.jsx'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Favorites</p>
          <h2>Saved cinematic selections</h2>
        </div>
        <p>{favorites.length.toLocaleString()} movies saved</p>
      </div>

      {favorites.length === 0 ? (
        <ErrorState
          title="No favorites yet"
          message="Tap the heart icon on any movie card to save it to your favorites list."
          actionLabel="Browse movies"
          actionPath="/"
        />
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}
