import jwt from 'jsonwebtoken';
import User from "@/models/User";
import DeliveryBoy from "@/models/DeliveryBoy";
import connectDb from "@/middleware/mongooseDb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ isValid: false, message: "Token not provided" });
        }

        try {
            // Decode the token to get the user ID
            const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
            const userId = decoded?.id;

            await connectDb();

            // Check if user is a regular user
            const user = await User.findById(userId);
            if (user) {
                const isAdmin = user.isAdmin || false;
                return res.status(200).json({ isValid: true, isAdmin, userId, role: 'user' });
            }

            // Check if user is a delivery boy
            const deliveryBoy = await DeliveryBoy.findById(userId);
            if (deliveryBoy) {
                return res.status(200).json({ isValid: true, isAdmin: false, userId, role: 'deliveryBoy' });
            }

            return res.status(404).json({ isValid: false, message: "User not found" });
        } catch (err) {
            console.error("Error validating token", err);
            return res.status(401).json({ isValid: false, message: "Invalid or expired token" });
        }
    } else {
        return res.status(405).json({ isValid: false, message: "Invalid request method" });
    }
}
