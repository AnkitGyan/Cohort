import mongoose from "mongoose";
import { Schema, Types } from "mongoose";
import { ref } from "process";
import type { required } from "zod/mini";
const ObjectId = Types.ObjectId; 


console.log("connecting to mongodb");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ankit0525252:OZWFTUPkd3WwQUVY@cluster0.gv9iuj9.mongodb.net/brainly-app')
    console.log('MongoDB connected successfully');
  } catch (error: any) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

const ContentSchema = new Schema({
    title: String,                          
    Link: String,                           
    tags: [{ type: ObjectId, ref: "tag" }], 
    userId: [{ 
        type: ObjectId, 
        ref: "User", 
        required: true                       
    }],
});

const LinkSchema = new Schema({
  hash: String,
  userId: {type: ObjectId, ref: 'User', required: true},
})
export const LinksModel = mongoose.model("links", LinkSchema);
export const userModel = mongoose.model("users", userSchema);
export const ContentModel = mongoose.model("Content", ContentSchema);
