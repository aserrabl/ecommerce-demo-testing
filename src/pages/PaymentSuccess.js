import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box
} from '@mui/material';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transactionId, timestamp } = location.state || {};

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleOutline sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for your purchase. Your transaction has been completed successfully.
        </Typography>
        <Box sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Transaction ID: {transactionId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {new Date(timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
