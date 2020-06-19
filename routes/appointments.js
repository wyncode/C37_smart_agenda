const mongoose = require('mongoose');
const express = require('express');
const router = new express.Router();
const Appointment = require('../models/appointment_model');
const Company = require('../models/company_model');
const { withCustomer, auth } = require('../middleware/auth.js');
const Customer = require('../models/customer_model');


// creating an appointment 

router.post('/appointments', withCustomer, async (req, res) => {
    const company = req.customer.owner
    const appointment = new Appointment({ ...req.body, customer: req.customer._id,  company });
    try {
        await appointment.save();
        res.status(201).send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
})

//get a list of appointments (company's view)

router.get('/appointments/company', auth, async (req, res) => {    
    
    const company = req.company

    const appointments = await Appointment.find({ company: company._id })

    res.status(200).send(appointments)
    
   
})


//get appointments (customer's view)
router.get('/appointments/customer', withCustomer, async (req, res) => {    
    const customer = req.customer

    const appointments = await Appointment.find({ company: customer.owner })

    res.status(200).send(appointments)
    
})





// getting appointment by ID 

router.get('/appointments/:_id', async (req, res) => { 
    const {_id} = req.params;
    if (mongoose.Types.ObjectId.isValid(_id)) {
        try {
            const appointment = await Appointment.findById(_id);
            if (!appointment) {
                return res.status(404).send();
            }
            res.send(appointment)
        } catch (error) {
            res.status(500).send();
        }
    } else {
        res.status(400).send('Not a valid appointment.');
    }
});

// editing appointment

router.patch('/appointments/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['date', 'time', 'service'];

    const isValidOperation = updates.every(update => 
        allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Unable to edit.' })
    }
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id);

        updates.forEach((update) => (appointment["appointment"][update] = req.body[update]));
        await appointment.save();
        if (!appointment) {
            return res.status(404).send();
        }
        res.send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// deleting an appointment 

router.delete('/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            res.status(404).send();
        }
        res.send(appointment);
    } catch (error) {
        res.status(500).send();
    }
});


module.exports = router;