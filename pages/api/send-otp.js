import nodemailer from 'nodemailer';
import Otp from '@/models/Otp';
import connectDb from "@/middleware/mongooseDb";
import User from "@/models/User";
import DeliveryBoy from "@/models/DeliveryBoy";

// Function to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export default async function sendOTP(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { email, isDeliveryBoy, isOrderConfirmation } = req.body;

  // Validate input
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  await connectDb();

  try {
    // Check if the email already exists based on user type
    let existingUser;
    if (isDeliveryBoy === "true") {
      existingUser = await DeliveryBoy.findOne({ email });
    } else if(isDeliveryBoy === "false"){
      existingUser = await User.findOne({ email });
    }

    // If an existing user is found, return an error
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    // Generate and save OTP
    const otp = generateOTP();

    // Store OTP
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Setup nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Determine the email subject and message based on the request
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: isOrderConfirmation === "true" ? 'Your OTP for Order Confirmation' : 'Your OTP for Verification',
      text: `Your OTP is: ${otp}`,
    };

    // Send OTP email
    await transporter.sendMail(mailOptions);
    
    // Return success message
    return res.status(200).json({ message: `OTP sent successfully for ${isOrderConfirmation === "true" ? 'order confirmation' : 'verification'}` });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Failed to process the request' });
  }
}
