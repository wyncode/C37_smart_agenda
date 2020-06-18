const mongoose = require('mongoose');
const validator = require('validator');

const appointmentSchema = new mongoose.Schema({
  appointment: {
    date: {
      type: String,
      format: Date,
      trim: true,
      required: false
    },
    time: {
      type: String,
      trim: true,
      required: false
    },
    service: {
      type: String,
      trim: true,
      required: false
    },
    duration: {
      type: 'String',
      reqired: false
    },
    owner: {
      type: 'String',
      reqired: false
      // type: mongoose.Schema.Types.ObjectID,
      // ref: 'Customer'
    }
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
