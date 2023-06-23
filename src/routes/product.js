const express = require('express');
const { checkSchema } = require('express-validator');
const createError = require('http-errors');
const mongoose = require('mongoose');
const Product = require('../models/product');
const { validation } = require('../middlewares');
const { pagination } = require('../schemas/basic');

const router = express.Router();

router.get('/', validation(checkSchema(pagination)), async (req, res) => {
  const { id: userId } = req.session;

  const { page: $page = 1, perPage: $perPage = 10 } = req.validated.query;
  const page = parseInt($page, 10);
  const perPage = parseInt($perPage, 10);

  const skip = (page - 1) * perPage;

  const total = Math.max((await Product.count({ userId })) / perPage, 1);
  const items = await Product.find().skip(skip).limit(perPage);

  res.success({
    items,
    total,
    page,
    perPage,
  });
});

router.get('/:productID([a-z0-9]+)', async (req, res) => {
  const { productID } = req.params;

  const product = await Product.findOne({
    _id: new mongoose.Types.ObjectId(productID),
  });

  if (!product) {
    throw createError(404, 'Product Not Found');
  }

  res.success(product);
});

module.exports = router;
