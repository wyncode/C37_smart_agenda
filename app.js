require('./db/mongoose');
const express = require('express'),
  cors = require('cors');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());


//
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
module.exports = app;
