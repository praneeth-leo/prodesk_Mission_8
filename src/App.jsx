import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'
import './styles/global.css'
import './styles/layout.css'

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main className="page-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App
