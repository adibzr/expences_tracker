import { Router } from "express";
import { default as Category } from "../../models/category";

const router = Router();

router.get("/getcategory", async (_, res) => {
  try {
    const categories = await Category.find({}).populate("icon");
    res.status(200).json({ categories });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
});

export default router;
