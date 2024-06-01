import { Request, Response, Router } from "express";
import { Types } from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Guest from "../../../models/guest";

const router = Router();

router.get("/getbudget", auth, async (req: Request, res: Response) => {
  try {
    const guestId = req.headers["guestid"] as string;
    if (!Types.ObjectId.isValid(guestId)) {
      res.status(400).json({ error: true, message: "invalid user id" });
      return;
    }
    const guest = await Guest.findById({
      _id: req.headers["guestid"],
    }).populate("budget");
    if (!guest) {
      res.status(404).json({ error: true, message: "Guests not found" });
      return;
    }
    res.status(200).json({
      success: true,
      budget: guest.budget,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
