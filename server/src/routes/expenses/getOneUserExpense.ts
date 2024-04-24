import { Request, Response, Router } from "express";
import auth from "../../middleware/authMiddleware";
import User, { IUser } from "../../models/user";

const router = Router();

router.get("/userexpense", auth, async (req: Request, res: Response) => {
  const { _id } = req.body;
  console.log(_id);
  try {
    const user: IUser = await User.findById(_id).populate("expense");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      expense: user.expense,
    });
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  }
});

export default router;
