import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box,
  ButtonGroup,
  Button,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartDrawer = ({ open, onClose, cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose} data-testid="cart-drawer">
      <Box sx={{ width: 350, p: 2 }}>
        <Typography variant="h6" gutterBottom data-testid="cart-title">
          Shopping Cart
        </Typography>
        <List>
          {cartItems.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton 
                  edge="end" 
                  onClick={() => onRemoveFromCart(item.id)}
                  data-testid={`remove-item-${item.id}`}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={item.name}
                secondary={`$${(item.price * item.quantity).toFixed(2)}`}
              />
              <ButtonGroup size="small" sx={{ mx: 2 }}>
                <Button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  data-testid={`decrease-quantity-${item.id}`}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button disabled data-testid={`quantity-${item.id}`}>{item.quantity}</Button>
                <Button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  data-testid={`increase-quantity-${item.id}`}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'right' }}>
          Total: ${total.toFixed(2)}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              onRemoveFromCart('all');
              onClose();
            }}
            data-testid="empty-cart"
          >
            Empty Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onClose();
              navigate('/checkout');
            }}
            disabled={cartItems.length === 0}
            data-testid="checkout-button"
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
