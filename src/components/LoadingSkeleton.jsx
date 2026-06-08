export default function LoadingSkeleton({ variant = 'grid' }) {
  if (variant === 'hero') {
    return (
      <section className="hero hero--skeleton">
        <div className="hero__overlay" />
        <div className="hero__content hero__content--skeleton">
          <div className="skeleton skeleton--hero-title" />
          <div className="skeleton skeleton--hero-meta" />
          <div className="skeleton skeleton--hero-button" />
        </div>
      </section>
    )
  }

  return (
    <div className="movie-grid">
      {Array.from({ length: 8 }).map((_, index) => (
        <article className="movie-card movie-card--skeleton" key={index}>
          <div className="movie-card__poster movie-card__poster--skeleton" />
          <div className="movie-card__content">
            <div className="skeleton skeleton--title" />
            <div className="skeleton skeleton--meta" />
          </div>
        </article>
      ))}
    </div>
  )
}
