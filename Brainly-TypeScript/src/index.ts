import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { z } from "zod";
import crypto from "crypto";
import { LinksModel, userModel } from "./db.js";
import bcrypt from "bcrypt";
import cors from "cors";
import userMiddleware from "./middleware.js";
import { ContentModel } from "./db.js";
const JWT_SECRET = "ANKIT123";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/v1/signup", async (req: Request, res: Response) => {
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

  const hashedPassword = await bcrypt.hash(password, 10); 

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

app.post("/api/v1/signin", async (req: any, res: any) => {
  const signinSchema = z.object({
    email: z.string(),
    password: z.string().min(1, "Password is required"),
  });

  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error,
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

  const token: any = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, type, title } = req.body;
    await ContentModel.create({
        link,
        type,
        title,
        
        userId: req.userId, // userId is added by the middleware.
        tags: [] // Initialize tags as an empty array.
    });

    res.json({ message: "Content added" }); // Send success response.
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;  // User ID is fetched from middleware
    // Fetch all content associated with the user ID and populate username
    // The `populate` function is used to include additional details from the referenced `userId`.
    // For example, it will fetch the username linked to the userId.
    // Since we specified "username", only the username will be included in the result, 
    // and other details like password won’t be fetched.
    const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json({content});  // Send the content as response
});

app.delete("/api/v1/content/:id", userMiddleware, async (req: Request, res: Response) => {
  try {
    const contentId = req.params.id;

    // Delete content where _id matches and belongs to the logged-in user
    const result = await ContentModel.deleteOne({ _id: contentId, userId: req.userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Content not found or not authorized" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post(
  "/api/v1/brainly/share",
  userMiddleware,
  async (req: any, res: Response) => {
    const share = req.body.share;

    if (share) {
      const hash = crypto.randomBytes(8).toString("hex"); // unique hash

      await LinksModel.findOneAndUpdate(
        { userId: req.userId },
        { hash, userId: req.userId },
        { upsert: true, new: true }
      );

      return res.json({
        message: "Sharable link created",
        link: `http://localhost:8080/api/v1/brainly/${hash}`,
      });
    } else {
      await LinksModel.deleteOne({ userId: req.userId });
      return res.json({ message: "Sharable link disabled" });
    }
  }
);

/*Get Content by Sharable Link */
app.get(
  "/api/v1/brainly/:shareLink",
  async (req: Request, res: Response) => {
    const { shareLink } = req.params;

    const link = await LinksModel.findOne({ hash: shareLink }).populate(
      "userId",
    );

    if (!link) {
      return res.status(404).json({ message: "Invalid or expired link" });
    }

    const content = await ContentModel.find({ userId: link.userId });

    res.json({
      user: link.userId,
      content,
    });
  }
);




mongoose
  .connect("mongodb+srv://ankit0525252:OZWFTUPkd3WwQUVY@cluster0.gv9iuj9.mongodb.net/brainly-app'") 
  .then(() => {
    app.listen(8080, () => {
      console.log("App is listening on port 8080");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));




























  