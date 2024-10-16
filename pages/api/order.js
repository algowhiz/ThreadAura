import connectDb from "@/middleware/mongooseDb";
import Order from '@/models/Order';
import Product from '@/models/Product'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDb();
    try {
      const { userId, orderId, products, address, amount, paymentDetails } = req.body;

      const newOrder = new Order({
        userId,
        orderId,
        products, 
        address,
        amount,
        paymentDetails: {
          cardNetwork: paymentDetails.cardNetwork,
          cardDetails: paymentDetails.cardDetails,
          transactionToken: paymentDetails.token,
        },
        status: 'Pending', 
      });

      await newOrder.save();

      await Promise.all(
        products.map(async (item) => {
          const product = await Product.findById(item.productId);
          if (product) {
            product.soldQty += item.quantity;
            await product.save();
          }
        })
      );

      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
