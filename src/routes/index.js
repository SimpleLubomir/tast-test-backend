const { Router } = require('express');

const cart = require('./cart');
const product = require('./product');

const router = new Router();
router.use('/cart', cart);
router.use('/product', product);

module.exports = router;
