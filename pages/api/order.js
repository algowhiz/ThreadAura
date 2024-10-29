import connectDb from "@/middleware/mongooseDb";
import Order from '@/models/Order';
import Product from '@/models/Product';
import PinCode from '@/models/PinCode';
import DeliveryBoy from '@/models/DeliveryBoy';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDb();

    try {
      const { userId, orderId, products, address, amount, paymentDetails, pincode } = req.body;

      const newOrder = new Order({
        userId,
        orderId,
        products, 
        address,
        amount,
        pinCode: pincode,
        paymentDetails: {
          cardNetwork: paymentDetails.cardNetwork,
          cardDetails: paymentDetails.cardDetails,
          transactionToken: paymentDetails.token,
        },
        status: 'Pending',
      });

      await newOrder.save();
      
      for (const item of products) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.soldQty += item.quantity;
          await product.save();
        }
      }

      const pinCodeEntry = await PinCode.findOne({ pinCode: pincode }).populate('deliveryBoys');
      if (pinCodeEntry && pinCodeEntry.deliveryBoys.length > 0) {
        const assignedDeliveryBoys = pinCodeEntry.deliveryBoys.slice(0, 3);

        for (const deliveryBoy of assignedDeliveryBoys) {
          deliveryBoy.assignedOrders.push(newOrder._id);
          await deliveryBoy.save();
        }

        newOrder.deliveryBoys = assignedDeliveryBoys.map(boy => boy._id);
        await newOrder.save();
      }

      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
