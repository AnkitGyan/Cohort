const { Router } = require("express");
const { adminModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const { adminMiddleware } = require('../middleware/admin');
const JWT_SECRET = process.env.ADMIN_JWT_PASSWORD;

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
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
  const hashedPassword = await bcrypt.hash(password, 5);

  await adminModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  res.json({
    message: "You are signed up",
  });
});

// =================== Signin ===================
adminRouter.post("/signin", async (req, res) => {
  const signinSchema = z.object({
    email: z.string().email(),
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
  const user = await adminModel.findOne({ email });

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

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminID = req.userId;

  const courseSchema = z.object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().url(),
    price: z.number(),
  });

  const result = courseSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid course data",
      errors: result.error.errors,
    });
  }

  const { title, description, imageUrl, price } = result.data;

  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminID,
  });

  res.json({
    message: "Course Created",
    courseId: course._id,
  });
});

adminRouter.put("/course/:id", adminMiddleware, async (req, res) => {
  const adminID = req.userId;
  const courseId = req.params.id;

  const courseSchema = z.object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().url(),
    price: z.number(),
  });

  const result = courseSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid course data",
      errors: result.error.errors,
    });
  }

  const { title, description, imageUrl, price } = result.data;

  try {
    const updatedCourse = await courseModel.findOneAndUpdate(
      { _id: courseId, creatorId: adminID },
      { title, description, imageUrl, price },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found or unauthorized" });
    }

    res.json({
      message: "Course Updated",
      course: updatedCourse,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminID = req.userId;

  try {
    const courses = await courseModel.find({ creatorId: adminID });

    res.json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

adminRouter.get("/course/:id", adminMiddleware, async (req, res) => {
  const adminID = req.userId;
  const courseId = req.params.id;

  try {
    const course = await courseModel.findOne({
      _id: courseId,
      creatorId: adminID,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found or unauthorized" });
    }

    res.json({ course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = {
  adminRouter,
};
