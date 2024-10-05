import Product from "@/models/Product";
import connectDb from "@/middleware/mongooseDb";

export default async function handelGetProducts(req, res) {
  if (req.method === 'GET') {
    await connectDb();

    try {
      const { slug } = req.query;  // Extract the slug from the query parameter

      // Find products by slug (or category, depending on your schema)
      const products = await Product.find({ category:slug }); // Assuming `slug` is a property in your Product schema

      if (!products || products.length === 0) {
        return res.status(404).json({ success: false, message: 'No products found' });
      }

      // Return the array of products
      return res.status(200).json({ success: true, products });
      
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
