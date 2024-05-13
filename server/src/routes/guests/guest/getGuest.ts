import * as dotenv from "dotenv";
import { Router } from "express";
import mongoose from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Guest, { IGuest } from "../../../models/guest";
dotenv.config();

const router = Router();

router.get("/getguest", auth, async (req, res) => {
  try {
    const guestId = req.headers["guestid"] as string;
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid id" });
    }
    const guest: IGuest = await Guest.findById(guestId);
    if (!guest) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }
    res.status(200).json({ success: true, guest: guest });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
