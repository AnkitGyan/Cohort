const { Router } = require("express");
const { purchaseModel, courseModel } = require("../db");
const { userMiddleware } = require("../middleware/user"); 

const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  if (!courseId) {
    return res.status(400).json({ message: "courseId is required" });
  }


  const course = await courseModel.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }


  const alreadyPurchased = await purchaseModel.findOne({ userId, courseId });
  if (alreadyPurchased) {
    return res.status(409).json({ message: "You already purchased this course" });
  }

  await purchaseModel.create({
    userId,
    courseId,
  });

  res.status(201).json({
    message: "You have successfully bought the course",
    courseId,
  });
});

courseRouter.get("/preview", async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong while fetching courses." });
  }
});

module.exports = {
  courseRouter,
};
