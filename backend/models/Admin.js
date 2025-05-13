// const mongoose = require('mongoose');

// const adminSchema = new mongoose.Schema({
//   phone: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   role: { type: String, enum: ['user', 'vendor', 'admin'], default: 'admin' },
//   otp: { type: String },
//   otpExpires: { type: Date },
//   token: { type: String }
// }, { collection: 'admins' });

// module.exports = mongoose.model('Admin', adminSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contactNumber: String,
    password: String,
    resetToken: String,
    resetTokenExpiry: Date,
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);