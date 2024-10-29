// models/otpModel.js

import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures one OTP per email at a time
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // OTP will expire after 5 minutes (300 seconds)
  },
});

export default mongoose.models.OTP || mongoose.model('OTP', otpSchema);
