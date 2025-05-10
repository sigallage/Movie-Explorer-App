import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearch, setLastSearch] = useState('');
  const [page, setPage] = useState(1);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedSearch = localStorage.getItem('lastMovieSearch');
    if (savedSearch) {
      setLastSearch(savedSearch);
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchTrendingMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/trending');
      setTrendingMovies(response.data.results);
      // Clear search results when fetching trending movies
      setSearchResults([]);
      setLastSearch('');
      localStorage.removeItem('lastMovieSearch');
    } catch (err) {
      setError('Failed to fetch trending movies');
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query) => {
    if (!query.trim()) {
      // If empty query, show trending movies
      await fetchTrendingMovies();
      return;
    }
    
    setLoading(true);
    setError(null);
    setPage(1);
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setSearchResults(response.data.results);
      setLastSearch(query);
      localStorage.setItem('lastMovieSearch', query);
    } catch (err) {
      setError('Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    setLastSearch('');
    setPage(1);
    localStorage.removeItem('lastMovieSearch');
    fetchTrendingMovies(); // Fetch trending movies after clearing
  };

  const loadMoreMovies = async () => {
    if (!lastSearch.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const response = await axios.get(`/api/search?query=${lastSearch}&page=${nextPage}`);
      setSearchResults(prev => [...prev, ...response.data.results]);
      setPage(nextPage);
    } catch (err) {
      setError('Failed to load more movies');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites(prev => [...prev, movie]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        favorites,
        loading,
        error,
        lastSearch,
        fetchTrendingMovies,
        searchMovies,
        loadMoreMovies,
        addToFavorites,
        removeFromFavorites,
        clearSearchResults // Add this to context
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);