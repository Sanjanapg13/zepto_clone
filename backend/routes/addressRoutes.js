const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/addressMiddleware');
const Address = require('../models/Address');
const User = require('../models/User');

// Get user address
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching address for userId:', req.userId);
    const address = await Address.findOne({ userId: req.userId });
    if (!address) {
      console.log('Address not found for userId:', req.userId);
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    res.status(200).json({ success: true, address });
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ success: false, message: 'Error fetching address: ' + error.message });
  }
});

// Create or update user address
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('Saving address for userId:', req.userId);
    console.log('Request body:', req.body);
    const { street, city, state, pinCode } = req.body;

    // Validate address fields
    if (!street || !city || !state || !pinCode) {
      console.log('Validation failed: Missing fields');
      return res.status(400).json({ success: false, message: 'All address fields are required' });
    }

    // Validate street (must contain letters and numbers)
    const hasLetters = /[a-zA-Z]/.test(street);
    const hasNumbers = /\d/.test(street);
    if (!hasLetters || !hasNumbers) {
      console.log('Validation failed: Street must contain letters and numbers');
      return res.status(400).json({ success: false, message: 'Street address must contain both letters and numbers' });
    }

    // Validate pin code (must be 6 digits)
    if (!/^\d{6}$/.test(pinCode)) {
      console.log('Validation failed: Invalid pin code');
      return res.status(400).json({ success: false, message: 'Pin code must be exactly 6 digits' });
    }

    // Fetch user to get their name
    console.log('Fetching user with ID:', req.userId);
    const user = await User.findById(req.userId);
    if (!user) {
      console.log('User not found for userId:', req.userId);
      return res.status(404).json({ success: false, message: `User not found for ID: ${req.userId}` });
    }

    // Check if address already exists for the user
    console.log('Checking existing address for userId:', req.userId);
    let address = await Address.findOne({ userId: req.userId });
    if (address) {
      console.log('Updating existing address');
      // Update existing address
      address.street = street;
      address.city = city;
      address.state = state;
      address.pinCode = pinCode;
    } else {
      console.log('Creating new address');
      // Create new address
      address = new Address({
        userId: req.userId,
        street,
        city,
        state,
        pinCode,
      });
    }

    console.log('Saving address to database');
    await address.save();
    console.log('Address saved successfully');

    res.status(200).json({ success: true, address, userName: `${user.firstName} ${user.lastName}` });
  } catch (error) {
    console.error('Error saving address:', error);
    res.status(500).json({ success: false, message: 'Error saving address: ' + error.message });
  }
});

module.exports = router;