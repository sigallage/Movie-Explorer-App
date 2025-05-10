import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, Chip, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMovieContext } from '../context/MovieContext';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const { addToFavorites, removeFromFavorites, favorites } = useMovieContext();
  const isFavorite = favorites.some(fav => fav.id === parseInt(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/movie/${id}`);
        setMovie(response.data);
        
        // Find trailer
        const trailer = response.data.videos?.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else if (movie) {
      addToFavorites({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      });
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return <Typography>Movie not found</Typography>;

  return (
    <Box className="movie-details">
      <Box>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : '/placeholder.jpg'
          }
          alt={movie.title}
          className="details-poster"
        />
        <Button
          variant="contained"
          startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          onClick={handleFavoriteClick}
          sx={{ mt: 2 }}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </Box>
      <Box className="details-info">
        <Typography variant="h3" gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {movie.release_date} • {movie.runtime} min
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {movie.genres?.map(genre => (
            <Chip key={genre.id} label={genre.name} color="primary" />
          ))}
        </Box>
        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <Typography paragraph>{movie.overview}</Typography>
        <Typography variant="h6" gutterBottom>
          Rating: {movie.vote_average}/10 ({movie.vote_count} votes)
        </Typography>
        {trailerKey && (
          <>
            <Typography variant="h6" gutterBottom>
              Trailer
            </Typography>
            <Box sx={{ mt: 2, position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0 }}
              ></iframe>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default MovieDetails;