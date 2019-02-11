const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {validator} = require('./../middleware/validation');
const {authenticate} = require('./../middleware/authenticate');
const orders = require('./../database/orderDatabase')

router.put('/updateOrder/:id', orders.updateOrder);
router.post('/enter', authenticate, orders.enterOrder);

module.exports = router