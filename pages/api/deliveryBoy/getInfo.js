import DeliveryBoy from "@/models/DeliveryBoy";
import connectDb from "@/middleware/mongooseDb";
import Order from "@/models/Order"; 

export default async function HandlerFunction(req, res) {
    await connectDb();
    try {
        const { id } = req.body;
        const deliveryBoy = await DeliveryBoy.findById(id);
        if (!deliveryBoy) {
            return res.status(404).json({ message: 'Delivery boy not found' });
        }
        res.status(200).json(deliveryBoy);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
}
