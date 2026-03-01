import { Router } from "express";
import studentActionController from "../controllers/studentAction.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// Executar ação
router.post("/", authenticate, studentActionController.execute);

// Histórico do aluno logado
router.get("/history", authenticate, studentActionController.history);

export default router;