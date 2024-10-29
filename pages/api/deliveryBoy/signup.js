import DeliveryBoy from "@/models/DeliveryBoy";
import PinCode from "@/models/PinCode";
import connectDb from "@/middleware/mongooseDb";
import CryptoJS from "crypto-js";

export default async function handelSignUp(req, res) {
  await connectDb();

  if (req.method === 'POST') {
    const { name, email, phoneNumber, password, pinCode } = req.body; // Make sure to use pinCode here
    console.log(pinCode); // Log to check the value being received

    try {
      // Check if email or phone number already exists
      const existingUser = await DeliveryBoy.findOne({ email });
      const existingPhoneNumber = await DeliveryBoy.findOne({ phoneNumber });

      if (existingUser) {
        return res.status(400).json({ message: "Email already taken" });
      }
      if (existingPhoneNumber) {
        return res.status(400).json({ message: "Phone number already taken" });
      }

      // Create new DeliveryBoy with pinCode
      const newDeliveryBoy = new DeliveryBoy({
        name,
        email,
        phoneNumber,
        password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
        pinCode, // Ensure you are using pinCode here
      });
      await newDeliveryBoy.save();

      // Add delivery boy to the pin code in the database
      const pinCodeEntry = await PinCode.findOne({ pinCode }); // Make sure to search with the correct field name
      if (pinCodeEntry) {
        pinCodeEntry.deliveryBoys.push(newDeliveryBoy._id);
        await pinCodeEntry.save();
      } else {
        const newPinCode = new PinCode({
          pinCode, // Use pinCode here as well
          deliveryBoys: [newDeliveryBoy._id],
        });
        await newPinCode.save();
      }

      return res.status(200).json({ message: "User created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }
}
