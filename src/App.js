import React, { useState, useEffect } from 'react';
import { Container, Grid, CssBaseline } from '@mui/material';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { products } from './data/products';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    setIsDrawerOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
              />
            </Grid>
          ))}
        </Grid>
        <CartDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
        />
      </Container>
    </>
  );
}

export default App;
