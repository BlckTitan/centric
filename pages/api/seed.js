import User from '../../models/User';
import db from "@/utils/db";
import userData from '../../userData';
import productData from '../../data.json';
import Product from '@/models/Product';

const handler = async(req, res) =>{
    await db.connect();
    await User.deleteMany();
    await User.insertMany(userData.users);
    await Product.deleteMany();
    await Product.insertMany(productData.products);
    await db.disconnect();
    res.send({message: 'seeded successfully'})
}
export default handler