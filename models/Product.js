import mongoose from "mongoose";  

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        slug: {type: String, required: true, unique: true},
        brand: {type: String, required: true},
        stockCount: {type: Number, required: true, default: 0},
        price: {type: Number, required: true},
        description: {type: String, required: true},
        category: {type: String, required: true},
        image: {type: String, required: true},
        rating: {type: Number, required: true, default: 0},
        ratingCount: {type: Number, required: true, default: 0},
    }, {
        timestamps: true
    }
)

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product;