const express = require('express');
const { checkSchema } = require('express-validator');
const createError = require('http-errors');
const {
  Types: { ObjectId },
} = require('mongoose');
const { Cart, Product } = require('../models');
const {
  cart: { changeInCart, addToCart },
} = require('../schemas');
const { validation } = require('../middlewares');

const router = express.Router();

const pattern = '/:cartID([a-zA-Z0-9-]+)';

router.get('/', async (req, res) => {
  const { id: userId } = req.session;

  res.success(await Cart.find({ userId }).populate('product'));
});

router.post('/', validation(checkSchema(addToCart)), async (req, res) => {
  const { id: userId } = req.session;
  console.log(userId);
  const { quantity, productId } = req.validated.body;

  const product = await Product.findOne({ _id: new ObjectId(productId) });
  if (!product) {
    throw createError(404, 'Product Not Found');
  }

  const cart = await Cart.findOne({
    userId,
    product: new ObjectId(productId),
  });

  if (cart) {
    throw createError(409, 'Cart already exists');
  }
  const newCart = new Cart({
    userId,
    product: new ObjectId(productId),
    quantity: parseInt(quantity, 10),
  });

  await newCart.save();
  await newCart.populate('product');

  res.success(newCart, { status: 201 });
});

router.get(pattern, async (req, res) => {
  const { id: userId } = req.session;
  console.log(userId);
  const { cartID } = req.params;

  const cart = await Cart.findOne({ _id: new ObjectId(cartID), userId });

  if (!cart) {
    throw createError(404, 'Cart Not Found');
  }

  res.success(cart);
});

const updateHandler = async (req, res) => {
  const { id: userId } = req.session;
  console.log(userId);
  const { cartID } = req.params;
  const { quantity } = req.validated.body;
  const cart = await Cart.findOne({ _id: new ObjectId(cartID), userId });

  if (!cart) {
    throw createError(404, 'Cart Not Found');
  }

  cart.quantity = quantity;
  res.success(await cart.save());
};

router.put(pattern, validation(checkSchema(changeInCart)), updateHandler);
router.patch(pattern, validation(checkSchema(changeInCart)), updateHandler);
router.delete(pattern, async (req, res) => {
  const { id: userId } = req.session;
  console.log(userId);

  const { cartID } = req.params;
  const cart = await Cart.findOne({
    _id: new ObjectId(cartID),
    userId,
  }).populate('product');

  if (!cart) {
    throw createError(404, 'Cart Not Found');
  }

  res.success(await cart.deleteOne());
});

router.post('/purchase', async (req, res) => {
  const { id: userId } = req.session;
  const cart = await Cart.find({ userId });

  if (!cart.length) {
    throw createError(400, 'Nothing to fulfill');
  }

  await Cart.deleteMany({
    _id: { $in: cart.map(({ _id: id }) => new ObjectId(id)) },
  });

  res.success(null, { message: 'Order fulfilled successfully' });
});

module.exports = router;
