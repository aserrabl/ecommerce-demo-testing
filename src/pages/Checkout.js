import React, { useState } from 'react';
import { processPayment } from '../services/paymentService';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Alert
} from '@mui/material';

const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsProcessing(true);
    setError('');

    try {
      const paymentResult = await processPayment(formData, cartItems);
      
      // Only clear cart and navigate on success
      if (paymentResult.success) {
        setCartItems([]);
        navigate(`/success/${paymentResult.transactionId}`, { 
          state: { 
            transactionId: paymentResult.transactionId,
            timestamp: paymentResult.timestamp
          }
        });
      } else {
        throw new Error(paymentResult.message || 'Payment failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5">Your cart is empty</Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Return to Shop
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          {cartItems.map((item) => (
            <Typography key={item.id}>
              {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${total.toFixed(2)}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} data-testid="payment-error">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cardholder Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                data-testid="cardholder-name-input"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                inputProps={{ maxLength: 16 }}
                data-testid="card-number-input"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date (MM/YY)"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                inputProps={{ maxLength: 5 }}
                data-testid="expiry-date-input"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                inputProps={{ maxLength: 3 }}
                type="password"
                data-testid="cvv-input"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              data-testid="back-to-shop"
            >
              Back to Shop
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={isProcessing}
              data-testid="submit-payment"
            >
              {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Checkout;
