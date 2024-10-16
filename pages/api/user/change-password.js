const CryptoJS = require('crypto-js');
import User from "@/models/User";
import connectDb from "@/middleware/mongooseDb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { userId, currentPassword, newPassword } = req.body;
  
      try {
        await connectDb();
  
        const user = await User.findById(userId);
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        
        if (decryptedPassword !== currentPassword) {
          return res.status(400).json({ message: 'Incorrect current password' });
        }
  
        const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, process.env.SECRET_KEY).toString();
  
        user.password = encryptedNewPassword;
        await user.save();
  
        res.status(200).json({ message: 'Password changed successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
