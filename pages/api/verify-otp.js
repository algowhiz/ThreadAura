// pages/api/verify-otp.js
import Otp from '@/models/Otp';
import connectDb from "@/middleware/mongooseDb"; 

export default async function verifyOTP(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  await connectDb();

  try {
    const otpDoc = await Otp.findOne({ email });
    if (!otpDoc) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }
    if (otpDoc.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    await Otp.deleteOne({ email });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
}
