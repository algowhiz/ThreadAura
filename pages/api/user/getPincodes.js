import PinCode from "@/models/PinCode";
import connectDb from "@/middleware/mongooseDb";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Connect to the database
            await connectDb();

            // Fetch all pincodes, returning only the `pinCode` field
            const pincodes = await PinCode.find({}, { pinCode: 1, _id: 0 });
            
            // Respond with the array of pin codes
            res.status(200).json(pincodes.map(item => item.pinCode));
        } catch (error) {
            console.error("Error fetching pincodes:", error);
            res.status(500).json({ message: "Error fetching pincodes" });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
