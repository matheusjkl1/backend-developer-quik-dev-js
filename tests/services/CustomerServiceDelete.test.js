const { expect } = require('chai');
const sinon = require('sinon');

const CustomerModel = require('../../src/models/CustomerModel');
const CustomerService = require('../../src/services/customerService');

describe('Camada de Service - Deleta um Customer ja registrado no Banco de dados', () => {
  describe('quando o ID não é válido', () => {
    before(() => {
      sinon.stub(CustomerModel, 'deleteCustomer')
        .resolves(null);
    });

    // Restauraremos a função `deleteCustomer` original após os testes.
    after(() => {
      CustomerModel.deleteCustomer.restore();
    });
    it('retorna um objeto', async () => {
      const response = await CustomerService.deleteCustomerById();

      expect(response).to.be.a('object');
    });
    it('o objeto possui uma chave "error" com o valor "id_invalid"', async () => {
      const response = await CustomerService.deleteCustomerById();

      expect(response).to.have.a.property('error');
    });
  });

  describe('quando o ID é válido', () => {
    before(async () => {
      sinon.stub(CustomerModel, 'deleteCustomer')
        .resolves({
          lastErrorObject: { n: 1 },
          value: {
            _id: '61992271fea4981d5ad74117',
            name: 'Joao Alberto',
            username: 'jojoalbertin',
            password: '3cc42ae4eb8b885292808cbfc5561b88',
            birthdate: '25/04/63',
            address: 'Rua Pedrin Carnela',
            addressNumber: '1590',
            primaryPhone: '(55) 99567-6666',
            description: 'Um bom amigo para todos',
            createdAt: '2021-11-20T16:29:37.775Z',
          },
          ok: 1,
        });
    });

    // Restauraremos a função `deleteCustomer` original após os testes.
    after(() => {
      CustomerModel.deleteCustomer.restore();
    });

    it('retorna um objeto', async () => {
      const ID_EXAMPLE = '61992271fea4981d5ad74117';

      const response = await CustomerService.deleteCustomerById(ID_EXAMPLE);

      expect(response).to.be.a('object');
    });

    it('retorna um objeto possui uma chave message com o valor "successfully_deleted"', async () => {
      const ID_EXAMPLE = '61992271fea4981d5ad74117';
      const response = await CustomerService.deleteCustomerById(ID_EXAMPLE);

      expect(response).to.have.a.property('message');
    });
  });
});
