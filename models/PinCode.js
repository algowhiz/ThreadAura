const mongoose = require('mongoose');

const pinCodeSchema = new mongoose.Schema({
  pinCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[1-9][0-9]{5}$/, // Ensures it's a valid 6-digit pin code
  },
  deliveryBoys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryBoy',
    }
  ],
}, {
  timestamps: true,
});

// maximum 3 delivery boys per pin code
pinCodeSchema.pre('save', function (next) {
  if (this.deliveryBoys.length > 3) {
    const err = new Error('A pin code can have a maximum of 3 delivery boys.');
    next(err);
  } else {
    next();
  }
});

export default mongoose.models.PinCode ||  mongoose.model('PinCode', pinCodeSchema);