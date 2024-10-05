import User from "@/models/User";
import connectDb from "@/middleware/mongooseDb";
import Order from "@/models/Order";

export default async function handelGetProducts(req, res) {

    connectDb();
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const orders = await Order.find({ userId: id }); 
            const orderCnt = orders.length;

            res.status(200).json({ user, orderCnt });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user details' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
