import * as dotenv from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";
import Guest, { IGuest } from "../../../models/guest";
dotenv.config();

const router = Router();

router.post("/guest", async (req, res) => {
  try {
    const guest: IGuest = new Guest();

    const savedGuest = await guest.save();
    const token: string = jwt.sign(
      { _id: savedGuest._id },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

    res.status(200).json({ success: true, token, guestId: savedGuest._id });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
