const mongoose = require('mongoose');

const deliveryBoySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[6-9][0-9]{9}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  assignedOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      unique:true,
    }
  ],
  acceptedOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      unique:true,
    }
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
    match: /^[1-9][0-9]{5}$/, // Validates a 6-digit pin code
  }, 
  orderCompleted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    }
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.models.DeliveryBoy || mongoose.model('DeliveryBoy', deliveryBoySchema);
