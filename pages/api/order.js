import connectDb from "@/middleware/mongooseDb";
import Order from '@/models/Order';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDb();
    try {
      // Extract order data from the request body
      const { userId, orderId, products, address, amount, paymentDetails, status } = req.body;

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
