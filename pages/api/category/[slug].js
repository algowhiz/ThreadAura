import Product from "@/models/Product";
import connectDb from "@/middleware/mongooseDb";

export default async function handelGetProducts(req, res) {
  if (req.method === 'GET') {
    await connectDb();

    try {
      const { slug } = req.query;

      if (!slug) {
        return res.status(400).json({ success: false, message: 'Slug is required' });
      }
      const products = await Product.find({
        $or: [
          { category: { $in: [slug] } }, 
          { slug: { $eq: slug } } 
        ]
      });

      if (!products || products.length === 0) {
        return res.status(404).json({ success: false, message: 'No products found' });
      }

      return res.status(200).json({ success: true, products });

    } catch (error) {
      console.error('Error fetching products:', error); // Log the error
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
