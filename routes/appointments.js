const mongoose = require('mongoose');
const express = require('express');
const router = new express.Router();
const Appointment = require('../models/appointment_model');


// creating an appointment 

router.post('/appointments', async (req, res) => {
    const appointment = new Appointment(req.body);
    try {
        await appointment.save();
        res.status(201).send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
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