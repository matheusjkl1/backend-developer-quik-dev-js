const { expect } = require('chai');
const sinon = require('sinon');

const CustomerModel = require('../../src/models/CustomerModel');
const CustomerModelService = require('../../src/services/customerService');

describe('Camada de Service - Atualiza um Customer no Banco de Dados', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadCustomer = {};

    before(() => {
      sinon.stub(CustomerModel, 'findByIdAndUpdate')
        .resolves(null, null);
    });

    // Restauraremos a função `findByIdAndUpdate` original após os testes.
    after(() => {
      CustomerModel.findByIdAndUpdate.restore();
    });

    it('retorna um boolean', async () => {
      const response = await CustomerModelService.updateCustomer(null, payloadCustomer);
      expect(response).to.have.a.property('error');
    });

    it('o boolean contém "false"', async () => {
      const response = await CustomerModelService.updateCustomer(null, payloadCustomer);
      expect(response).to.have.a.property('error');
    });
  });
});
