// Simulates a payment API call
export const processPayment = async (paymentDetails) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Check card number for success/failure simulation
  const cardNumber = paymentDetails.cardNumber.replace(/\s/g, '');
  
  if (cardNumber === '1111') {
    // Success case
    return {
      success: true,
      transactionId: Math.random().toString(36).substring(2, 15),
      timestamp: new Date().toISOString()
    };
  } else if (cardNumber === '2222') {
    // Failure case
    throw new Error('Payment failed. Please try again.');
  }
  
  return {
    success: true,
    transactionId: Math.random().toString(36).substring(2, 15),
    timestamp: new Date().toISOString()
  };
};
