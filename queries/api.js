const express = require('express');
const bodyParser = require('body-parser');


const users = require('./../router/router.js');
const order = require('./../router/orderRouter.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', users)
app.use('/order', order)
app.listen(4000, ()=> {
	console.log('server running')
})

