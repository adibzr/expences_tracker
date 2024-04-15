import { Router } from "express";
import User from "../../models/user";
// import jwt from "jsonwebtoken";

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

    // const token: string = jwt.sign({ _id: savedUser._id }, "token", {
    //   expiresIn: 60 * 60 * 24,
    // });
    // res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

    return res.status(200).json({ savedUser });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

export default router;
