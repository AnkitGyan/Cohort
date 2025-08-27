const express = require('express');
const app = express();
const {UserModel, TodoModel} = require('./db');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require("bcrypt");
const { z, parse } = require('zod');

mongoose.connect('')
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.post("/signup", async (req, res)=>{
  const requiredBody = z.object({
    email : z.string(),
    name : z.string(),
    password : z.string(),
  })

// const parsedata = requiredBody.parse(req.body);
  const parseDataWithSuccess = requiredBody.safeParse(req.body);

  if(!parseDataWithSuccess.success){
  res.json({
    message : "incorrect data",
    error : parseDataWithSuccess.error,
  })
  return
  }

  const { name, email, password } = parseDataWithSuccess.data;
// const name = req.body.name;
// const email = req.body.email;
// const password = req.body.password;

hashedPassword = await bcrypt.hash(password, 5);
console.log(hashedPassword);

await UserModel.create({
  name : name,
  email : email,
  password : hashedPassword,
})

res.json({
  message : "You are signed up",
})

});

app.post("/signin", async (req, res) => {
  const signinSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
  });
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.errors,
    });
  }
  const { email, password } = result.data;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(403).json({ message: "User not found" });
  }
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return res.status(403).json({ message: "Invalid Credentials" });
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});


const auth = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.userId = decodedToken.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Credentials" });
  }
};

app.post("/todos", auth, async (req, res) => {
  const userId = req.userId; // Pulling from auth middleware
  const { title, done } = req.body;

  const newTodo = await TodoModel.create({
    userId,
    title,
    done,
  });

  res.json({
    message: "Todo created",
    todo: newTodo,
  });
});


app.get("/todo", auth, async (req, res) => {
  const userID = req.userId;

  try {
    const todos = await TodoModel.find({ userId: userID });
    res.json({ todos });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving todos", error: err });
  }
});


app.listen(8080, ()=>{
  console.log("listening on the port 8080");
});
