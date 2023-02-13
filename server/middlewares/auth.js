import jwt from 'jsonwebtoken'
export const verifyToken = async(req,res,next)=>{
try{
let token =req.header("Athorization");
if(!token){
return res.status(403).send("access denied")
}
if(token.startsWith("Bearer ")){
  token = token.slice(7,token.length).trimleft();

}
const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
req.user =verified
next()
}
catch(e){
res.status(500).json({error:err.message})
}

}
