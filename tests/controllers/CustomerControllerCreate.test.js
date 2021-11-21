const sinon = require('sinon');
const spies = require('chai-spies');
const chai = require('chai');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('../models/mongoMockConnections');
const { RegisterCustomer } = require('../../src/controllers/CustomerController');
const CustomerService = require('../../src/services/customerService');
const { BAD_REQUEST } = require('../../src/utils/statusCode');

chai.use(spies);
describe('Camada de Controller - Ao chamar o controller de register', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};
    const next = chai.spy((err) => err);

    before(() => {
      request.body = {};
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(CustomerService, 'registerCustomer')
        .resolves(false);
    });

    after(() => {
      CustomerService.registerCustomer.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await RegisterCustomer(request, response, next);
      expect(next).to.have.been.called.with({
        statusCode: BAD_REQUEST,
        message: 'error_when_registering',
      });
    });
  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};
    const next = chai.spy((err) => err);

    before(() => {
      request.body = {
        name: 'Joao Alberto Cunha',
        username: 'jojoalbertin',
        password: 'aviao789123',
        birthdate: '25/04/63',
        address: 'Rua Pedrin Carnela',
        addressNumber: '1590',
        primaryPhone: '55995676666',
        description: 'Um bom amigo para todos',
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(CustomerService, 'registerCustomer')
        .resolves(true);
    });

    after(() => {
      MongoClient.connect.restore();
      CustomerService.registerCustomer.restore();
    });
    it('é chamado o status com o código 201', async () => {
      await RegisterCustomer(request, response, next);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
});
