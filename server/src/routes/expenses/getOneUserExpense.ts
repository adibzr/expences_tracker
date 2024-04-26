import { Request, Response, Router } from "express";
import auth from "../../middleware/authMiddleware";
import User, { IUser } from "../../models/user";
import mongoose from "mongoose";

const router = Router();

router.get("/userexpense", auth, async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "invalid id" });
    }
    const user: IUser = await User.findById(userId).populate("expense");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      expense: user.expense,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;
