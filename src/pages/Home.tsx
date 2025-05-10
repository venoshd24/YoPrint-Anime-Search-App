import React, { useEffect } from 'react';
import { Container, Typography, Skeleton, Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';
import { searchAnime, getTopAnime } from '../utils/api';

// Redux hooks + actions
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import {
  setQuery,
  setPage,
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from '../features/searchSlice';

/**
 * Home
 * - Shows “top anime” tiles by default (when search bar is empty)
 * - Instant, debounced search when user types
 * - Server-side pagination for both modes
 * - Loading skeletons, error display, and true “no results” messaging
 */
const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, page, results: animes, totalPages, loading, error } =
    useSelector((state: RootState) => state.search);

  useEffect(() => {
    // Kick off loading state
    dispatch(fetchStart());

    // If user has typed something, debounce the “search” API
    if (query.trim() !== '') {
      const timer = setTimeout(async () => {
        try {
          const data = await searchAnime(query, page);
          dispatch(
            fetchSuccess({
              results: data.data,
              totalPages: data.pagination.last_visible_page,
            })
          );
        } catch (err) {
          dispatch(fetchFailure((err as Error).message));
        }
      }, 250);

      return () => clearTimeout(timer);
    }

    // Otherwise (empty query) fetch the top anime immediately
    (async () => {
      try {
        const data = await getTopAnime(page);
        dispatch(
          fetchSuccess({
            results: data.data,
            totalPages: data.pagination.last_visible_page,
          })
        );
      } catch (err) {
        dispatch(fetchFailure((err as Error).message));
      }
    })();
  }, [dispatch, query, page]);

  return (
    <Container className="container" sx={{ pt: 4 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Anime Search
      </Typography>

      {/* Search input */}
      <SearchBar
        value={query}
        onChange={(e) => {
          dispatch(setQuery(e.target.value));
          dispatch(setPage(1)); // reset page on new search
        }}
      />

      {/* Error message */}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/** Loading state: show shimmering skeletons */}
      {loading ? (
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
              <Skeleton variant="rectangular" width="100%" height="50%" />
              <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="80%" />
            </Box>
          ))}
        </Box>
      ) : (
        <>
          {/** If no results AND user has searched, show “no results” */}
          {animes.length === 0 && query.trim() !== '' ? (
            <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
              No anime matched your search.
            </Typography>
          ) : (
            /** Otherwise show the grid of (search or top) results */
            <Box className="grid-container">
              {animes.map((a) => (
                <AnimeCard key={a.mal_id} anime={a} />
              ))}
            </Box>
          )}
        </>
      )}

      {/** Pagination: only if there’s more than one page */}
      {totalPages > 1 && animes.length > 0 && (
        <Pagination
          page={page}
          count={totalPages}
          onChange={(_, v) => dispatch(setPage(v))}
        />
      )}
    </Container>
  );
};

export default Home;
