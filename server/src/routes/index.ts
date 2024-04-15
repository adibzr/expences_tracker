import { Router } from "express";
import userCreate from "./user/userCreate";
const router = Router();

router.use("/user", userCreate);

export default router;
