import { Router } from "express";
import studentActionController from "../controllers/studentAction.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authenticate, studentActionController.execute);
router.get("/history", authenticate, studentActionController.history);
router.get("/score", authenticate, studentActionController.getScore);
router.get("/ranking", authenticate, studentActionController.ranking);

export default router;