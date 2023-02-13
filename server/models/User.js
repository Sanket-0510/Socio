import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
firstname:{
   type:String,
   require:true,
   min:2,
   max:50
},
lastname:{
 type:String,
 require:true,
 min:2,
max:50
},
email:{
type:String,
require:true,
min:2,
max:50,
unique:true
 },
 password:{
  type:String,
  required:true,
  min:5,
  max:15
 },
 picturePath:{
type:String,
default:"",

 },
friends:{
type:Array,
default:[]
},
location:String,
occupation: String,
viewedProfile: Number,
impressions : Number
},
{timestamps : true}
)
const User = new mongoose.model("User", userSchema)
export default User
