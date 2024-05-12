import { Router } from "express";
import mongoose from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Guest, { IGuest } from "../../../models/guest";

const rauter = Router();

rauter.get("/guestbankfund", auth, async (req, res) => {
  try {
    const guestId = req.headers["guestid"] as string;
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid id" });
    }
    const guest: IGuest = await Guest.findById(guestId)
      .populate("funds")
      .populate("funds.bank");

    if (!guest) {
      return res.status(404).send({ error: true, message: "Guest not found" });
    }
  } catch (error: any) {
    res.status(500).send({ error: true, message: error.message });
  }
});

export default rauter;
