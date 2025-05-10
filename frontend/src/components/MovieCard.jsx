import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, IconButton, Tooltip, Chip, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { useMovieContext } from '../context/MovieContext';

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, favorites } = useMovieContext();
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isFavorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'var(--surface)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
          '& .movie-poster': {
            '&::after': {
              opacity: 1
            }
          }
        },
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Poster with gradient overlay */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            className="movie-poster"
            image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
            alt={movie.title}
            sx={{
              height: 300,
              objectFit: 'cover',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }
            }}
          />
          
          {/* Rating badge */}
          <Chip
            icon={<StarIcon sx={{ color: 'var(--secondary)' }} />}
            label={movie.vote_average?.toFixed(1)}
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              fontWeight: 'bold'
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            noWrap
            sx={{ color: 'var(--text-primary)', fontWeight: 'bold' }}
          >
            {movie.title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ color: 'var(--text-secondary)' }}
          >
            {movie.release_date?.substring(0, 4)}
          </Typography>
        </CardContent>

        {/* Favorite button */}
        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: isFavorite ? 'var(--primary)' : 'white',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.9)'
              }
            }}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </Card>
    </Link>
  );
}

export default MovieCard;