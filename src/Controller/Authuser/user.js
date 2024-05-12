import {compare} from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../Model/User/User.js";


const AuthUser={

    login:async(req,res)=>{
        try {
            if(req.session.token){
                return res.status(200).json({ status: true, message: 'Login Already Login.'});
            }
            else{
                const { email,password} = req.body;
                const user = await UserModel.findOne({ where: { email: email } });
                if (!user) {
                    return res.status(404).json({ status: false, message: 'User Not Registered.' });
                }
                const comparepassword=await compare(password,user.password);
                if (!comparepassword) {
                    return res.status(401).json({ status: false, message: 'Password Not Matched.' });
                }
                const data = {
                    id: user.id,
                    email: user.email,
                    password: user.password,
                  };
                  const token = jwt.sign(data, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                  });
                  req.session.token=token;//setting session with token
             return res.status(200).json({ status: true, message: 'Login successful.', user,token });
            }
        } catch (e) {
            return res.status(500).json({ status: false, error: `An error occurred while login user.${e.message}` });
        }
    },

    logout:async(req,res)=>{
        try {
            if(req.session.token){
                await req.session.destroy();
                return res.status(200).json({ status: true, message: 'Logout successful.' });
            }
            else{
                return res.status(200).json({ status: true, message: 'You Are Not Logged IN.' });
            }
        
        } catch (e) {
            return res.status(500).json({ status: false, error: `An error occurred while logging out.${e.message}` });
        }
    }
}

export default AuthUser;