export const processPayment = async (formData, cartItems) => {
  const paymentDetails = {
    amount: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    cardNumber: formData.cardNumber,
    expiryDate: formData.expiryDate,
    cvv: formData.cvv,
    name: formData.name
  };
  try {
    const response = await fetch('http://localhost:3001/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        paymentDetails
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message);
    }
    
    return {
      success: data.success,
      transactionId: data.transactionId,
      timestamp: new Date().toISOString(),
      message: data.message
    };
  } catch (error) {
    throw new Error(error.message || 'Payment failed. Please try again.');
  }
};
