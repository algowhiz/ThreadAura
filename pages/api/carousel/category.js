import Carousel from "@/models/Carousel"
import connectDb from "@/middleware/mongooseDb";


export default async function handelGetProducts(req, res) {

    if (req.method === 'GET') {
        await connectDb();
        
        try {
            const { category } = req.query; 
            
            const images = await Carousel.find({ category });

            if (images.length > 0) {
                return res.status(200).json({ success: true, images });
            } else {
                return res.status(404).json({ success: false, message: "No images found for this category" });
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    } else {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}


