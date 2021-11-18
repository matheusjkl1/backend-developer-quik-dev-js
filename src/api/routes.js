const Router = require('express');
const { Register } = require('../controllers/CustomerController');

const routes = Router();

routes.get('/', (_req, res) => res.send('Oi'));

routes.post('/', Register);

routes.put('/', (req, res) => res.status(200).send(req.body));

routes.delete('/', (req, res) => res.status(200).send(req.body));

module.exports = routes;
