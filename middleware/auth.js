const jwt = require('jsonwebtoken');
const Company = require('../models/company_model');
const Customer = require('../models/customer_model')


//middleware token

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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


//middleware to relate customer email to appointment

const withCustomer = async (req, res, next) => {
  try {
    const { email } = req.query;

    const customer = await Customer.findOne({ email })

    if (!customer) throw new Error()

    req.customer = customer;

    next()

  } catch (error) {
    res.status(401).send({ error: 'No customer with this email.' });
  }
}

module.exports = { auth, withCustomer }