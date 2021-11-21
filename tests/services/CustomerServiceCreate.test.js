const { expect } = require('chai');
const sinon = require('sinon');
const CustomerModel = require('../../src/models/CustomerModel');
const CustomerModelService = require('../../src/services/customerService');

describe('Camada de Service - Insere um novo Customer no BD', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadCustomer = {};
    before(() => {
      sinon.stub(CustomerModel, 'create')
        .resolves(false);
    });

    // Restaurar a função `create` original após os testes.
    after(() => {
      CustomerModel.create.restore();
    });

    it('Retorna um boolean que contém "false"', async () => {
      const response = await CustomerModelService.registerCustomer(payloadCustomer);
      expect(response).to.be.equal(false);
    });
  });

  describe('quando é inserido com sucesso', () => {
    const payloadCustomer = {
      name: 'Ricardo Kishine',
      username: 'kishinin',
      password: 'kiki7894123',
      birthdate: '25/04/63',
      address: 'Rua Pedrin Carnela',
      addressNumber: '1590',
      primaryPhone: '51995676666',
      description: 'Um bom amigo para todos',
    };

    before(async () => {
      sinon.stub(CustomerModel, 'create')
        .resolves({ id: '619a4be1565d8cda99c098a9' });
    });

    it('retorna um objeto e tal objeto possui o "token" do novo Customer inserido', async () => {
      const response = await CustomerModelService.registerCustomer(payloadCustomer);

      expect(response).to.have.a.property('token');
    });
  });
});
