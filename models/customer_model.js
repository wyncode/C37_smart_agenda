const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
  customer: {
    type: String,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  phone: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.matches(value, /^\d{10}$/)) {
        throw new Error('Invalid Phone Number');
      }
    }
  },
  address: {
    type: String,
    //required: true,
    trim: true
  },
  zipcode: {
    type: String,
    //required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid.');
      }
    }
  },
});

// relation between appointment and customer 
customerSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'customer'
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
