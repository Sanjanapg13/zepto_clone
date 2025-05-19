

const express = require('express');
const router = express.Router();
const productController = require('../contoller/productController');

// Routes for products
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;