const mongoose = require('mongoose');
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

console.log("connecting to mongodb");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ankit0525252:OZWFTUPkd3WwQUVY@cluster0.gv9iuj9.mongodb.net/coursera-app-databases')
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit process if connection fails
  }
};

connectDB();

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { timestamps: true });


const adminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { timestamps: true });


const courseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  creatorId: { type: ObjectId, ref: 'admin', required: true },
}, { timestamps: true });

const purchaseSchema = new Schema({
  userId: { type: ObjectId, ref: 'users', required: true },
  courseId: { type: ObjectId, ref: 'courses', required: true },
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};