import { 
  TextField, 
  InputAdornment, 
  IconButton, 
  Box,
  Button 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({ onSearch, searchQuery, setSearchQuery }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        display: 'flex', 
        gap: 1,
        mb: 4
      }}
    >
      <TextField
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for movies..."
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            '& fieldset': {
              borderColor: 'var(--primary)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--primary-dark)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--primary)',
            },
          },
          '& .MuiInputBase-input': {
            color: 'black', // Text color
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton 
                onClick={handleClear} 
                size="small"
                sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button 
        variant="contained" 
        type="submit"
        disabled={!searchQuery.trim()}
        sx={{
          whiteSpace: 'nowrap',
          minWidth: 'fit-content',
          bgcolor: 'var(--primary)',
          '&:hover': {
            bgcolor: 'var(--primary-dark)'
          }
        }}
      >
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;