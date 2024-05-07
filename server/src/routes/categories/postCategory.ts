import { Router } from "express";
import fs from "fs";
import multer from "multer";
import Category from "../../models/category";
import Icon from "../../models/icons";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/postCategory", upload.single("icon"), async (req, res, next) => {
  const {
    title,
    iconColor,
    iconTitle,
  }: { title: string; iconColor: string; iconTitle: string } = req.body;
  const existingIcon = await Icon.findOne({ iconTitle });
  let newIcon;
  if (!existingIcon) {
    newIcon = new Icon({
      data: fs.readFileSync(req.file.path),
      title: iconTitle,
      contentType: "image/svg+xml",
    });
    await newIcon.save();
  } else {
    newIcon = existingIcon;
  }

  const newCategory = new Category({
    title,
    iconColor,
    icon: newIcon,
  });
  await newCategory.save();

  res.status(201).send(`Categories created successfully`);
});

export default router;
