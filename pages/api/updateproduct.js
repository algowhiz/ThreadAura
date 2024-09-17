import Product from "@/models/Product";
import connectDb from "@/middleware/mongooseDb";



export default async function handelUpdateProducts(req, res) {

    connectDb();

    if (req.method == 'POST') {
        const updateProduct ={
            title: req.body.title,
            slug: req.body.slug,
            desc: req.body.desc,
            img: req.body.img,
            category: req.body.category,
            size: req.body.size,
            color: req.body.color,
            price: req.body.price,
            availableQty: req.body.availableQty,
        }
        const product = await Product.findByIdAndUpdate(req.body._id,updateProduct);
        return res.status(200).json({ message: "Data Updated" });
    } else {
        return res.status(400).json({ message: "Bad Request" });
    }
}
