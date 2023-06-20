import User from '../../models/User';
import db from "@/utils/db";
import userData from '../../userData';

const handler = async(req, res) =>{
    await db.connect();
    await User.deleteMany();
    await User.insertMany(userData.users);
    res.send({message: 'seeded successfully'})
}
export default handler