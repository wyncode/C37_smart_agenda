const mongoose = require('mongoose');
const validator = require('validator');

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    trim: true,
    required: false
  },
  duration: {
    type: String,
    trim: true,
    required: true
  },
  time: {
    type: String,
    trim: true,
    required: false
  },
  service: {
    type: String,
    trim: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Customer',
    required: false
  },
  company: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Company',
    required: false
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
