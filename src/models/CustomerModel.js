const mongoose = require('./connection');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  birthdate: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  addressNumber: {
    type: String,
    required: true,
  },
  primaryPhone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Costumer = mongoose.model('Custumer', CustomerSchema);

module.exports = Costumer;
