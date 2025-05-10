import { useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';
import { Typography, Grid, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Favorites() {
  const { favorites, removeFromFavorites } = useMovieContext();

  // Set document title
  useEffect(() => {
    document.title = 'My Favorites - Movie Explorer';
  }, []);

  const handleRemoveFavorite = (movieId) => {
    removeFromFavorites(movieId);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FavoriteIcon color="error" /> My Favorite Movies
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          You haven't added any movies to your favorites yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard 
                movie={movie} 
                onRemove={() => handleRemoveFavorite(movie.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Favorites;