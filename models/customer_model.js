const mongoose = require('mongoose');
const validator = require('validator');


const customerSchema = new mongoose.Schema({
  customer: {
    name: {
        type: String,
        trim: true,
        },
    phone:{
        type: String,
        trim: true,
        validate(value) {
          if (!validator.matches(value, /^\d{10}$/)){
          throw new Error('Invalid Phone Number')
          }
        },
    },
    address:{
        type: String,
        //required: true,
        trim: true,
    },
    zipcode:{
        type: String,
        //required: true,
        trim: true
    },
    email:{
        type: String,
        //required: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
          throw new Error('Email is invalid.');
          }
        }    
    },
    appointments:[{
        date: {
          type: Date,
          trim: true,
        },
        time: {
          type: String,
          trim: true,
        }
    }]
  }       
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

