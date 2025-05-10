import { useEffect, useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { Box, Typography, Button, Container, Grid, CircularProgress } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { getImageUrl } from '../utils';

function Home() {
  const { 
    trendingMovies, 
    searchResults, 
    loading, 
    error, 
    lastSearch, 
    fetchTrendingMovies,
    searchMovies,
    clearSearchResults
  } = useMovieContext();

  const [searchQuery, setSearchQuery] = useState('');

  // Initial data fetch
  useEffect(() => {
    if (trendingMovies.length === 0 && !lastSearch) {
      fetchTrendingMovies();
    }
  }, [fetchTrendingMovies, trendingMovies.length, lastSearch]);

  // Get featured movie for hero section
  const featuredMovie = trendingMovies?.[0] || {};
  const heroImage = featuredMovie.backdrop_path 
    ? getImageUrl(featuredMovie.backdrop_path, 'original')
    : '/default-hero.jpg';

  const handleSearch = (query) => {
    if (query.trim()) {
      searchMovies(query);
    } else {
      clearSearchResults();
    }
  };

  if (loading && trendingMovies.length === 0 && searchResults.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4, p: 2 }}>
        {error}
        <Button 
          variant="outlined" 
          onClick={fetchTrendingMovies}
          sx={{ mt: 2, display: 'block', mx: 'auto' }}
        >
          Retry
        </Button>
      </Typography>
    );
  }

  return (
    <Box sx={{ pb: 4 }}>
      {/* Hero Section */}
      {!lastSearch && trendingMovies.length > 0 && (
        <Box sx={{
          position: 'relative',
          height: { xs: '50vh', md: '60vh' },
          minHeight: 400,
          background: `linear-gradient(to right, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.5) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)'
          }
        }}>
          <Container maxWidth="lg" sx={{ zIndex: 1, px: { xs: 2, md: 4 } }}>
            <Typography variant="h2" component="h1" sx={{ 
              color: 'white', 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}>
              {featuredMovie.title || 'Discover Movies'}
            </Typography>
            <Typography variant="h5" sx={{ 
              color: 'var(--text-secondary)', 
              maxWidth: { xs: '100%', md: '60%' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              mb: 3,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}>
              {featuredMovie.overview || 'Find your next favorite film'}
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => window.location.href = `/movie/${featuredMovie.id}`}
              sx={{
                bgcolor: 'var(--primary)',
                '&:hover': { bgcolor: 'var(--primary-dark)' },
                fontSize: { xs: '0.875rem', md: '1rem' },
                px: 4,
                py: 1.5
              }}
            >
              Watch Now
            </Button>
          </Container>
        </Box>
      )}

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Search Bar - Always Visible */}
        <Box sx={{ mb: 4 }}>
          <SearchBar 
            onSearch={handleSearch} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Box>
        
        {error && (
          <Typography color="error" align="center" sx={{ mb: 3 }}>
            {error}
          </Typography>
        )}

        {lastSearch ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="h4" sx={{ color: 'var(--text-primary)' }}>
                Search Results for "{lastSearch}"
              </Typography>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => {
                  clearSearchResults();
                  setSearchQuery('');
                }}
              >
                Clear Search
              </Button>
            </Box>
            
            {loading ? (
              <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
            ) : searchResults.length > 0 ? (
              <Grid container spacing={3}>
                {searchResults.map((movie) => (
                  <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
                No movies found matching your search.
              </Typography>
            )}
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ mb: 3, color: 'var(--text-primary)' }}>
              Trending This Week
            </Typography>
            <Grid container spacing={3}>
              {trendingMovies.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}

export default Home;