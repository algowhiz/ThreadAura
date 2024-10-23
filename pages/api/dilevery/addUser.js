import DeliveryBoy from "@/models/DeliveryBoy";
import connectDb from "@/middleware/mongooseDb";

export default async function handelAddUser(req, res) {
  if (req.method === 'POST') {
    const { name, phoneNumber, email, password } = req.body;

    try {
      await connectDb();
      const existingBoy = await DeliveryBoy.findOne({ $or: [{ email }, { phoneNumber }] });
      if (existingBoy) {
        return res.status(400).json({ message: 'Delivery boy with this email or phone number already exists' });
      }

      const newDeliveryBoy = new DeliveryBoy({
        name,
        phoneNumber,
        email,
        password,
      });

      await newDeliveryBoy.save();

      res.status(201).json({ message: 'Delivery boy registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }else{
    return res.json({message:"Bad post request"})
  }
};

