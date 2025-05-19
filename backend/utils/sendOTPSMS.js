
const sendOTPSMS = async (phone, otp) => {
  try {
    // Simulate sending OTP (no logging needed since OTP is sent to frontend)
    return true;
  } catch (error) {
    console.error('Simulated OTP error:', error);
    throw new Error('Failed to simulate OTP');
  }
};

module.exports = sendOTPSMS;
