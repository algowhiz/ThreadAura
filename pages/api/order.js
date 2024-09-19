import connectDb from "@/middleware/mongooseDb";
import Order from '@/models/Order';
import Product from '@/models/Product'; // Import the Product model to update soldQty

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDb();
    try {
      // Extract order data from the request body
      const { userId, orderId, products, address, amount, paymentDetails } = req.body;

      // Create the new order
      const newOrder = new Order({
        userId,
        orderId,
        products, // Array of productId and quantity
        address,
        amount,
        paymentDetails: {
          cardNetwork: paymentDetails.cardNetwork,
          cardDetails: paymentDetails.cardDetails,
          transactionToken: paymentDetails.token,
        },
        status: 'Pending', // Set the status to Paid after successful payment
      });

      // Save the new order in the database
      await newOrder.save();

      // Update soldQty for each product in the order
      await Promise.all(
        products.map(async (item) => {
          const product = await Product.findById(item.productId);
          if (product) {
            product.soldQty += item.quantity;
            await product.save();
          }
        })
      );

      // Send back a success response
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Error creating order', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
