import { Router } from "express";
import studentController from "../controllers/student.controller.js";
import { authenticate, authorizeRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", studentController.create);

router.get("/", authenticate, studentController.findAll);
router.get("/search", authenticate, studentController.search);
router.get("/:id", authenticate, studentController.findById);
router.put(
  "/:id",
  authenticate,
  authorizeRole("TEACHER"),
  studentController.update
);

router.delete(
  "/:id",
  authenticate,
  authorizeRole("TEACHER"),
  studentController.delete
);

export default router;