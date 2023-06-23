const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
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

module.exports = mongoose.model('Product', productSchema);
