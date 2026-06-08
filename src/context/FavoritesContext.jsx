import { useCallback, useEffect, useMemo, useState } from 'react'
import FavoritesContext from './favoritesContext.js'

const STORAGE_KEY = 'cine_stream_favorites'

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => loadFavorites())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = useCallback((movie) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === movie.id)
      if (exists) {
        return current.filter((item) => item.id !== movie.id)
      }
      return [movie, ...current]
    })
  }, [])

  const isFavorite = useCallback(
    (movieId) => favorites.some((item) => item.id === movieId),
    [favorites]
  )

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites, toggleFavorite, isFavorite]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
