

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const vendorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contactNumber: String,
    password: String,
    resetToken: String,
    resetTokenExpiry: Date,
});

vendorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Vendor', vendorSchema);