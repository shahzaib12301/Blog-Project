import UserModel from "../../Model/User/User.js";
import {hash} from "bcrypt";
const UserController={

    create:async(req,res)=>{
        try{
            const {username, age, phone,email,password} = req.body;
            const hpassword=await hash(password,10)//convert password to hash
            const [user, created] = await UserModel.findOrCreate({
                where: { email:email },
                defaults: {username, age, phone,email,password:hpassword }
            });
            if (created) {
                return res.status(201).json({status:true, message: 'User created successfully.', user });
            } else {
                return res.status(200).json({status:false, message: 'User already exists.', user });
            }
        }
        catch(e){
            return res.status(500).json({status:false , error: `An error occurred while registering user.${e.message}`});
        }
    },
    update: async (req, res) => {
        try {
            const { username, age, phone, email, password } = req.body;
            const hpassword = await hash(password, 10); // Convert password to hash
            let user = await UserModel.findOne({ where: { email: email } });
            if (user) {
                user.username = username;
                user.age = age;
                user.phone = phone;
                user.email = email;
                user.password = hpassword;
                await user.save(); 
                return res.status(200).json({ status: true, message: 'User updated successfully.', user });
            } else {
                return res.status(404).json({ status: false, message: 'User not found.' });
            }
        } catch (e) {
            return res.status(500).json({ status: false, error: `An error occurred while updating user.${e.message}` });
           }
    },
    delete: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await UserModel.findOne({ where: { email: email } });
            if (user) {
                await user.destroy();
                return res.status(200).json({ status: true, message: 'User deleted successfully.' });
            } else {

                return res.status(404).json({ status: false, message: 'User not found.' });
            }
        } catch (e) {
            return res.status(500).json({ status: false, error: `An error occurred while deleting user.${e.message}` });
        }
    }
    
   
}
export default UserController;

