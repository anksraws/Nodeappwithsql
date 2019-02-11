const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {validator} = require('./../middleware/validation');
const {authenticate} = require('./../middleware/authenticate');
const user = require('./../database/userDatabase')

router.post('/signup',validator, user.signup);
router.post('/login',validator, user.login );
router.get('/details',authenticate, user.details);
router.post('/order',authenticate, user.order);
router.put('/updateOrder/:id',order.updateOrder);

module.exports = router