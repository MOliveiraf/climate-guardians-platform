import { Router } from "express";
import actionController from "../controllers/action.controller.js";
import {
  authenticate,
  authorizeRole,
} from "../middlewares/auth.middleware.js";

const router = Router();

// 📖 Todos autenticados podem visualizar
router.get(
  "/",
  authenticate,
  authorizeRole("TEACHER", "STUDENT"),
  actionController.findAll
);

router.get(
  "/:id",
  authenticate,
  authorizeRole("TEACHER", "STUDENT"),
  actionController.findById
);

// 🔐 Apenas TEACHER pode criar
router.post(
  "/",
  authenticate,
  authorizeRole("TEACHER"),
  actionController.create
);

// 🔐 Apenas TEACHER pode deletar
router.delete(
  "/:id",
  authenticate,
  authorizeRole("TEACHER"),
  actionController.delete
);

export default router;