import User from "@/models/User";
import connectDb from "@/middleware/mongooseDb";

export default async function handelUpdateUser(req, res) {
    await connectDb();

    const { userId, name, email, address, phone, city, state, pincode } = req.body;

    if (req.method === 'POST') {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { name, email, address, phone, city, state, pincode },
                { new: true } 
            ).select('-password -createdAt -updatedAt'); 
       
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(user); 
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Invalid request method" });
    }
}
