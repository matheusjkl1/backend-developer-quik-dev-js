const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const md5 = require('md5');
const Customer = require('../../src/models/CustomerModel');
const { getConnection } = require('./mongoMockConnections');

describe('Camada de Model - Busca um Customer no Banco de Dados através do ID', () => {
  let connectionMock;
  const ID_EXAMPLE = '604cb554311d68f491ba5781';
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  /* Restauraremos a função `connect` original após os testes. */
  after(async () => {
    MongoClient.connect.restore();
  });

  describe('quando não existe um Customer para o ID informado', () => {
    it('retorna "null"', async () => {
      const response = await Customer.findById(ID_EXAMPLE);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um Customer para o ID informado', async () => {
    before(async () => {
      const customerCollection = await connectionMock;

      await customerCollection.db('test').collection('customers').insertOne({
        _id: ObjectId(ID_EXAMPLE),
        name: 'Carlos Adalberto',
        username: 'adalshow',
        password: md5('carlinhos1516'),
        birthdate: '02/10/88',
        address: 'Rua Juazeiro',
        addressNumber: '1596',
        primaryPhone: '99-9866-7888',
        description: 'Sou um cara amante de coisas legais e isso ai.',
      });
    });

    after(async () => {
      await connectionMock.db('test').collection('customers').drop();
    });

    it('retorna um objeto', async () => {
      const response = await Customer.deleteCustomer(ID_EXAMPLE);

      expect(response).to.be.a('object');
    });

    it('o objeto possui as propriedades: "lastErrorObject", "ok", "value"', async () => {
      const response = await Customer.deleteCustomer(ID_EXAMPLE);

      expect(response).to.include.all.keys('lastErrorObject', 'ok', 'value');
    });
  });
});
