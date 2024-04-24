import * as dotenv from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/user";

dotenv.config();

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const userFound = await User.findOne({ email: email });
    if (!userFound) {
      res.status(400).send("User not found");
      return;
    }

    const match = await userFound.comparePassword(password);
    if (!match) {
      res.status(400).send("Wrong password");
      return;
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    res.send({ token, userFound });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;
