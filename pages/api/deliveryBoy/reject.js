import connectDb from "@/middleware/mongooseDb";
import DeliveryBoy from '@/models/DeliveryBoy';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { orderId, deliveryBoyId } = req.body;        
        await connectDb(); 

        try {
            const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId);

            if (!deliveryBoy) {
                return res.status(404).json({ message: 'Delivery boy not found' });
            }

           
            deliveryBoy.assignedOrders = deliveryBoy.assignedOrders.filter(id => id.toString() !== orderId);
            await deliveryBoy.save();

           
            res.status(200).json({ message: 'Order removed from stack' });
        } catch (error) {
            console.error('Error removing order', error);
            res.status(500).json({ message: 'Server error' });
        }
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
