import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import bcrypt from "bcrypt"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import authRoutes from "../server/routes/auth.js"
import userRoutes from "../server/routes/users.js"
import postRoutes from "../server/routes/posts.js"
import User from "../server/models/User.js"
import Post from "../server/models/posts.js"
import {users, posts} from "./data/indx.js"
import { fileURLToPath } from "url"
import register from "../server/controllers/auth.js"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express();
app.use(express.json());
const template_path = path.join(__dirname, "../client");
app.set("client", template_path)
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(bodyParser.json({extended:true, limit:"30mb"}))
app.use(bodyParser.urlencoded({extended:true, limit:"30mb"}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assests')))
const storage = multer.diskStorage(
                         {
destination:function(req,file,cb){
                         cb(null,"public/assets");
},
filename: function(req,file,cb){
                         cb(null,file.originalname);
},

                         }
);
const upload = multer({storage});
const PORT = process.env.PORT || 8000

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
   },async()=>{
      try{
         console.log("connection successful")
         app.listen(3000, (req,res)=>{
            console.log("listening at 3000")}
           )
         //  const data = await User.insertMany(users)
         //   const postdata = await Post.insertMany(posts)
         //   console.log(data,postdata)
      }catch(e){
                             console.log(e)
      }
      })
   

app.use("/auth/register", upload.single("picture"),register);

// routes
app.use("auth", authRoutes)
app.use("user", userRoutes)
app.use("post", postRoutes)


app.use(express.static(path.join(__dirname, 'build')));

// PATH CONFIGURATION TO RESPOND TO A REQUEST TO STATIC ROUTE REQUEST BY SERVING index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

