import { Router } from "express";
import actionController from "../controllers/action.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, actionController.findAll);
router.get("/:id", authenticate, actionController.findById);

export default router;