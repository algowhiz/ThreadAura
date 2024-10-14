import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
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
        type: [String],
        required: true
    },
    size: {
        type: [String],
        enum: ['S', 'M', 'L', 'XL', 'XXL','2-3y', '3-4y', '5-6y', '7y','7-8y', '9-10y', '11-12y', '13-14y','14-15y','uk-7','uk-8','uk-9','uk-9'],  
    },
    color: [{
        color: { type: String, required: true },  
        availableQty: { type: Number, required: true }  
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
