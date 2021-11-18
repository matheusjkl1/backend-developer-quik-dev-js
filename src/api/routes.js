const Router = require('express');
const { Register, FindAllCostumers } = require('../controllers/CustomerController');

const routes = Router();

// Rota criada apenas para visualização dos dados.
routes.get('/', FindAllCostumers);

routes.post('/', Register);

routes.put('/', (req, res) => res.status(200).send(req.body));

routes.delete('/', (req, res) => res.status(200).send(req.body));

module.exports = routes;
