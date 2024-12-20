import Category from "@/models/Category";
import connectDb from "@/middleware/mongooseDb";

export default async function handler(req, res) {
  await connectDb(); 

  if (req.method === 'GET') {
    try {
      const { gender } = req.query; 

      const categories = await Category.find({ mainCategory: gender });

      if (categories.length === 0) {
        return res.status(404).json({ message: "No categories found for this gender" });
      }

      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching the categories" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed, use GET" });
  }
}
