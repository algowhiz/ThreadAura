import mongoose from 'mongoose';

const CarouselSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    mobileImageUrl:{
        type: String,
        required: true
    }
}, { timestamps: true });


export default mongoose.models.Carousel || mongoose.model('Carousel', CarouselSchema);

