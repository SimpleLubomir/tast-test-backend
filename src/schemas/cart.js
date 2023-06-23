const addToCart = {
  productId: {
    in: 'body',
    isString: true,
    errorMessage: 'Product is required to be added to cart',
  },
  quantity: {
    in: 'body',
    isInt: {
      options: { min: 1 },
    },
    errorMessage: 'quantity must be an integer greater than or equal to 1',
  },
};

const changeInCart = {
  quantity: {
    in: 'body',
    isInt: {
      options: { min: 1 },
    },
    errorMessage: 'quantity must be an integer greater than or equal to 1',
  },
};

module.exports = {
  addToCart,
  changeInCart,
};
