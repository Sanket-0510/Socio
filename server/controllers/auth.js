import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js";

const register = async(req,res)=>{
try{
const {
firstName,
lastName,
email,
password,
picturePath,
friends,
location,
occupation
}= req.body;
  const salt= await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(password, salt)
  const newUser = new User({
     firstname: firstName,
     lastname:lastName,
     email:email,
     password:passwordHash,
     picturePath:picturePath,
     friends:friends,
     location:location,
     occupation:occupation,
     viewedProfile: Math.floor(Math.random()*1000),
     impressions: Math.floor(Math.random()*1000)
  })
  const savedUser = await newUser.save();
  res.status(201).json(savedUser)
}
catch(err){
res.status(500).json({error:err.message});   
console.log(err)
}
}
//login 
export const login = async(req,res)=>{
  try{
    const {email, password}= req.body;
    const user = await User.find({email:email})
    if(!user)return res.status(400).json({msg:"user does not exist"})
    const isMatch =await bcrypt.compare(password, user.password)
    if(!isMatch)return res.status(400).json({msg:"invalid Credentials"})
    const token= jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
    delete user.password;
    res.status(200).json({token,user});
  }
  catch(err){
    
  }
}  
export default register
