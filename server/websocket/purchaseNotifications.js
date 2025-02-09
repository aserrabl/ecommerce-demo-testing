const WebSocket = require('ws'); 
 const products = require('../data/products').products;        
              
 const cities = ['Barcelona', 'Madrid', 'Valencia', 'Sevilla', 'Bilbao'];                 
              
 function getRandomPurchase() {   
   const randomProduct = products[Math.floor(Math.random() * products.length)];           
   const randomCity = cities[Math.floor(Math.random() * cities.length)];                  
   return JSON.stringify({        
     type: 'purchase',            
     data: {  
       city: randomCity,          
       product: randomProduct,    
       timestamp: new Date().toISOString()        
     }        
   });        
 }            
              
function setupWebSocket(server) {
   const wss = new WebSocket.Server({             
     server,  
     path: '/ws'                  
   });        
              
   wss.on('connection', (ws) => { 
     console.log('Client connected');             
              
     const interval = setInterval(() => {         
       const message = getRandomPurchase();       
       console.log('Sending message:', message);  
       ws.send(message);          
     }, Math.random() * 5000 + 5000);             
              
     ws.on('close', () => {       
       console.log('Client disconnected');        
       clearInterval(interval);   
     });      
   });        
              
   return wss;
}

module.exports = { setupWebSocket };
