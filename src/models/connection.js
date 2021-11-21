/* eslint-disable no-console */
require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {
  DB_HOST, DB_PORT, DB_NAME,
} = process.env;

let db = null;

const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?readPreference=primary&directConnection=true&ssl=false`;

const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(DB_URL, OPTIONS).then((conn) => {
    db = conn.db(DB_NAME);
    console.log(`Database Conectado DB NAME = ${db.s.namespace.db}`);
    return db;
  }));

connection();

module.exports = connection;
