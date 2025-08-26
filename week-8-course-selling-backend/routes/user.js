const { Router } = require("express");
const { userModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const JWT_SECRET = process.env.USER_JWT_PASSWORD;

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const parseDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parseDataWithSuccess.success) {
    return res.status(400).json({
      message: "Incorrect data",
      error: parseDataWithSuccess.error,
    });
  }

  const { firstName, lastName, email, password } = parseDataWithSuccess.data;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "You are signed up",
  });
});

userRouter.post("/signin", async (req, res) => {
  const signinSchema = z.object({
    email: z.string(),
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

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(403).json({ message: "User not found" });
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});

userRouter.get("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const purchases = await purchaseModel.find({ userId });

    res.json({
      message: "Purchases fetched successfully",
      purchases,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = {
  userRouter,
};
