import mongoose from 'mongoose';

const CarouselSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['men', 'women', 'kids'],  // Restrict categories to these values
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });


export default mongoose.models.Carousel || mongoose.model('Carousel', CarouselSchema);

