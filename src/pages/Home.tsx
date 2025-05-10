import React, { useEffect } from 'react'
import { Container, Typography, Skeleton, Box } from '@mui/material'
import SearchBar from '../components/SearchBar'
import AnimeCard from '../components/AnimeCard'
import Pagination from '../components/Pagination'
import { searchAnime } from '../utils/api'

// Redux hooks + actions
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import {
  setQuery,
  setPage,
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from '../features/searchSlice'

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { query, page, results: animes, totalPages, loading, error } =
    useSelector((state: RootState) => state.search)

  // Whenever query or page changes, trigger the search (with 250ms debounce)
  useEffect(() => {
    if (!query) {
      dispatch(fetchSuccess({ results: [], totalPages: 1 }))
      return
    }

    dispatch(fetchStart())
    const timer = setTimeout(async () => {
      try {
        const data = await searchAnime(query, page)
        dispatch(
          fetchSuccess({
            results: data.data,
            totalPages: data.pagination.last_visible_page,
          })
        )
      } catch (err) {
        dispatch(fetchFailure((err as Error).message))
      }
    }, 250)

    return () => clearTimeout(timer)
  }, [dispatch, query, page])

  return (
    <Container className="container" sx={{ pt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Anime Search
      </Typography>

      <SearchBar
        value={query}
        onChange={(e) => {
          dispatch(setQuery(e.target.value))
          dispatch(setPage(1))
        }}
      />

      {/* Error message */}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Results or Loading Skeletons */}
      {loading ? (
        // Show 8 skeleton tiles while loading
        <Box className="grid-container">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Box
              key={idx}
              className="animeCard"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 225,
                height: '100%',
              }}
            >
              {/* Poster placeholder */}
              <Skeleton variant="rectangular" width="100%" height="50%" />
              {/* Title line */}
              <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
              {/* Synopsis lines */}
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="80%" />
            </Box>
          ))}
        </Box>
      ) : (
        // Show real results
        <Box className="grid-container">
          {animes.map((a) => (
            <AnimeCard key={a.mal_id} anime={a} />
          ))}
        </Box>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          count={totalPages}
          onChange={(_, v) => dispatch(setPage(v))}
        />
      )}
    </Container>
  )
}

export default Home
