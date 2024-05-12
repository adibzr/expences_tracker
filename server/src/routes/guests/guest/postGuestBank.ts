import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import auth from "../../../middleware/authMiddleware";
import Bank from "../../../models/bank";
import Guest from "../../../models/guest";

const router = Router();

router.post("/addguestbank", auth, async (req: Request, res: Response) => {
  try {
    const { title, logo, amount, guestId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid guest id" });
    }
    const guestFound = await Guest.findById(guestId);
    if (!guestFound) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }
    const newBank = new Bank({
      title,
      logo,
      amount,
    });
    const savedBank = await newBank.save();

    await guestFound.save();
    res.status(201).json({ success: true, bank: savedBank });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
