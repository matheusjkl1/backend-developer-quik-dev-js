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
      name: 'Carlos Adalberto',
      username: 'adalshow',
      password: 'carlinhos1516',
      birthdate: '02/10/88',
      address: 'Rua Juazeiro',
      addressNumber: '1596',
      primaryPhone: '11998667888',
      description: 'Sou um cara amante de coisas legais e isso ai.',
    };

    before(async () => {
      sinon.stub(CustomerModel, 'create')
        .resolves(payloadCustomer);
    });
    it('retorna um objeto e tal objeto possui o "token" do novo Customer inserido', async () => {
      const response = await CustomerModelService.registerCustomer(payloadCustomer);

      expect(response).to.have.a.property('token');
    });
  });
});
