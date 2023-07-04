import User from '../../models/User';
import Product from '@/models/Product';
import db from "@/utils/db";
import userData from '../../userData';
import productData from '../../utils/productData';

const handler = async (req, res) =>{
    await db.connect();
    await User.deleteMany();
    await User.insertMany(userData.users);
    await Product.deleteMany();
    await Product.insertMany(productData?.products);
    await db.disconnect();
    res.send({message: 'seeded successfully'})
}
export default handler