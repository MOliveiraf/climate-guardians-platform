import { Router } from "express";
import studentController from "../controllers/student.controller.js";

const router = Router();

router.post("/", studentController.create);
router.get("/", studentController.findAll);
router.get("/:id", studentController.findById);

export default router;