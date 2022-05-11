const router = require('express').Router();
const { buy_gas } = require('../controllers');

router.post('/buy-gas', buy_gas);

module.exports = router;
