import { Router } from "express";
import studentController from "../controllers/student.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", studentController.create);
router.get("/", authenticate, studentController.findAll);
router.get("/search", studentController.search);
router.get("/:id", studentController.findById);
router.put("/:id", studentController.update);
router.delete("/:id", studentController.delete);

export default router;