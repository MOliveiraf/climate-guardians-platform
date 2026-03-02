import { Router } from "express";
import studentController from "../controllers/student.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", studentController.create);

router.get("/", authenticate, studentController.findAll);
router.get("/search", authenticate, studentController.search);
router.get("/:id", authenticate, studentController.findById);
router.put("/:id", authenticate, studentController.update);
router.delete("/:id", authenticate, studentController.delete);

export default router;