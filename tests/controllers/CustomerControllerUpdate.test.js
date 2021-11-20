const sinon = require('sinon');
const spies = require('chai-spies');
const chai = require('chai');
const { expect } = require('chai');
const { UpdateCostumer } = require('../../src/controllers/CustomerController');
const CustomerService = require('../../src/services/customerService');
const { BAD_REQUEST } = require('../../src/utils/statusCode');

chai.use(spies);
describe('Camada de Controller - Ao chamar o controller de Update', () => {
  describe('quando o ID informado não é válido', () => {
    const response = {};
    const request = {};
    const next = chai.spy((err) => err);

    before(() => {
      request.body = {};
      request.user = {
        id: 'd',
      };
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(CustomerService, 'updateCustomer')
        .resolves({ error: 'incorret_data_form' });
    });

    after(() => {
      CustomerService.updateCustomer.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await UpdateCostumer(request, response, next);
      expect(next).to.have.been.called.with({
        statusCode: BAD_REQUEST,
        message: 'incorret_data_form',
      });
    });
  });
});
