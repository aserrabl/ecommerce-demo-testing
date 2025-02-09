const express = require('express');
 const cors = require('cors');
 const productsRouter = require('./routes/products');
 const checkoutRouter = require('./routes/checkout');
 const { setupWebSocket } = require('./websocket/purchaseNotifications');

 const app = express();

 app.use(cors());
 app.use(express.json());

 // Routes
 app.use('/api/products', productsRouter);
 app.use('/api/checkout', checkoutRouter);

 const server = app.listen(3001, () => {
   console.log('HTTP server started on http://localhost:3001');
 });

 // Initialize WebSocket server
 setupWebSocket(server);
 console.log('WebSocket server initialized on ws://localhost:3001/ws');