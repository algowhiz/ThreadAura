import connectDb from "@/middleware/mongooseDb"; // Adjust the path based on your project structure
import Order from "@/models/Order";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Ensure database connection is established
      await connectDb();

      const { id } = req.body;

      // Fetch order and populate the product details
      const order = await Order.find({userId:id})
        .populate({
          path: 'products.productId',  // Field to populate
          select: 'title price img'    // Fields from the Product schema
        })
        .exec();  // Ensure query execution

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error(error);  // Log error for debugging
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
