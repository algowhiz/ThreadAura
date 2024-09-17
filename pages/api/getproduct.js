import Product from "@/models/Product";
import connectDb from "@/middleware/mongooseDb";



export default async  function handelGetProducts(req, res) {
    
    connectDb();
    const product = await Product.find();

    return res.status(200).json({product});
  }
  