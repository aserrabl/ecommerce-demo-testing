# Shopping App with Real-time Updates

This is a React-based shopping application designed as a starting point for UI testing workshops. It features real-time purchase notifications through WebSocket connections and a complete checkout process.

## Features

- Product listing with add to cart functionality
- Real-time notifications of purchases from other users
- Shopping cart with quantity management
- Checkout process with payment simulation
- Persistent cart (saves to localStorage)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

1. Start the backend server (provides both API and WebSocket):
```bash
node server-back/server.js
```

2. In a new terminal, start the React application:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Testing the Payment Process

To test the payment process, use these test card numbers:
- Success: 1111
- Failure: Any other number

## Development Notes

### WebSocket Messages

The server sends purchase notifications every 5-10 seconds with the following structure:
```json
{
  "type": "purchase",
  "data": {
    "city": "Barcelona",
    "product": { ... },
    "timestamp": "2024-02-09T12:00:00.000Z"
  }
}
```

### API Endpoints

- `GET /api/products` - Get all products
- `POST /api/checkout` - Process payment

## Testing Workshop

This application serves as a foundation for UI testing workshops, featuring:
- Data-testid attributes for easy element selection
- Complex user interactions (cart management, forms)
- Asynchronous operations (API calls, WebSocket)
- State management scenarios
