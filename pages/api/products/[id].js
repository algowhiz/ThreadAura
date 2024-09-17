import Product from "@/models/Product";
import connectDb from "@/middleware/mongooseDb";

export default async function handler(req, res) {
  connectDb();

  const { id } = req.query; // Get the id from the query parameters

  try {
     
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
