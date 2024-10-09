import Category from "@/models/Category";
import connectDb from "@/middleware/mongooseDb";

export default async function handler(req, res) {
    await connectDb();
    if (req.method === 'POST') {
        try {
            // Extract data from the request body
            const { mainCategory, subcategories } = req.body;

            // Check if the required fields are present
            if (!mainCategory || !subcategories) {
                return res.status(400).json({ error: "Missing required fields: mainCategory or subcategories" });
            }

            // Create a new Category instance
            const newCategory = new Category({
                mainCategory,
                subcategories
            });

            // Save the new category to the database
            const savedCategory = await newCategory.save();

            // Send back a success response with the saved category data
            res.status(201).json({ message: "Category added successfully", category: savedCategory });
        } catch (error) {
            // Handle any errors
            console.error(error);
            res.status(500).json({ error: "An error occurred while adding the category" });
        }
    } else {
        // Respond with method not allowed for other HTTP methods
        res.status(405).json({ error: "Method not allowed, use POST" });
    }
}
