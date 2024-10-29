// /api/pincode/checkPincode.js

import connectDb from "@/middleware/mongooseDb";
import PinCode from "@/models/PinCode";


export default async function checkPincode(req, res) {
  await connectDb();

  if (req.method === 'POST') {
    const { pincode } = req.body;

    if (!pincode) {
      return res.status(400).json({ message: 'Pincode is required' });
    }

    // Check if the pincode exists in either the hardcoded list or the database
    const pinCodeEntry = await PinCode.findOne({ pinCode: pincode });

    if (pinCodeEntry) {
      return res.status(200).json({ available: true, message: 'Pincode is available for delivery' });
    } else {
      return res.status(200).json({ available: false, message: 'Pincode not supported' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
