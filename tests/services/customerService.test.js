const { expect } = require('chai');

const { registerCustomer } = require('../../src/services/customerService')

describe('Camada de Service - Insere um novo Customer no BD', () => {

  describe('quando o payload informado não é válido', () => {
    const payloadCustomer = {};

    it('retorna um boolean', async () => {
      const response = await registerCustomer(payloadCustomer);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await registerCustomer(payloadCustomer);
      expect(response).to.be.equal(false);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const payloadCustomer = {
      name: "Carlos Adalberto",
      username:"adalshow",
      password:"carlinhos1516",
      birthdate: "02/10/88",
      address: "Rua Juazeiro",
      addressNumber: "1596",
      primaryPhone: "99-9866-7888",
      description: "Sou um cara amante de coisas legais e isso ai.",
    };

    it('retorna um objeto', async () => {
      const response = await registerCustomer(payloadCustomer);
      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo Customer inserido', async () => {
      const response = await registerCustomer(payloadCustomer);
      expect(response).to.have.a.property('createdAt');
    });

  });
});