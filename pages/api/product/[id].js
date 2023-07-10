import Product from "@/models/Product";
import db from "@/utils/db";

export const handler = async (req, res) => {
    await db.connect();
    const PRODUCT = await Product.findById(req.query.id);
    await db.disconnect();
    res.send(PRODUCT);
}