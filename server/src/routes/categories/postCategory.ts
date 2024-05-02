import { Router } from "express";
import Category from "../../models/category";

const router = Router();

router.post("/postCategory", async (req, res, next) => {
  const { titles }: { titles: string[] } = req.body;
  for (let i = 0; i < titles.length; i++) {
    const element = titles[i];

    const existingCategory = await Category.findOne({ title: element });
    if (!existingCategory) {
      const newCategory = new Category({ title: element });
      await newCategory.save();
    }
  }
  res.status(201).send(`Categories created successfully`);
});

export default router;
