const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      localField: 'productId',
    },
    quantity: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        const id = ret._id;
        delete ret._id;
        delete ret.__v;

        return {
          id,
          ...ret,
        };
      },
    },
  }
);

module.exports = mongoose.model('Cart', cartSchema);
