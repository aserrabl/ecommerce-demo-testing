import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

describe('Snapshot - ProductCard ', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg'
  };

  it('should match snapshot', () => {
    const { container } = render(
      <ProductCard 
        product={mockProduct}
        onAddToCart={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with different product data', () => {
    const differentProduct = {
      id: 2,
      name: 'Another Product',
      price: 149.99,
      image: 'another-image.jpg'
    };

    const { container } = render(
      <ProductCard 
        product={differentProduct}
        onAddToCart={() => {}}
      />
    );
    
    expect(container).toMatchSnapshot();
  });
});

describe('Unit - ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg'
  };

  it('calls function to product to cart when add card button is clicked', () => {
    const mockOnAddToCart = jest.fn();
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
      />
    );

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalled();
  });
});