require("dotenv").config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(result => {
  console.log('connected to MongoDB', result);
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message);
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    unique: true,
    required: [true, 'User name required']
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        // Split the phone number into two parts
        const parts = v.split('-');

        // Check if there are exactly 2 parts
        if (parts.length !== 2) {
          return false;
        }

        // Check if the first part contains 2 or 3 numbers
        if (!/^\d{2,3}$/.test(parts[0])) {
          return false;
        }

        // Check if the second part is a number
        if (!/^\d+$/.test(parts[1])) {
          return false;
        }

        return true;
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

personSchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);