import * as dotenv from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";
import Guest, { IGuest } from "../../../models/guest";
import Wallet from "../../../models/wallet";
dotenv.config();

const router = Router();

router.post("/guest", async (req, res) => {
  try {
    const newWallet = new Wallet();
    const savedWallet = await newWallet.save();

    const guest: IGuest = new Guest({
      wallet: savedWallet._id,
    });

    const savedGuest = await guest.save();
    const token: string = jwt.sign(
      { _id: savedGuest._id },
      process.env.JWT_SECRET,
      {
        expiresIn: 999999 * 60 * 24, // 999999 days
      }
    );
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

    res.status(200).json({ success: true, token, guest: savedGuest });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
