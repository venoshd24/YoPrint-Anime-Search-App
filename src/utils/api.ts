import axios from 'axios';

const API_BASE = 'https://api.jikan.moe/v4';

/**
 * searchAnime
 * Fetches a page of anime search results from the Jikan API.
 * @param query - User search term
 * @param page  - Page number for server-side pagination
 * @returns Promise resolving to API response containing `data` and `pagination`
 */
export const searchAnime = async (query: string, page: number) => {
  const response = await axios.get(`${API_BASE}/anime`, {
    params: { q: query, page },
  });
  return response.data;
};

/**
 * getAnimeDetails
 * Fetches full details for a single anime by its MyAnimeList ID.
 * @param id - The anime's MAL ID
 * @returns Promise resolving to detailed anime data
 */
export const getAnimeDetails = async (id: string) => {
  const response = await axios.get(`${API_BASE}/anime/${id}/full`);
  return response.data;
};