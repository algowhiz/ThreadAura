import DeliveryBoy from "@/models/DeliveryBoy";
import Order from "@/models/Order";
import connectDb from "@/middleware/mongooseDb";

export default async function handler(req, res) {
    await connectDb(); // Ensure the database is connected

    if (req.method === 'PUT') {
        const { deliveryBoyId, orderId } = req.body; 
        console.log(orderId);
        
        try {
            const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId);

            if (!deliveryBoy) {
                return res.status(404).json({ message: 'Delivery Boy not found' });
            }

            // Check if the orderId is in acceptedOrders
            if (!deliveryBoy.acceptedOrders.includes(orderId)) {
                return res.status(400).json({ message: 'Order not found in accepted orders' });
            }

            // Ensure orderCompleted is initialized
            if (!deliveryBoy.orderCompleted) {
                deliveryBoy.orderCompleted = [];
            }

            // Add orderId to orderCompleted and pull it from acceptedOrders
            deliveryBoy.orderCompleted.push(orderId);
            deliveryBoy.acceptedOrders.pull(orderId);

            await deliveryBoy.save();

            const orderInfo = await Order.findById(orderId);
            
            orderInfo.status="Completed";

            await orderInfo.save();

            return res.status(200).json({ message: 'Order marked as completed', deliveryBoy });
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
