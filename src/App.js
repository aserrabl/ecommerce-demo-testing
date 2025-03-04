import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Grid, CssBaseline, Box, Typography } from '@mui/material';
import Notification from './components/Notification';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartTimeout, setCartTimeout] = useState(null);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartTimeout(null);
    setNotification({ 
      open: true, 
      message: 'Your cart has been cleared due to inactivity'
    });
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001/ws');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'purchase') {
        const message = `One user in ${data.data.city} has bought ${data.data.product.name}. Hurry up!`;
        setNotification({ open: true, message });
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleCloseNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, open: false }));
  }, []);

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

  // Cleanup cart timeout
  useEffect(() => {
    return () => {
      if (cartTimeout) {
        clearTimeout(cartTimeout);
      }
    };
  }, [cartTimeout]);

  const handleAddToCart = (product) => {
    // Clear any existing timeout
    if (cartTimeout) {
      clearTimeout(cartTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(clearCart, 15 * 60 * 1000); // 15 minutes
    setCartTimeout(timeout);

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
      if (cartTimeout) {
        clearTimeout(cartTimeout);
        setCartTimeout(null);
      }
      return;
    }
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      if (newItems.length === 0 && cartTimeout) {
        clearTimeout(cartTimeout);
        setCartTimeout(null);
      }
      return newItems;
    });
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
      <Notification
        open={notification.open}
        message={notification.message}
        onClose={handleCloseNotification}
      />
      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsDrawerOpen(true)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Container maxWidth="lg" sx={{ py: 2 }}>
              {loading ? (
                <Typography>Loading products...</Typography>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
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
              )}
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
        <Route
          path="/success/:transactionId"
          element={<PaymentSuccess />}
        />
      </Routes>
    </>
  );
}

export default App;
