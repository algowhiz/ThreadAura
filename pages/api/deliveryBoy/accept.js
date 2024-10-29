import connectDb from "@/middleware/mongooseDb";
import DeliveryBoy from '@/models/DeliveryBoy';
import Order from '@/models/Order';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { orderId, deliveryBoyId } = req.body;
        console.log(orderId);
        
        await connectDb(); 

        try {
            const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId);

            if (!deliveryBoy) {
                return res.status(404).json({ message: 'Delivery boy not found' });
            }

            deliveryBoy.acceptedOrders.push(orderId);
            deliveryBoy.assignedOrders = deliveryBoy.assignedOrders.filter(id => id.toString() !== orderId);
            await deliveryBoy.save();
            
            await DeliveryBoy.updateMany(
                { _id: { $ne: deliveryBoyId } }, 
                { $pull: { assignedOrders: orderId } } 
            );

            const orderInfo = await Order.findById(orderId);            
            orderInfo.status="Dispatch";

            await orderInfo.save();

            res.status(200).json({ message: 'Order accepted and removed from other delivery boys' });
        } catch (error) {
            console.error('Error accepting order', error);
            res.status(500).json({ message: 'Server error' });
        }
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
