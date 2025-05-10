import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { Typography } from '@mui/material';

function FavoritesPage() {
  const { favorites } = useMovieContext();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>
      
      {favorites.length === 0 ? (
        <Typography>You haven't added any favorites yet.</Typography>
      ) : (
        <div className="movie-grid">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;