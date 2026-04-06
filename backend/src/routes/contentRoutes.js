import { Router } from "express";
import {
  getAllContent,
  getSectionContent,
} from "../controllers/contentController.js";

const router = Router();

router.get("/", getAllContent);
router.get("/:section", getSectionContent);

export default router;
