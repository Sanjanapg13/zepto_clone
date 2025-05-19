


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Admin = require('./models/Admin');
const Vendor = require('./models/Vendor');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const addressRoutes = require('./routes/addressRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const orderRoutes = require('./routes/orderRoutes');

require('dotenv').config();

// Initialize app
const app = express();

// Use CORS middleware
app.use(cors());

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);

// Fetch user profile
app.get('/auth/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    let Model;
    if (decoded.role === 'user') Model = User;
    else if (decoded.role === 'admin') Model = Admin;
    else if (decoded.role === 'vendor') Model = Vendor;
    else return res.status(400).json({ success: false, message: 'Invalid role' });

    const user = await Model.findById(decoded.id).select('-password -resetToken -resetTokenExpiry');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
      },
      role: decoded.role,
    });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Enhanced route logging after all routes are mounted
console.log('Registered Routes:');
if (app._router && app._router.stack) {
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`Route: ${middleware.route.path} [${Object.keys(middleware.route.methods).join(', ')}]`);
    } else if (middleware.name === 'router' && middleware.handle.stack) {
      const pathPrefix = middleware.regexp.toString().replace(/\/\^\\\/(.*?)\\\/.*/, '$1') || '';
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          console.log(`Route: /${pathPrefix}${handler.route.path} [${Object.keys(handler.route.methods).join(', ')}]`);
        }
      });
    } else {
      console.log(`Middleware: ${middleware.name || 'unnamed'} (Path: ${middleware.regexp || 'N/A'})`);
    }
  });
} else {
  console.log('Router stack not initialized');
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/zepto_clone')
  .then(() => {
    console.log('MongoDB connected successfully');
    // Verify the database and collection
    mongoose.connection.db.listCollections({ name: 'products' })
      .next((err, collinfo) => {
        if (err) {
          console.error('Error checking products collection:', err);
        } else if (collinfo) {
          console.log('Products collection exists');
        } else {
          console.log('Products collection does not exist; it will be created on first save');
        }
      });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error in route:', req.path);
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));