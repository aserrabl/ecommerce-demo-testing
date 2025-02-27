import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductCard = ({ product, onAddToCart }) => {

  /** 
  if (process.env.REACT_APP_PW_TEST){
    product.image = null
  }
  */
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price.toFixed(2)}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => onAddToCart(product)}
          sx={{ mt: 2 }}
          data-testid={`add-to-cart-${product.id}`}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
