import { NavLink } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites.js'

export default function Navbar() {
  const { favorites } = useFavorites()

  return (
    <header className="navbar glass-panel">
      <div className="navbar__brand">
        <div className="navbar__logo">C</div>
        <div>
          <p className="navbar__eyebrow">Cine-Stream</p>
          <h1 className="navbar__title">Luxury Cinema</h1>
        </div>
      </div>

      <nav className="navbar__nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Favorites
          <span className="nav-badge">{favorites.length}</span>
        </NavLink>
      </nav>
    </header>
  )
}
