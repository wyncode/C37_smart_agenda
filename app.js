require('./db/mongoose');
const express = require('express'),
  cors = require('cors');
  const path = require('path');

const app = express();



//Middleware
app.use(cors());
app.use(express.json());

//code below is just in case to put app in maintenance

// app.use((req, res) => {
//   console.log(req.method, req.path);
//   res.status(503).json({error: 'Site is down for maintenance.'});
// });

//call routes
const companyRouter = require('./routes/companies');
const customerRouter = require ('./routes/customers')
const appointmentRouter = require('./routes/appointments');
app.use(companyRouter);
app.use(customerRouter);
app.use(appointmentRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


module.exports = app;
