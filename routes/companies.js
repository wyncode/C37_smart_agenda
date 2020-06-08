const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth.js')

const Company = require('../models/company_model'); 


// Creating a company 

router.post('/companies', async (req, res) => {
    const company= new Company(req.body);
    try {
      await company.save();
      res.status(201).send(company);  
    } catch (error){
      res.status(400).send(error);
    }
  });
  
// getting a list of companies

router.get('/companies/me', auth, async (req, res) => {
  res.send(req.company);
  });
  
// getting an specific company by id

router.get('/companies/:_id', async (req, res) => {
    const {_id} = req.params;
    if (mongoose.Types.ObjectId.isValid(_id)) {
      try {
        const company = await Company.findById(_id);
        if (!company) {
          // The gotcha here is that this will only trigger if the
                  // _id param sent is 12 bits (12 character string)
          return res.status(404).send();
        }
        res.send(company);
      } catch (e) {
        res.status(500).send();
      }
    } else {
      res.status(400).send('Not a valid company id');
    } 
  });
  
//updating data's company

router.patch('/companies/:id', async (req, res) => {
    //object.keys  will return a list of keys in an array
    const updates = Object.keys(req.body);
    const allowedUpdates = ['password', 'email', 'phone', 'services', 'calendar'];
  
    //for every element in the updates, if the update element match with some 
    //of the allowedUpdates, so return true valid operation.
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const company = await Company.findById(req.params.id);

        updates.forEach(update => (company[update] = req.body[update]));
        await company.save();
        if (!company) {
        return res.status(404).send();
        }
        res.send(company);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
// Deleting company

router.delete('/companies/:id', async (req, res) => {
    try {
      const company = await Company.findByIdAndDelete(req.params.id);
      if (!company) {
        res.status(404).send();
      }
  
      res.send(company);
    } catch (error) {
      res.status(500).send();
    }
  });
  
// Login 

router.post('/companies/login', async (req, res) => {
  try {
    const company = await Company.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await company.generateAuthToken();
    res.send({ company, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Logout 1 device

//code bellow means that we are filtering on an array of active tokens and 
//logout only the current one. The other ones will maintain logged in

router.post('/companies/logout', auth, async (req, res) => {
  try {
    req.company.tokens = req.company.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.company.save();
    res.send(req.company);
  } catch (e) {
    res.status(500).send();
  }
});

// Logout all devices

router.post('/companies/logoutall', auth, async (req, res) => {
  try {
    req.company.tokens = [];
    await req.company.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});


module.exports = router;