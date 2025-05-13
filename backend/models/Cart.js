

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  items: [{
    productId: { type: String, ref: 'Product', required: true }, // Changed to String to match Product _id
    quantity: { type: Number, required: true, min: 1 },
  }],
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);