const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {validator} = require('./../middleware/validation');
const {authenticate} = require('./../middleware/authenticate');
const order = require('./../database/orderDatabase')

router.put('/updateOrder/:id',order.updateOrder);



module.exports = router