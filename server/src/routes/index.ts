import { Router } from "express";
import userCreate from "./user/userCreate";
import login from "./user/userLogin";
const router = Router();

router.use("/user", userCreate);
router.use("/user", login);

export default router;
