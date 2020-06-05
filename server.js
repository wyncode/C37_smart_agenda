if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = require('./app'),
  port = process.env.PORT || 8080,
  path = require('path');


app.listen(port, () => {
  console.log(`Express server is up on port ${port}`);
});
