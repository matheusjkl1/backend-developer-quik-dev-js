const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const Customer = require('../../src/models/CustomerModel');
const { getConnection } = require('./mongoMockConnections');

describe('Camada de Model - Atualiza um Customer no Banco de Dados', () => {
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

  describe('Quando é inserido um ID não cadastrado', () => {
    it('retorna um objeto com a chave "updatedExisting" com o valor false', async () => {
      const response = await Customer.findByIdAndUpdate(ID_EXAMPLE);

      expect(response).to.eql({ updatedExisting: false });
    });
  });
});
