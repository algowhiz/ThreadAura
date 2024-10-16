import Product from "@/models/Product";
import connectDb from "@/middleware/mongooseDb";

export default async function handelAddProducts(req, res) {
    connectDb();

    if (req.method === 'POST') {
        try {
            const products = req.body.products;
            const savedProducts = [];
            for (let productData of products) {
                const { title, slug, desc, img, category, size, color, price, availableQty, soldQty } = productData;

                if (!Array.isArray(color) || !color.every(c => c.color && c.availableQty !== undefined)) {
                    return res.status(400).json({ message: "Invalid color format. Expected an array of objects with 'color' and 'availableQty'." });
                }

                const product = new Product({
                    title,
                    slug,
                    desc,
                    img,
                    category,
                    size, 
                    color,  
                    price,
                    availableQty,
                    soldQty: soldQty || 0, 
                });

                const savedProduct = await product.save();
                savedProducts.push(savedProduct);
            }

            return res.status(200).json({ message: "Products added successfully", products: savedProducts });
        } catch (error) {
            console.error('Error saving product:', error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        return res.status(400).json({ message: "Bad Request" });
    }
}
