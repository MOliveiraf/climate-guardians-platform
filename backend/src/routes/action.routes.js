import { Router } from "express";
import actionController from "../controllers/action.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// Todas protegidas (catálogo interno do sistema)
router.get("/", authenticate, actionController.findAll);
router.get("/:id", authenticate, actionController.findById);

export default router;