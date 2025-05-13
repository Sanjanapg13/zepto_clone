const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware to verify token and admin role
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all vendors
router.get('/', authMiddleware, async (req, res) => {
  try {
    const vendors = await Vendor.find();
    console.log('Fetched vendors:', vendors); // Debug log
    res.json({ vendors });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a vendor and their associated products
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Delete the vendor's products
    await Product.deleteMany({ vendorId: vendor._id });
    // Delete the vendor
    await Vendor.findByIdAndDelete(req.params.id);

    res.json({ message: 'Vendor and associated products deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;