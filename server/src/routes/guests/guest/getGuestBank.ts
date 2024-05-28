import { Request, Response, Router } from "express";
import { Types } from "mongoose";
import auth from "../../../middleware/authMiddleware";
import { IBank } from "../../../models/bank";
import Guest, { IGuest } from "../../../models/guest";

const router = Router();

interface bankType extends Omit<IGuest, "bank"> {
  bank: IBank[];
}

router.get("/getguestbank", auth, async (req: Request, res: Response) => {
  try {
    const guestId = req.headers["guestid"] as string;
    if (!Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({ error: true, message: "invalid id" });
    }
    const guest: bankType = await Guest.findById(guestId).populate("bank");
    if (!guest) {
      return res.status(404).json({ error: true, message: "Guest not found" });
    }

    res.status(200).json({
      success: true,
      bank: guest.bank,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
