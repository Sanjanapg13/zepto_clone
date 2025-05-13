const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: true },
  role: { type: String, required: true }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

// Automatically delete documents after 5 minutes based on createdAt
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

module.exports = mongoose.model('OTP', otpSchema);
