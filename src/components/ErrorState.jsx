import { Link } from 'react-router-dom'

export default function ErrorState({ title, message, actionLabel, actionPath }) {
  return (
    <section className="error-state glass-panel">
      <div>
        <p className="eyebrow">{title}</p>
        <h2>{message}</h2>
      </div>
      {actionPath && actionLabel ? (
        <Link className="button button--ghost" to={actionPath}>
          {actionLabel}
        </Link>
      ) : null}
    </section>
  )
}
