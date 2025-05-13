

// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const Order = require('../models/Order');

// // Middleware to verify admin role
// const verifyAdmin = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== 'admin') {
//       return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
//     }
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error('Token verification failed:', err);
//     res.status(401).json({ success: false, message: 'Invalid token' });
//   }
// };

// // Fetch all orders (for admin)
// router.get('/', verifyAdmin, async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 }).lean();
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error('Error fetching all orders:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
//   }
// });

// // Fetch all orders for the logged-in user
// router.get('/user', async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.id;

//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.json({ success: true, orders });
//   } catch (err) {
//     console.error('Error fetching orders:', err);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const Product = require('../models/Product'); // Import Product model to fetch vendor's products

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Middleware to verify authenticated user (for vendors)
const verifyUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Fetch all orders (for admin)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
});

// Fetch orders for the logged-in vendor (only orders containing their products)
router.get('/vendor', verifyUser, async (req, res) => {
  try {
    const vendorId = req.user.id;

    // Fetch the vendor's products
    const vendorProducts = await Product.find({ vendorId }).lean();
    if (!vendorProducts || vendorProducts.length === 0) {
      return res.json({ success: true, orders: [] }); // No products, so no orders
    }

    // Get the IDs of the vendor's products
    const productIds = vendorProducts.map(product => product._id);

    // Fetch orders that contain any of the vendor's products
    const orders = await Order.find({
      'items.productId._id': { $in: productIds },
    }).sort({ createdAt: -1 }).lean();

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching vendor orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
});

// Fetch all orders for the logged-in user
router.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;