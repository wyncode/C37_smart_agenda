const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const { auth } = require('../middleware/auth.js');
const multer = require('multer');
const sharp = require('sharp');
const Company = require('../models/company_model');


// Creating a company

router.post('/companies', async (req, res) => {
  const company = new Company(req.body);
  try {
    await company.save();
    const token = await company.generateAuthToken();
    res.status(201).send({ company, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get current company

router.get('/companies/me', auth, async (req, res) => {
  res.send(req.company);
});


//updating data's company

router.patch('/companies/:id', auth, async (req, res) => {
  //object.keys  will return a list of keys in an array
  const updates = Object.keys(req.body);
  const allowedUpdates = ['password', 'email', 'phone', 'services', 'calendar', 'avatar'];

  //for every element in the updates, if the update element match with some
  //of the allowedUpdates, so return true valid operation.
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const company = await Company.findById(req.params.id);

    updates.forEach((update) => (company[update] = req.body[update]));
    await company.save();
    if (!company) {
      return res.status(404).send();
    }
    res.send(company);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Upload company avatar

const upload = multer({
  limits: {
		// 1000000 bytes, is 1000 kb or 1 mb.
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('"Uploaded image is not a valid. Only JPG, JPEG and PNG files are allowed.'));
    }
    cb(undefined, true);
  }
});

router.post(
  '/companies/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    //req.file.buffer is the way express receives files
    //sharp will resize and convert all img in png file
    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250
      })
      .png()
      .toBuffer();

    req.company.avatar = buffer;
    await req.company.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Delete company's avatar

router.delete('/companies/me/avatar', auth, async (req, res) => {
  req.company.avatar = undefined;
  await req.company.save();
  res.send();
});

// Get a company's avatar
router.get('/companies/:id/avatar', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company || !company.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(company.avatar);
  } catch (e) {
    res.status(404).send();
  }
});


// Deleting company

router.delete('/companies/me', auth, async (req, res) => {
  try {
    await req.company.remove();
    res.send(req.company);
  } catch (e) {
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
