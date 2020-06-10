const jwt = require('jsonwebtoken');
const Company = require('../models/company_model');


const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'neverstoplearning');
    const company = await Company.findOne({
      _id: decoded._id,
      'tokens.token': token
    });

    if (!company) {
      throw new Error();
    }
    req.token = token;
    req.company = company;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;