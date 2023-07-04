import { productData } from "@/utils/productData";


export default function handler (req, res) {
    res.status(200).json(productData.products)
}