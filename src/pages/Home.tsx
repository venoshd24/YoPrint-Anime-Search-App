import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';
import { searchAnime } from '../utils/api';
import { debounce } from '../utils/debounce';

/**
 * Home
 * Renders the search input, anime result cards, and pagination controls.
 */
const Home: React.FC = () => {
  const [query, setQuery] = useState('');        // Current search query
  const [animes, setAnimes] = useState<any[]>([]); // Anime results list
  const [page, setPage] = useState(1);            // Current pagination page
  const [totalPages, setTotalPages] = useState(1);// Total pages from API

  /**
   * fetchAnimes
   * Fetches anime results based on query and page.
   * Clears results if query is empty.
   */
  const fetchAnimes = useCallback(
    async (q: string, p: number) => {
      if (!q) {
        setAnimes([]);
        return;
      }
      const data = await searchAnime(q, p);
      setAnimes(data.data);
      setTotalPages(data.pagination.last_visible_page);
    },
    []
  );

  // Debounce fetchAnimes by 250ms to avoid rapid API calls
  const debouncedFetch = useCallback(debounce(fetchAnimes, 250), [fetchAnimes]);

  // Trigger API call when query or page changes
  useEffect(() => {
    debouncedFetch(query, page);
  }, [query, page, debouncedFetch]);

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Anime Search
      </Typography>

      {/* Search input field: controlled component */}
      <SearchBar
        value={query}
        onChange={(e) => { setPage(1); setQuery(e.target.value); }}
      />

      {/* Result cards */}
      {animes.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}

      {/* Pagination controls (server-side) */}
      {totalPages > 1 && (
        <Pagination page={page} count={totalPages} onChange={(_, v) => setPage(v)} />
      )}
    </Container>
  );
};

export default Home;