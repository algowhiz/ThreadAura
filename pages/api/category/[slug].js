import Product from "@/models/Product";
import connectDb from "@/middleware/mongooseDb";

export default async function handelGetProducts(req, res) {
  if (req.method === 'GET') {
    await connectDb();

    try {
      const { slug } = req.query;

      // Ensure slug is provided
      if (!slug) {
        return res.status(400).json({ success: false, message: 'Slug is required' });
      }

      // Log the slug to confirm it's being received
      console.log('Received slug:', slug);

      // Fetch products matching the category or exact slug
      const products = await Product.find({
        $or: [
          { category: { $regex: `^${slug}$`, $options: 'i' } }, // Case-insensitive match for category
          { slug: { $eq: slug } } // Exact match for slug
        ]
      });

      // Log the results to inspect what's being returned
      console.log('Products fetched:', products);

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
