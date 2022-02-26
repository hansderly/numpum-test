const route = require('express').Router();
const { buy_gas } = require('../controllers');

route.post('/buy-gas', buy_gas);

module.exports = route;
