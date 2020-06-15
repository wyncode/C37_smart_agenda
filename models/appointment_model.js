const mongoose = require('mongoose');
const validator = require('validator');

const appointmentSchema = new mongoose.Schema({
    appointment:{
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
            trim: true,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Customer'
        }
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;