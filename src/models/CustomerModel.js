/* eslint-disable no-console */
const ObjectID = require('mongodb').ObjectId;
const connection = require('./connection');

const findById = async (id) => connection().then(
  (db) => db.collection('customers').findOne({ _id: ObjectID(id) }).then((res) => (res)),
).catch((err) => err);

const findUserByUsername = async ({ username }) => connection().then(
  (db) => db.collection('customers').findOne({ username }).then((res) => res),
).catch((err) => err);

const findUser = async ({ username, password }) => connection().then(
  (db) => db.collection('customers').findOne({ $and: [{ username }, { password }] }).then((res) => (res)),
).catch((err) => err);

const create = async ({
  name, username, birthdate, address, addressNumber, primaryPhone, description, password,
}) => connection().then((db) => db
  .collection('customers')
  .insertOne({
    name,
    username,
    password,
    birthdate,
    address,
    addressNumber,
    primaryPhone,
    description,
    createdAt: new Date(),
  }).then(({ insertedId }) => ({ id: insertedId })).catch((err) => (err)));

const findByIdAndUpdate = async (userid, dataToUpdate) => {
  const query = { _id: ObjectID(userid) };
  const newValues = { $set: { ...dataToUpdate, updateAt: new Date() } };
  const response = await connection().then((db) => db
    .collection('customers')
    .findOneAndUpdate(query, newValues)).catch((err) => err);

  if (response.value) {
    const { _id: id } = response.value;

    return { id, ...dataToUpdate };
  }

  const { updatedExisting } = response.lastErrorObject;
  return { updatedExisting };
};

const deleteCustomer = async (id) => connection().then(
  (db) => db.collection('customers').findOneAndDelete({ _id: ObjectID(id) }).then((res) => (res)),
).catch((err) => err);

module.exports = {
  create,
  findById,
  findUser,
  findByIdAndUpdate,
  findUserByUsername,
  deleteCustomer,
};
