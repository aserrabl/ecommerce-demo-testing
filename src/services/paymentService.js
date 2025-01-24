// Simulates a payment API call
export const processPayment = async (paymentDetails) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate success/failure (90% success rate)
  const isSuccessful = Math.random() < 0.9;
  
  if (!isSuccessful) {
    throw new Error('Payment failed. Please try again.');
  }
  
  return {
    success: true,
    transactionId: Math.random().toString(36).substring(2, 15),
    timestamp: new Date().toISOString()
  };
};
