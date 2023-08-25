import {body, validationResult }  from 'express-validator';
import User from '../Models/User.js'
// import sendMail from '../Models/SendMail'
import fetchUser from '../Middleware/fetchuser.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const JWT_SECRET="sudhs@#%$12";
import express from 'express';
const router=express.Router();
//createuser using post api and no authentication required
router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','more than 5 character').isLength({min:5}),
],async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({success:false,message:errors.array()})
    }
try {
     let existinguser=await User.findOne({email:req.body.email});
     if(existinguser){
        return res.status(500).json({success:false,message:"User already exits of this email!"})
     }
     let salt= await bcrypt.genSalt(10);
     let hashedPass=await bcrypt.hashSync(req.body.password,salt);
     const user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPass
     })
     const authtoken=jwt.sign({id:user.id},JWT_SECRET)
     res.status(200).json({success:true,message:"signed up successfully",authtoken})
 } catch (error) {
    console.log(error.message)
    res.status(500).send({success:false,message:'server error try after sometime'})
 }
})
// authenticate a ause using :post/api/auth/login
router.post('/login',[
   body('email','enter a valid email').isEmail(),
   body('password','password can not be blank').exists()
],async (req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({success:false,message:errors.array()});
   }
   const {email,password}=req.body;
   try {
      let user=await User.findOne({email});
      if(!user){
         return res.status(400).json({success:false,message:"wrong credential"})
      }
      const passwordCompare=await bcrypt.compare(password,user.password)
      if(!passwordCompare){
         return res.status(400).json({success:false,message:"wrong credential"})
      }
      const authtoken=jwt.sign({id:user.id},JWT_SECRET);
      res.json({success:true,authtoken})
   } catch (error) {
      console.log(error.message);
      res.status(500).send({success:false,message:"Internal Server Error"});
   }
})
// get user logged in user auth required
router.post("/getuser",fetchUser,async (req,res)=>{
   try{
      const userId=req.user.id;
      const user=await User.findById(userId).select('-password');
      if(!user){
         return res.status(401).json({success:false,message:"cann't find the user"})
      }
      res.json({success:true,message:'user found successfully',user:user})
   }catch(error){
    console.log(error.message);
    res.status(500).json({success:false,message:"internal server error"})
   }
})
export default router;