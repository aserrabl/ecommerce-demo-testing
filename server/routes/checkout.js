const express = require('express');
const router = express.Router();   
       
router.post('/', (req, res) => {   
  const { items, paymentDetails } = req.body;            
       
  const cardNumber = paymentDetails.cardNumber.replace(/\s/g, '');               
       
  if (cardNumber === '1111') { 
    res.json({                 
      success: true,           
      transactionId: `TR-${Date.now()}`,
      message: 'Payment processed successfully',
      purchasedItems: items    
    });
  } else {                     
    res.status(400).json({     
      success: false,          
      message: 'Payment failed. Please try again.'
    });
  }    
});    
       
module.exports = router;
