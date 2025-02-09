import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = ({ cartItemsCount, onCartClick }) => {
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shopping App
        </Typography>
        <Box>
          <IconButton 
            color="inherit" 
            onClick={onCartClick}
            data-testid="cart-button"
          >
            <Badge 
              badgeContent={cartItemsCount} 
              color="error"
              data-testid="cart-count"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
