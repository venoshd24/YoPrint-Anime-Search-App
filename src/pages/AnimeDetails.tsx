import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CardMedia } from '@mui/material';
import { getAnimeDetails } from '../utils/api';

/**
 * AnimeDetails
 * Displays detailed information for a single anime based on URL param.
 */
const AnimeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Get MAL ID from route params
  const [anime, setAnime] = useState<any>(null); // Anime detail state

  // Fetch anime details when component mounts or ID changes
  useEffect(() => {
    if (id) {
      getAnimeDetails(id).then((res) => setAnime(res.data));
    }
  }, [id]);

  if (!anime) return <Typography>Loading...</Typography>;

  return (
    <Container className="container details">
      <Typography variant="h3" gutterBottom>{anime.title}</Typography>
      <CardMedia
        component="img"
        image={anime.images.jpg.large_image_url}
        alt={anime.title}
        sx={{ maxWidth: 600, mb: 2 }}
      />
      <Typography variant="body1">{anime.synopsis}</Typography>
    </Container>
  );
};

export default AnimeDetails;