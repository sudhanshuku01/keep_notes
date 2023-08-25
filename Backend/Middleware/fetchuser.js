import jwt from 'jsonwebtoken'
const JWT_SECRET="sudhs@#%$12";
import User from '../Models/User.js'
const fetchUser= async (req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401).json({success:false,message:"Please authenticate using a valid token"})
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        const exitinguser=await User.findById(data.id);
        if(!exitinguser){return res.status(401).json({success:false,message:" Access Denied!.Login or Sign Up then try!"})}
        req.user=data;
        next();
    }catch(error){
        res.status(500).json({success:false,message:"Please authenticate using a valid token"})
    }
}
export default fetchUser;