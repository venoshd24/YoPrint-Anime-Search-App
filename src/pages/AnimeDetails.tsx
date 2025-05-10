import React, { useState, useEffect } from 'react';
// useParams to grab the MAL ID from the URL, useNavigate for the “Back” button
import { useParams, useNavigate } from 'react-router-dom';
// MUI components for layout & styling
import {
  Container,
  Typography,
  CardMedia,
  Button,
} from '@mui/material';
// Your API helper for fetching full anime details
import { getAnimeDetails } from '../utils/api';

/**
 * AnimeDetails
 *
 * Fetches and displays the full details for one anime,
 * based on the `id` URL parameter (MAL ID).
 */
const AnimeDetails: React.FC = () => {
  // Pull `id` from /anime/:id
  const { id } = useParams<{ id: string }>();
  // For programmatic back navigation
  const navigate = useNavigate();

  // Local state to hold the fetched anime data
  const [anime, setAnime] = useState<any>(null);
  // Loading state if you wanted to show a spinner (optional)
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    // Kick off the fetch
    getAnimeDetails(id)
      .then((res) => {
        setAnime(res.data);  // store the API’s `data` object
      })
      .catch((err) => {
        console.error('Failed to fetch anime details:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // While data is loading, you can show a placeholder
  if (loading) {
    return <Typography>Loading details…</Typography>;
  }

  // If no anime was found (e.g. invalid ID), show a friendly message
  if (!anime) {
    return <Typography>Anime not found.</Typography>;
  }

  return (
    <Container className="details-container">
      {/* Two-column layout: poster on left, synopsis on right */}
      <div className="details-grid">
        {/* Poster image */}
        <div className="details-img">
          <CardMedia
            component="img"
            image={anime.images.jpg.large_image_url}
            alt={anime.title}
          />
        </div>

        {/* Synopsis block */}
        <div className="details-content">
          <Typography variant="h2" gutterBottom>
            Synopsis
          </Typography>
          <Typography variant="body1">{anime.synopsis}</Typography>
        </div>
      </div>

      {/* Back button to return to previous page */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        ← Back
      </Button>

      {/* Stats row: score, rank, popularity, members */}
      <div className="stats-container">
        {/* Score card */}
        <div className="stat-card">
          <div className="value">{anime.score?.toFixed(2)}</div>
          <div className="label">
          <div className="label">Score</div>
          </div>
        </div>
        {/* Rank card */}
        <div className="stat-card">
          <div className="value">#{anime.rank}</div>
          <div className="label">Ranked</div>
        </div>
        {/* Popularity card */}
        <div className="stat-card">
          <div className="value">#{anime.popularity}</div>
          <div className="label">Popularity</div>
        </div>
      </div>
    </Container>
  );
};

export default AnimeDetails;
