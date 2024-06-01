import * as dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const auth = (req: Request, res: Response, next: () => void) => {
  try {
    const token = req.headers["token"] as string;
    if (!token) {
      return res.status(401).send("No token provided");
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({ error: err.message });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};

export default auth;
