import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Guest, { IGuest } from "../../../models/guest";

const router = Router();

router.get("/guestexpense", auth, async (req: Request, res: Response) => {
  try {
    const guestId = req.headers["guestid"] as string;
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid id" });
    }
    const guest: IGuest = await Guest.findById(guestId).populate("expense");

    if (!guest) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }
    res.status(200).json({
      success: true,
      expense: guest.expense,
    });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
