const Product = require('../models/product');

const products = [
  {
    name: 'iPhone 1000',
    description: 'Future of AI-phones',
    image: 'https://content1.rozetka.com.ua/goods/images/big/284920852.jpg',
    price: 1700,
  },
  {
    name: 'Google Pixel XR34',
    description: 'New view of AI',
    image:
      'https://fedox.com.ua/content/images/33/480x480l50nn0/smartfon-google-pixel-4xl-64gb-just-black-original-88777527352157.png',
    price: 1500,
  },
  {
    name: 'Lenovo X55',
    description: 'The AI-phone that do your calls for you',
    image: 'https://content1.rozetka.com.ua/goods/images/big/310648275.jpg',
    price: 1250,
  },
];

module.exports = async () => {
  if (await Product.find().count()) return;

  await Product.bulkSave(products.map((product) => new Product(product)));
};
