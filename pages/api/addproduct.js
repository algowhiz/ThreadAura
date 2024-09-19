import Product from "@/models/Product";
import connectDb from "@/middleware/mongooseDb";

export default async function handelAddProducts(req, res) {
    connectDb();

    if (req.method === 'POST') {
        try {
            const product = new Product({
                title: req.body.title,
                slug: req.body.slug,
                desc: req.body.desc,
                img: req.body.img,
                category: req.body.category,
                size: req.body.size,  // Array of sizes
                color: req.body.color,  // Array of color objects
                price: req.body.price,
                availableQty: req.body.availableQty,
                soldQty: req.body.soldQty || 0,
            });

            await product.save();
            return res.status(200).json({ message: "Product added successfully" });
        } catch (error) {
            console.error('Error saving product:', error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        return res.status(400).json({ message: "Bad Request" });
    }
}
