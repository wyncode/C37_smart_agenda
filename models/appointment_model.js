const mongoose = require('mongoose');
const validator = require('validator');

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    trim: true,
    required: true
  },
  time: {
    type: String,
    trim: true,
    required: true
  },
  service: {
    type: String,
    trim: true
    //required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Customer'
  },
  company: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Company'
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
