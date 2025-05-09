import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * AnimeCard
 * Displays an anime's thumbnail, title, and synopsis inside a card.
 */
interface AnimeProps {
  anime: {
    mal_id: number;
    images: { jpg: { image_url: string } };
    title: string;
    synopsis: string;
  };
}

const AnimeCard: React.FC<AnimeProps> = ({ anime }) => (
  <Link to={`/anime/${anime.mal_id}`} style={{ textDecoration: 'none' }}>
    <Card className="animeCard">
      {/* Anime cover image */}
      <CardMedia
        component="img"
        sx={{ width: 120 }}
        image={anime.images.jpg.image_url}
        alt={anime.title}
      />
      <CardContent>
        {/* Anime title */}
        <Typography variant="h6">{anime.title}</Typography>
        {/* Truncated synopsis */}
        <Typography variant="body2" noWrap>
          {anime.synopsis}
        </Typography>
      </CardContent>
    </Card>
  </Link>
);

export default AnimeCard;