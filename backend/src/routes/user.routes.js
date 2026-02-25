import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/", userController.create);
router.get("/:id", userController.findById);
router.delete("/:id", userController.delete);

export default router;