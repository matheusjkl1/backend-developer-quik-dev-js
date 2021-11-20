const sinon = require('sinon');
const spies = require('chai-spies');
const chai = require('chai');
const { expect } = require('chai');
const { DeleteCostumer } = require('../../src/controllers/CustomerController');
const CustomerService = require('../../src/services/customerService');
const { NOT_FOUND, BAD_REQUEST } = require('../../src/utils/statusCode');

chai.use(spies);
describe('Camada de Controller - Ao chamar o controller de delete', () => {
  describe('quando o ID informado não é válido', () => {
    const response = {};
    const request = {};
    const next = chai.spy((err) => err);

    before(() => {
      request.body = {};
      request.params = {
        id: 'd',
      };
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(CustomerService, 'deleteCustomerById')
        .resolves({ error: 'id_invalid' });
    });

    after(() => {
      CustomerService.deleteCustomerById.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await DeleteCostumer(request, response, next);
      expect(next).to.have.been.called.with({
        statusCode: BAD_REQUEST,
        message: 'id_invalid',
      });
    });
  });

  describe('quando o ID informado não existe no Banco de Dados', () => {
    const response = {};
    const request = {};
    const next = chai.spy((err) => err);

    before(() => {
      request.body = {};
      request.params = {
        id: '61993471976e0c64ff5aab5a',
      };
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(CustomerService, 'deleteCustomerById')
        .resolves({ error: 'no_registered_customer' });
    });

    after(() => {
      CustomerService.deleteCustomerById.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await DeleteCostumer(request, response, next);
      expect(next).to.have.been.called.with({
        statusCode: NOT_FOUND,
        message: 'no_registered_customer',
      });
    });
  });

  // describe('quando o ID informado existe no Banco de Dados', () => {
  //   const response = {};
  //   const request = {};
  //   const next = chai.spy((err) => err);

  //   before(() => {
  //     request.params = {
  //       id: '61993de103456d8f2ae8de26',
  //     };
  //     response.status = sinon.stub()
  //       .returns(response);
  //     response.json = sinon.stub()
  //       .returns();
  //     sinon.stub(CustomerService, 'deleteCustomerById')
  //       .resolves(true);
  //   });

  //   after(() => {
  //     CustomerService.deleteCustomerById.restore();
  //   });

  //   it('é chamado o status com o código 204', async () => {
  //     await DeleteCostumer(request, response, next);
  //     expect(response.json.calledWith({ message: 'successfully_deleted' })).to.be.equal(true);
  //   });
  // });
});
