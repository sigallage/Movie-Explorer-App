import { useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { Typography, Grid, Box, Skeleton } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCard from './MovieCard';

function TrendingMovies() {
  const { trendingMovies, loading, error, fetchTrendingMovies } = useMovieContext();

  useEffect(() => {
    fetchTrendingMovies();
  }, [fetchTrendingMovies]);

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        mb: 3,
        color: 'var(--text-primary)'
      }}>
        <WhatshotIcon color="error" /> Trending This Week
      </Typography>

      <Grid container spacing={3}>
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Skeleton 
                variant="rectangular" 
                height={300} 
                sx={{ 
                  bgcolor: 'var(--surface-light)',
                  borderRadius: 1
                }} 
              />
              <Skeleton 
                width="80%" 
                sx={{ 
                  bgcolor: 'var(--surface-light)',
                  mt: 1
                }} 
              />
              <Skeleton 
                width="40%" 
                sx={{ 
                  bgcolor: 'var(--surface-light)'
                }} 
              />
            </Grid>
          ))
        ) : (
          trendingMovies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default TrendingMovies;