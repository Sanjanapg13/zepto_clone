
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

exports.getCart = async (req, res) => {
  try {
    console.log('Fetching cart for userId:', req.userId);
    const cart = await Cart.findOne({ userId: req.userId }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    console.log('Cart fetched:', cart);
    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  console.log('Add to cart request:', { userId: req.userId, productId, quantity });

  try {
    // Find product by string _id
    const product = await Product.findById(productId);
    if (!product) {
      console.log('Product not found in database:', productId);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product found:', product);

    // Check if user exists
    console.log('Looking for user with ID:', req.userId);
    const user = await User.findById(req.userId);
    if (!user) {
      console.log('User not found in database:', req.userId);
      return res.status(404).json({ message: 'User not found - please login again' });
    }
    console.log('User found:', user);

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = new Cart({
        userId: req.userId,
        userName: `${user.firstName} ${user.lastName}`,
        items: [],
      });
      console.log('New cart created for user:', req.userId);
    }

    // Check current quantity in cart for this product
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
    const totalRequestedQuantity = currentQuantityInCart + quantity;

    // Validate stock
    if (totalRequestedQuantity > product.stock) {
      console.log('Insufficient stock:', {
        productId,
        stock: product.stock,
        currentInCart: currentQuantityInCart,
        requested: quantity,
        totalRequested: totalRequestedQuantity,
      });
      return res.status(400).json({
        message: `Not enough stock. Only ${product.stock} items available.`,
      });
    }

    // Update cart items
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      console.log('Updated existing item in cart:', { productId, newQuantity: cart.items[itemIndex].quantity });
    } else {
      cart.items.push({ productId, quantity });
      console.log('Added new item to cart:', { productId, quantity });
    }

    // Decrease the stock
    product.stock -= quantity;
    await product.save();
    console.log('Updated product stock:', { productId, newStock: product.stock });

    cart.updatedAt = Date.now();
    await cart.save();
    console.log('Cart saved successfully:', cart);

    // Populate product details in the response
    await cart.populate('items.productId');
    res.json(cart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not in cart' });

    // Store the quantity being removed for logging
    const quantityToRemove = quantity >= cart.items[itemIndex].quantity ? cart.items[itemIndex].quantity : quantity;
    console.log('Removing from cart:', { productId, quantityToRemove });

    if (quantity >= cart.items[itemIndex].quantity) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity -= quantity;
    }

    cart.updatedAt = Date.now();
    await cart.save();

    // Populate product details in the response
    await cart.populate('items.productId');
    res.json(cart);
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Store items for logging before clearing
    const itemsToClear = [...cart.items];
    console.log('Clearing cart for userId:', req.userId, 'Items:', itemsToClear);

    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};