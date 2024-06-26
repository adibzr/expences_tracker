import * as dotenv from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../../../models/user";
dotenv.config();

const router = Router();

router.post("/register", async (req, res) => {
  const { fullname, username, email, password, expenses, budget, funds } =
    req.body;

  try {
    const userFound: any = await User.findOne({ email: email });
    if (userFound) {
      res.status(400).json({ error: true, message: "User already exists" });
      return;
    }

    const user = new User({
      fullname: fullname,
      email: email,
      password: password,
      expenses: expenses,
      budget: budget,
      funds: funds,
    });

    const savedUser = await user.save();
    const token: string = jwt.sign(
      { _id: savedUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

    res.status(200).json({ success: true, token, savedUser });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
