import User from "@/models/User";
import connectDb from "@/middleware/mongooseDb";

export default async function handelGetProducts(req, res) {

    connectDb();
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user details' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
