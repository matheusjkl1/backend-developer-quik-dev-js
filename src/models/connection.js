require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {
  DB_DEV_NAME, DB_PROD_NAME, NODE_ENV, DB_URL,
} = process.env;

const DB_NAME = NODE_ENV === 'DEV' ? DB_DEV_NAME : DB_PROD_NAME;

let db = null;

const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(DB_URL, OPTIONS).then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  }));

module.exports = connection;
