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
    }
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.models.DeliveryBoy || mongoose.model('DeliveryBoy', deliveryBoySchema);
