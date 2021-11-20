const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const Customer = require('../../src/models/CustomerModel');
const { getConnection } = require('./mongoMockConnections');

describe('Camada de Model - Insere um Customer no Banco de Dados', () => {
  let connectionMock;
  const payloadCustomer = {
    name: 'Carlos Adalberto',
    username: 'adalshow',
    password: 'carlinhos1516',
    birthdate: '02/10/88',
    address: 'Rua Juazeiro',
    addressNumber: '1596',
    primaryPhone: '99-9866-7888',
    description: 'Sou um cara amante de coisas legais e isso ai.',
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  /* Restauraremos a função `connect` original após os testes. */
  after(async () => {
    MongoClient.connect.restore();
  });

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await Customer.create(payloadCustomer);
      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "insertedId" do novo Customer inserido', async () => {
      const response = await Customer.create(payloadCustomer);

      expect(response).to.have.a.property('id');
    });

    it('deve existir um Customer com o nome cadastrado!', async () => {
      const response = await Customer.findUserByUsername({ username: payloadCustomer.username });
      return expect(response).to.be.not.null;
    });
  });
});
