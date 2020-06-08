const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const companySchema = new mongoose.Schema({
    companyName:{
      type: String,
      required: true,
      trim: true,
    }, 
    username: {
      type: String,
      //required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase() === 'password') {
          throw new Error("Password can't be password.");
        }
        if (value.length < 4) {
          throw new Error('Password must be at least 4 characters long.');
        }
      }
    },
    email:{
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
    phone:{
      type: String,
      required: [true, 'User phone number required'],
      trim: true,
      validate(value) {
        if (!validator.matches(value, /^\d{10}$/)){
          throw new Error('Invalid Phone Number');
        }
      },
    },
    tokens: [
        {
          token: {
            type: String,
            required: true
          }
        }
    ],
    services: {
      type: [String]
      
    },
    calendar: []
});

// Generate Auth Token
companySchema.methods.generateAuthToken = async function () {
    const company = this;
    const token = jwt.sign({ _id: company.id.toString() }, 'neverstoplearning');
    company.tokens = company.tokens.concat({ token });
    await company.save();
    return token;
  };



// find company by email and password

companySchema.statics.findByCredentials = async (email, password) => {
    const company = await Company.findOne({ email });
    if (!company) {
      throw new Error('Unable to log in.');
    }
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      throw new Error('Unable to login.');
    }
    return company;
  };



//encrypt password
// This mongoose middleware will hash our company's 
//passwords whenever a company is created or a company password is updated.
companySchema.pre('save', async function(next) {
    const company = this;
    if (company.isModified('password')) {
      company.password = await bcrypt.hash(company.password, 8);
    }
    next();
  });

const Company = mongoose.model('Company', companySchema);

module.exports = Company