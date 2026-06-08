import axios from 'axios'

const token = import.meta.env.VITE_TMDB_TOKEN
export const hasAuthToken = Boolean(token)

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    language: 'en-US',
  },
})

export const fetchPopularMovies = async (page = 1) => {
  const response = await tmdb.get('/movie/popular', { params: { page } })
  return response.data
}

export const searchMovies = async (query, page = 1) => {
  const response = await tmdb.get('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
    },
  })
  return response.data
}

export const getImageUrl = (path, size = 'w500') => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null
}
