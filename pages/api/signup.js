import User from "@/models/User";
import connectDb from "@/middleware/mongooseDb";
const  CryptoJS = require("crypto-js");

export default async function handelSignUp(req, res) {
  await connectDb();

  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
    
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Email already taken" });
      }

      // Create a new user
      const createUser = new User({
        name,
        email,
        password:CryptoJS.AES.encrypt(password,process.env.SECRET_KEY).toString(),
      });

      await createUser.save();

      return res.status(200).json({ message: "User created" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }
}
