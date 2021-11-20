const Router = require('express');
const {
  RegisterCustomer, LoginCustomer, UpdateCostumer, FindCostumerById, DeleteCostumer,
} = require('../controllers/CustomerController');
const validateJwt = require('../middlewares/validateJwt');

const routes = Router();

routes.get('/:id', FindCostumerById);

routes.post('/login', LoginCustomer);

routes.post('/register', RegisterCustomer);

routes.put('/update', validateJwt, UpdateCostumer);

routes.delete('/delete/:id', validateJwt, DeleteCostumer);

module.exports = routes;
