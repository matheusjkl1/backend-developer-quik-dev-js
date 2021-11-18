const sinon = require('sinon');
const { expect } = require('chai');
const { Register } = require('../../src/controllers/CustomerController')
const CustomerService  = require('../../src/services/customerService')

describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};
    const next = () => '';

    before(() => {
      request.body = {};
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
        sinon.stub(CustomerService, 'registerCustomer')
        .resolves(false);
    })
  
    after(() => {
      CustomerService.registerCustomer.restore();
    });
  
    it('é chamado o status com o código 400', async () => {
      await Register(request, response, next);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "error when registering"', async () => {
      await Register(request, response, next);

      expect(response.json.calledWith({ message: 'error when registering' })).to.be.equal(true);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};
    const next = () => '';

    before(() => {
      request.body = {
        name: "Carlos Adalberto",
        username:"adalshow",
        password:"carlinhos1516",
        birthdate: "02/10/88",
        address: "Rua Juazeiro",
        addressNumber: "1596",
        primaryPhone: "99-9866-7888",
        description: "Sou um cara amante de coisas legais e isso ai.",
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      
      sinon.stub(CustomerService, 'registerCustomer')
      .resolves(false);
    })

    after(() => {
      CustomerService.registerCustomer.restore();
    });


    it('é chamado o status com o código 201', async () => {
      await Register(request, response, next);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Filme criado com sucesso!"', async () => {
      await Register(request, response, next);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

  });
});