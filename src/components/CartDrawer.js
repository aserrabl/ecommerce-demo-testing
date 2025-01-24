import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartDrawer = ({ open, onClose, cartItems, onRemoveFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Shopping Cart
        </Typography>
        <List>
          {cartItems.map((item, index) => (
            <ListItem
              key={`${item.id}-${index}`}
              secondaryAction={
                <IconButton edge="end" onClick={() => onRemoveFromCart(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={item.name}
                secondary={`$${item.price.toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'right' }}>
          Total: ${total.toFixed(2)}
        </Typography>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
