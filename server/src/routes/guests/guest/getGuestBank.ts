import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Guest, { IGuest } from "../../../models/guest";
import { IBank } from "../../../models/bank";

const router = Router();

interface bankType extends Omit<IGuest, "bank"> {
  bank: IBank[];
}

router.get("/guestbank", auth, async (req: Request, res: Response) => {
  try {
    const guestId = req.headers["guestid"] as string;
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid id" });
    }
    const guest: bankType = await Guest.findById(guestId).populate("bank");
    if (!guest) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }

    res.status(200).json({
      success: true,
      bank:guest.bank,
    });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
