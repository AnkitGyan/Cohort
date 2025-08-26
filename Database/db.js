const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const User = new Schema({
  name : String,
  email : String,
  password : String,
})

const Todo = new Schema({
  userId : ObjectId,
  title : String,
  done : Boolean,
})

UserModel = mongoose.model("users", User);
TodoModel = mongoose.model("todos", Todo);

module.exports = {
  UserModel : UserModel,
  TodoModel : TodoModel
};