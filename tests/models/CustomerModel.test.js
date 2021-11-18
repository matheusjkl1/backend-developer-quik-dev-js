const { expect } = require('chai');
const Customer = require('../../src/models/CustomerModel');

describe('Camada de Model - Insere um novo Customer no BD', () => {

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

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await Customer.create(payloadCustomer);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo Customer inserido', async () => {
      const response = await Customer.create(payloadCustomer);

      expect(response).to.have.a.property('id');
    });

    it('deve existir um Customer com o nome cadastrado!', async () => {
      const movieCreated = await Customer.findOne({ name: payloadCustomer.name });
      expect(movieCreated).to.be.not.null;
    });
  });
});
