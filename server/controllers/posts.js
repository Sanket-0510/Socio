import mongoose from "mongoose";
import Post from "../models/posts.js";
import User from "../models/User.js";
//create
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (e) {
    res.status(409).json({
      message: err.message,
    });
  }
};
export const getFeedPosts = async (req, res) => {
  try {
    const Post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json({ message: err.message });
  }
};
//update

export const likePost = async (req, res) => {
  try {
  const {id} =req.params
  const {userId} = req.body
  const post = await Post.find(id);
  const isLiked = Post.likes.get(userId)
  if(isLiked){
     post.likes.delete(userId)
  }
  else{
     post.likes.set(userId , true)
  }
  const updatedPost = await Post.findByIdAndUpdate(
  id,{likes:post.likes},{new:true}
  )
     
    
  } catch (e) {
    res.status(404).json({ message: err.message });
  }
};
