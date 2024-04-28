import * as dotenv from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/user";

dotenv.config();

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email: email });
    if (!userFound) {
      res.status(400).json({ error: true, message: "User not found" });
      return;
    }

    const match = await userFound.comparePassword(password);
    if (!match) {
      res.status(400).send({ error: true, message: "Wrong password" });
      return;
    }
    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    res.send({ success: true, token, userFound });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
