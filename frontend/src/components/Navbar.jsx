import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieIcon from '@mui/icons-material/Movie';

function Navbar() {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'var(--background)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'none'
      }}
    >
      <Toolbar>
        <MovieIcon sx={{ mr: 1, color: 'var(--primary)' }} />
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'var(--text-primary)'
          }}
        >
          MovieExplorer
        </Typography>
        <Button 
          component={Link}
          to="/favorites"
          startIcon={<FavoriteIcon />}
          sx={{
            color: 'var(--text-primary)',
            '&:hover': {
              color: 'var(--primary)'
            }
          }}
        >
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;