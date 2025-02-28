import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the fetch API
const mockProducts = [
  { id: 1, name: 'Test Product', price: 10, image: 'test.jpg' }
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    })
  );

  // Mock WebSocket with all required methods
  global.WebSocket = jest.fn().mockImplementation(() => ({
    close: jest.fn(),
    onmessage: jest.fn(),
    onclose: jest.fn(),
    readyState: WebSocket.OPEN
  }));
});

describe('Integration - Purchase Notifications Feature', () => {
  let mockWebSocket;

  beforeEach(() => {
    // Create a mock WebSocket instance with a more detailed implementation
    mockWebSocket = {
      close: jest.fn(),
      onmessage: null,
      onclose: null,
    };

    // Update the global WebSocket mock to store the instance
    global.WebSocket = jest.fn().mockImplementation(() => mockWebSocket);
  });

  test('should show notification when purchase message is received', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Wait for products to load
    await screen.findByText('Test Product');

    // Simulate receiving a WebSocket message
    const purchaseMessage = {
      type: 'purchase',
      data: {
        city: 'New York',
        product: { name: 'Test Product' },
        timestamp: new Date().toISOString()
      }
    };

    await act(async () => {
      mockWebSocket.onmessage({
        data: JSON.stringify(purchaseMessage)
      });
    });

    // Verify the notification is shown with the correct message
    const expectedMessage = 'One user in New York has bought Test Product. Hurry up!';
    expect(screen.getByText(expectedMessage)).toBeInTheDocument();
  });

});

afterEach(() => {
  jest.clearAllMocks();
});
