const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Received token in middleware:', token);
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.userId = decoded.id; // Use 'id' from token payload instead of 'userId'
    if (!req.userId) {
      console.log('id is undefined in token payload');
      return res.status(401).json({ success: false, message: 'Invalid token: id not found in payload' });
    }
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ success: false, message: 'Invalid token: ' + error.message });
  }
};

module.exports = authMiddleware;