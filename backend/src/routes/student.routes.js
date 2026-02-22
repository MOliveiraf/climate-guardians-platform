import { Router } from "express";
import studentController from "../controllers/student.controller.js";

const router = Router();

router.post("/", studentController.create);
router.get("/", studentController.findAll);
router.get("/search", studentController.search);
router.get("/:id", studentController.findById);
router.put("/:id", studentController.update);
router.delete("/:id", studentController.delete);

export default router;