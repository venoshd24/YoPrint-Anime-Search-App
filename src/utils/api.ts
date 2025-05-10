import axios from 'axios';

const API_BASE = 'https://api.jikan.moe/v4';

/**
 * Search for anime by query & page.
 */
export const searchAnime = async (query: string, page: number) => {
  const response = await axios.get(`${API_BASE}/anime`, {
    params: { q: query, page },
  });
  return response.data;
};

/**
 * Fetch the “top” anime (by popularity/rating) for a given page.
 * Used as the default display when query is empty.
 */
export const getTopAnime = async (page: number) => {
  const response = await axios.get(`${API_BASE}/top/anime`, {
    params: { page },
  });
  return response.data;
};

/**
 * Get full details for a single anime by MAL ID.
 */
export const getAnimeDetails = async (id: string) => {
  const response = await axios.get(`${API_BASE}/anime/${id}/full`);
  return response.data;
};
