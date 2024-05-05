import { Router } from "express";
import Category from "../../models/category";

const router = Router();

router.get("/getcategory", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
});

export default router;
