const mongoose = require('mongoose');

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
          // Required only for Apparel
    },
    color: [{ 
        color: { type: String },  // Required only for Apparel
        availableQty: { type: Number }  // Required only for Apparel
    }],
    price: { 
        type: Number, 
        required: true 
    },
    availableQty: { 
        type: Number, 
        required: true 
    },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
