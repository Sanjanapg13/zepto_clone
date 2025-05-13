const express = require('express');
const router = express.Router();
const cartController = require('../contoller/cartController');
const cartMiddleware = require('../middleware/cartMiddleware');

// Apply authMiddleware to all cart routes
router.use(cartMiddleware);

// Cart routes
router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/remove', cartController.removeFromCart);
router.post('/clear', cartController.clearCart);

module.exports = router;