import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: [String],  // Array of strings
        enum: ['S', 'M', 'L', 'XL', 'XXL'],  // Allowed sizes
    },
    color: [{
        color: { type: String, required: true },  // String for color name or hex code
        availableQty: { type: Number, required: true }  // Number for available quantity
    }],
    price: {
        type: Number,
        required: true
    },
    availableQty: {
        type: Number,
        required: true
    },
    soldQty: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
