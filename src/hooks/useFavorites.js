import { useContext } from 'react'
import FavoritesContext from '../context/favoritesContext.js'

export default function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return context
}
