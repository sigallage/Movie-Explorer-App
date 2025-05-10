// src/utils.js

/**
 * Formats a date string to a more readable format (e.g., "January 1, 2022")
 * @param {string} dateString - The date string to format (e.g., "2022-01-01")
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Formats the movie rating to a percentage (e.g., 7.5 → "75%")
 * @param {number} voteAverage - The movie's vote average (0-10 scale)
 * @returns {string} Formatted percentage string
 */
export const formatRating = (voteAverage) => {
  if (voteAverage === undefined || voteAverage === null) return 'N/A';
  return `${Math.round(voteAverage * 10)}%`;
};

/**
 * Formats the movie runtime to hours and minutes (e.g., 125 → "2h 5m")
 * @param {number} minutes - The movie runtime in minutes
 * @returns {string} Formatted runtime string
 */
export const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

/**
 * Gets the full image URL for a movie poster or backdrop
 * @param {string} path - The image path from TMDb API
 * @param {string} [size='w500'] - The image size (default: 'w500')
 * @returns {string} Full image URL
 */
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

/**
 * Filters and gets the first YouTube trailer from movie videos
 * @param {Array} videos - Array of video objects from TMDb API
 * @returns {Object|null} The first YouTube trailer found, or null
 */
export const getYouTubeTrailer = (videos) => {
  if (!videos || !videos.results) return null;
  
  return videos.results.find(
    video => video.site === 'YouTube' && video.type === 'Trailer'
  );
};

/**
 * Saves data to localStorage
 * @param {string} key - The localStorage key
 * @param {*} value - The value to store
 */
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Loads data from localStorage
 * @param {string} key - The localStorage key
 * @returns {*} The parsed value or null if not found
 */
export const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Debounces a function to limit how often it's called
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} The debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};