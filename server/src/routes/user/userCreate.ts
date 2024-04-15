import { Router } from "express";
import User from "../../models/user";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/newUser", async (req, res) => {
  const { name, username, email, password, expenses, budget, funds } = req.body;

  try {
    const userFound: any = await User.findOne({ email: email });
    if (userFound) {
      res.status(400).send("User already exists");
      return;
    }

    const user = new User({
      name: name,
      username: username,
      email: email,
      password: password,
      expenses: expenses,
      budget: budget,
      funds: funds,
    });

    const savedUser = await user.save();
    const secret: string = process.env.JWT_SECRET;
    const token: string = jwt.sign({ _id: savedUser._id }, secret);
    // res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

    res.status(200).json({ savedUser });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;
