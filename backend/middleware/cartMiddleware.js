

const jwt = require('jsonwebtoken');

const cartMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received token:', token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.userId = decoded.id; // Extract the 'id' field from the token payload
    req.userRole = decoded.role; // Extract the 'role' field from the token payload
    if (!req.userId) {
      console.log('No userId found in token payload');
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    if (!req.userRole) {
      console.log('No role found in token payload');
      return res.status(401).json({ message: 'Invalid token: role not found in payload' });
    }
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = cartMiddleware;