import connectDb from "@/middleware/mongooseDb"; 
import Order from "@/models/Order";
import Product from "@/models/Product"; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDb();

      const { id } = req.body;

      const order = await Order.find({ userId: id })
        .populate({
          path: 'products.productId',
          model: 'Product',  
          select: 'title price img'
        })
        .exec(); 

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.status(200).json(order);
    } catch (error) { 
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json(`Method Get Not Allowed`);
  }
}
