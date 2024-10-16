import Category from "@/models/Category";
import connectDb from "@/middleware/mongooseDb";

export default async function handler(req, res) {
    await connectDb();
    if (req.method === 'POST') {
        try {
            const { mainCategory, subcategories } = req.body;

            if (!mainCategory || !subcategories) {
                return res.status(400).json({ error: "Missing required fields: mainCategory or subcategories" });
            }

            const newCategory = new Category({
                mainCategory,
                subcategories
            });

            const savedCategory = await newCategory.save();

            res.status(201).json({ message: "Category added successfully", category: savedCategory });
        } catch (error) {
            res.status(500).json({ error: "An error occurred while adding the category" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed, use POST" });
    }
}
