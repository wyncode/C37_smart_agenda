if (process.env.NODE_ENV !== 'production') require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const mongoose = require('mongoose');
const companyRouter = require('./routes/companies');
const customerRouter = require('./routes/customers');
const appointmentRouter = require('./routes/appointments');

const app = require('./app'),
  port = process.env.PORT || 8080,
  path = require('path');

app.get('/', (req, res) => {
  res.send('Welcome to the backend');
});

app.listen(port, () => {
  console.log(`Express server is up on port ${port}`);
});
