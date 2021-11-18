require('dotenv').config();
const mongoose = require('mongoose');

const { DB_URL } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
