import Product from "@/models/Product";
import connectDb from "@/middleware/mongooseDb";

export default async function handler(req, res) {
  await connectDb(); 
  try {
   
    const bestSellers = await Product.find({ soldQty: { $gt: 0 } })
      .sort({ soldQty: -1 })
      .limit(5);
    
    res.status(200).json(bestSellers);
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    return res.status(500).json({ message: "Server error", error });
  }
}
