import DeliveryBoy from "@/models/DeliveryBoy";
import connectDb from "@/middleware/mongooseDb";
import Order from "@/models/Order"; 

import User from '@/models/User'; // Your User model

export default async function handler(req, res) {
    await connectDb(); // Connect to the database

    if (req.method === 'POST') {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid input, please provide an array of IDs." });
        }

        try {
            // Fetch orders based on the provided IDs
            const orders = await Order.find({ _id: { $in: ids } })
                .populate('userId', 'name') // Populate user name from userId
                .select('orderId address amount  pinCode products status  userId');
            
            return res.status(200).json(orders); // Return the complete orders with payment details
        } catch (error) {
            console.error("Error fetching orders:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
