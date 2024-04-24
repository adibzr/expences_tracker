import { Router } from "express";
import getOneUserExpense from "./expenses/getOneUserExpense";
import posrExpense from "./expenses/postExpense";
import userCreate from "./user/userCreate";
import login from "./user/userLogin";
const router = Router();

router.use("/user", userCreate);
router.use("/user", login);

router.use("/expense", getOneUserExpense);
router.use("/expense", posrExpense);

export default router;
