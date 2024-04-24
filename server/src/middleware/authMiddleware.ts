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

    const data = jwt.verify(token, process.env.JWT_SECRET);

    if (!data) {
      return res.status(401).send("Unauthorized");
    }
    req.user = data;
    next();
  } catch (error) {}
};

export default auth;
