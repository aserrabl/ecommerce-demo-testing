import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Grid, CssBaseline } from '@mui/material';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Checkout from './pages/Checkout';
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
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsDrawerOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    if (productId === 'all') {
      setCartItems([]);
      return;
    }
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
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
                onUpdateQuantity={handleUpdateQuantity}
              />
            </Container>
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
