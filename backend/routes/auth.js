

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Vendor = require('../models/Vendor');
const OTP = require('../models/OTP');
const sendOTPSMS = require('../utils/sendOTPSMS');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');

router.get('/Register', (req, res) => {
    res.sendFile(path.join(__dirname, '../login', 'Login.js'));
});

// Serve registration page
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

// Temporary in-memory storage for OTP pending registrations
const pendingRegistrations = new Map();

// Register route
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, contactNumber, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!['user', 'admin', 'vendor'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        let Model;
        if (role === 'user') Model = User;
        else if (role === 'admin') Model = Admin;
        else Model = Vendor;

        const userExists = await Model.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} already exists` });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Generated OTP:', otp);

        const otpEntry = new OTP({ phone: contactNumber, otp, role });
        await otpEntry.save();

        const otpSent = await sendOTPSMS(contactNumber, otp);
        if (!otpSent) {
            return res.status(500).json({ success: false, message: 'Failed to send OTP' });
        }

        const registrationId = crypto.randomBytes(16).toString('hex');
        pendingRegistrations.set(registrationId, { firstName, lastName, email, contactNumber, password, role });

        res.status(200).json({ success: true, registrationId, message: 'OTP sent to your phone number' });
    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
});

// OTP verification
router.post('/verify-otp', async (req, res) => {
    const { registrationId, otp } = req.body;

    const userData = pendingRegistrations.get(registrationId);
    if (!userData) {
        return res.status(400).json({ message: 'Invalid registration session' });
    }

    try {
        const otpEntry = await OTP.findOne({
            phone: userData.contactNumber,
            otp,
            role: userData.role,
            createdAt: { $gt: new Date(Date.now() - 5 * 60 * 1000) } // OTP valid for 5 minutes
        }).sort({ createdAt: -1 });

        if (!otpEntry) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        let Model;
        if (userData.role === 'user') Model = User;
        else if (userData.role === 'admin') Model = Admin;
        else Model = Vendor;

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = new Model({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            contactNumber: userData.contactNumber,
            password: hashedPassword,
        });
        await user.save();

        pendingRegistrations.delete(registrationId);
        await OTP.deleteOne({ _id: otpEntry._id });

        res.status(201).json({
            success: true,
            message: `${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} registered successfully`
        });
    } catch (err) {
        console.error('OTP Verification Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    if (!['user', 'admin', 'vendor'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        let Model;
        if (role === 'user') Model = User;
        else if (role === 'admin') Model = Admin;
        else Model = Vendor;

        const user = await Model.findOne({ email });
        if (!user) {
            console.log(`User not found in ${role} collection: ${email}`);
            return res.status(400).json({ message: 'Invalid credentials (email not found)' });
        }

        // Check if matchPassword method exists, otherwise use bcrypt.compare directly
        let isMatch;
        if (typeof user.matchPassword === 'function') {
            isMatch = await user.matchPassword(password);
        } else {
            isMatch = await bcrypt.compare(password, user.password);
        }

        if (!isMatch) {
            console.log(`Password mismatch for ${email} in ${role} collection`);
            return res.status(400).json({ message: 'Invalid credentials (incorrect password)' });
        }

        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.firstName || user.name,
                email: user.email,
                role: role,
                contactNumber: user.contactNumber || '', // Include for consistency
            },
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Fetch all users
router.get('/user', async (req, res) => {
    try {
        const users = await User.find({}, '-password -resetToken -resetTokenExpiry');
        res.status(200).json({ success: true, users });
    } catch (err) {
        console.error('Fetch Users Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/profile', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
      let Model;
      if (decoded.role === 'user') Model = User;
      else if (decoded.role === 'admin') Model = Admin;
      else if (decoded.role === 'vendor') Model = Vendor;
      else {
        return res.status(400).json({ success: false, message: 'Invalid role in token' });
      }

      const user = await Model.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.json({
        success: true,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          contactNumber: user.contactNumber || '',
        },
        role: decoded.role,
      });
    } catch (error) {
      console.error('Profile fetch error:', error);
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
});

// Serve forgot password page
router.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'forgot-password.html'));
});

// Forgot password functionality
router.post('/forgot-password', async (req, res) => {
    const { email, role } = req.body;

    if (!['user', 'admin', 'vendor'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        let Model;
        if (role === 'user') Model = User;
        else if (role === 'admin') Model = Admin;
        else Model = Vendor;

        const user = await Model.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email not found' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const resetLink = `http://localhost:${process.env.PORT}/reset-password/${resetToken}`;
        await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset',
            text: `Click here to reset your password: ${resetLink}`,
        });

        res.status(200).json({ success: true, message: 'Password reset link sent to email' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Reset password functionality
router.post('/reset-password', async (req, res) => {
    const { newPassword, token, role } = req.body;

    if (!['user', 'admin', 'vendor'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        let Model;
        if (role === 'user') Model = User;
        else if (role === 'admin') Model = Admin;
        else Model = Vendor;

        const user = await Model.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;