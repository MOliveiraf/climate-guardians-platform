import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// Público (registro)
router.post("/", userController.create);

// Protegidas
router.get("/:id", authenticate, userController.findById);
router.delete("/:id", authenticate, userController.delete);

export default router;