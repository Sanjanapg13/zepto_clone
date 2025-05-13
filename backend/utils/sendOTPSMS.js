const sendOTPSMS = async (phone, otp) => {
  try {
    // Simulate sending OTP by logging to console
    console.log(`Simulated OTP for ${phone}: ${otp}`);
    // In a real app, this would send an SMS via a service like Fast2SMS
    return true;
  } catch (error) {
    console.error('Simulated OTP error:', error);
    throw new Error('Failed to simulate OTP');
  }
};

module.exports = sendOTPSMS;