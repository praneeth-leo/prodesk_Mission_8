# Cine-Stream

Cine-Stream is a premium Netflix-inspired React + Vite application built with a luxury dark theme, responsive layouts, glassmorphism, animated movie cards, infinite scroll, and persistent favorites.

## Features

- Popular movies feed from TMDB
- Search with 500ms debounced input
- Infinite scroll loading new pages automatically
- Favorites stored in localStorage
- Premium dark UI with glass panels and gold accents
- Responsive design for mobile, tablet, and desktop
- Elegant skeleton loading and error states

## Setup

1. Copy `.env.example` to `.env`
2. Add your TMDB bearer token to `VITE_TMDB_TOKEN`
3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- The app uses `react-router-dom` for client routing.
- Movie data is fetched from TMDB using Axios and the `VITE_TMDB_TOKEN` environment variable.
- Favorites are persisted to `localStorage` for a seamless premium experience.
