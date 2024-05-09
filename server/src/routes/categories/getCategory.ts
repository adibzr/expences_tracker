import { Router } from "express";
import ExpensesCategory from "../../models/expensesCategory";
import FundsCategory from "../../models/fundsCategory";

const router = Router();

router.get("/getcategory", async (req, res) => {
  try {
    const expenseCategories = await ExpensesCategory.find({}).populate("icon");
    const fundCategories = await FundsCategory.find({}).populate("icon");
    res.status(200).json({ expenseCategories, fundCategories });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
});

export default router;
