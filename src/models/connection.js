require('dotenv').config();
const mongoose = require('mongoose');

const { NODE_ENV, DB_TEST, DB_DEV, DB_PROD } = process.env;

const dbUrl = NODE_ENV === 'DEV' ? DB_TEST : DB_DEV || DB_PROD

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.useDb(NODE_ENV)

module.exports = mongoose;
