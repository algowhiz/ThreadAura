// File: /pages/api/fetchacceptedorders.js

import DeliveryBoy from "@/models/DeliveryBoy";
import Order from "@/models/Order"; // Import the Order model
import User from "@/models/User"; // Import the User model if needed
import connectDb from "@/middleware/mongooseDb";

export default async function handler(req, res) {
    const { deliveryBoyId } = req.body;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!deliveryBoyId) {
        return res.status(400).json({ error: 'Delivery boy ID is required.' });
    }

    try {
        await connectDb();

        // Find the delivery boy by ID and populate the acceptedOrders, including userId details
        const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId).populate({
            path: 'acceptedOrders',
            select: '-paymentDetails -createdAt', // Exclude paymentDetails and createdAt
            model: Order,
            populate: {
                path: 'userId',
                select: 'name email phoneNumber', // Specify which fields of userId to include
                model: User,
            },
        });

        if (!deliveryBoy) {
            return res.status(404).json({ error: 'Delivery boy not found' });
        }

        res.status(200).json(deliveryBoy.acceptedOrders); // Return the populated orders with filtered fields
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
