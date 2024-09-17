import User from "@/models/User";
import connectDb from "@/middleware/mongooseDb";
const  CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

export default async function handelLogin(req, res) {
  await connectDb();

  if (req.method === 'POST') {
    const {  email, password } = req.body;

    try {
    
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).json({ message: "User not find" });
      }

      // Create a new user
      const  bytes  = CryptoJS.AES.decrypt(existingUser.password, process.env.SECRET_KEY);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      console.log(originalText);
      console.log(password);
      
      if(existingUser.email == email && originalText == password){

        //JWT token
        const  token = jwt.sign({ id:existingUser._id }, process.env.JSON_SECRET_KEY,{expiresIn:'2d'});

        return res.status(200).json({ message: "Login successfully done" , token:token , _id:existingUser._id});
      }
      else 
        return res.status(400).json({ message: "Invalid credentials" });
      
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ message: "Bad Request !! Try again" });
  }
}
