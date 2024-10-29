// models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  address: {
    type: String,
    required: true,
  },
  pinCode:{
    type: String,
    require:true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDetails: {
    cardNetwork: String,
    cardDetails: String,
    transactionToken: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled','Dispatch'],
    default: 'Pending',
  },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
