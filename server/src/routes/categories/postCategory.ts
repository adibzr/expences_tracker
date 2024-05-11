import { Router } from "express";
import fs from "fs";
import multer from "multer";
import Icon from "../../models/icons";
import Category from "../../models/category";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/postCategory", upload.single("icon"), async (req, res) => {
  const {
    title,
    iconColor,
    iconTitle,
    type,
  }: { title: string; iconColor: string; iconTitle: string; type: string } =
    req.body;
  const existingIcon = await Icon.findOne({ iconTitle });
  let newIcon;
  if (!existingIcon) {
    newIcon = new Icon({
      data: fs.readFileSync(req.file.path),
      title: iconTitle,
      iconColor,
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
    type,
  });
  await newCategory.save();

  res.status(201).send(`Categories created successfully`);
});

export default router;
