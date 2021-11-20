const { expect } = require('chai');
const sinon = require('sinon');
const md5 = require('md5');

const CustomerModel = require('../../src/models/CustomerModel');
const CustomerService = require('../../src/services/customerService');

describe('Camada de Service - Loga um Customer ja registrado no Banco de dados', () => {
  describe('quando os dados não são válidos', () => {
    const payloadCustomer = {};

    before(() => {
      sinon.stub(CustomerModel, 'findUser')
        .resolves(null, null);
    });

    // Restauraremos a função `findUser` original após os testes.
    after(() => {
      CustomerModel.findUser.restore();
    });
    it('retorna um erro', async () => {
      const response = await CustomerService.loginCustomer({
        username: payloadCustomer.username, password: payloadCustomer.password,
      });
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('error');
    });
  });
  describe('quando os dados são válidos', () => {
    const payloadCustomer = {
      name: 'Carlos Adalberto',
      username: 'adalshow',
      password: md5('carlinhos1516'),
      birthdate: '02/10/88',
      address: 'Rua Juazeiro',
      addressNumber: '1596',
      primaryPhone: '99-9866-7888',
      description: 'Sou um cara amante de coisas legais e isso ai.',
    };

    const passwordNotEncrypt = 'carlinhos1516';

    before(() => {
      sinon.stub(CustomerModel, 'create')
        .resolves(payloadCustomer);
      sinon.stub(CustomerModel, 'findUser')
        .resolves({ username: payloadCustomer.username, password: passwordNotEncrypt });
    });

    // Restauraremos a função `findUser` original após os testes.
    after(() => {
      CustomerModel.findUser.restore();
      CustomerModel.create.restore();
    });

    it('retorna um token', async () => {
      await CustomerService.registerCustomer(payloadCustomer);
      const response = await CustomerService.loginCustomer({
        username: payloadCustomer.username, password: passwordNotEncrypt,
      });
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('token');
    });
  });
});
