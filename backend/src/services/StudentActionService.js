import studentActionRepository from "../repositories/studentAction.repository.js";
import { calculatePlanetState } from "../utils/planetState.js";
import prisma from "../prisma/index.js";

class StudentActionService { 
  async executeAction(userId, actionId) {    

    // 1️⃣ Buscar student pelo userId
    const student = await prisma.student.findUnique({
      where: { userId }
    });

    if (!student) {
      throw new Error("Student not found for this user.");
    }

    // 2️⃣ Verificar se action existe
    const action = await prisma.action.findUnique({
      where: { id: actionId }
    });

    if (!action) {
      throw new Error("Action not found.");
    }

     // 3️⃣ 🚫 Verificar se já executou hoje
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const alreadyExecuted = await prisma.studentAction.findFirst({
    where: {
      studentId: student.id,
      actionId: action.id,
      createdAt: {
        gte: today
      }
    }
  });

  if (alreadyExecuted) {
    throw new Error("Action already executed today.");
  }

    // 3️⃣ Criar StudentAction
    const studentAction = await studentActionRepository.create({
      studentId: student.id,
      actionId: action.id
    });

    // 4️⃣ Retornar payload pronto para frontend
    return {
      id: studentAction.id,
      executedAt: studentAction.createdAt,
      points: action.points,
      type: action.type,
      imageUrl: action.imageUrl,
      audioUrl: action.audioUrl
    };
  }

  async getHistory(userId) {

    const student = await prisma.student.findUnique({
      where: { userId }
    });

    if (!student) {
      throw new Error("Student not found.");
    }

    return studentActionRepository.findByStudent(student.id);
  }

  async getScore(userId) {

  const student = await prisma.student.findUnique({
    where: { userId }
  });

  if (!student) {
    throw new Error("Student not found.");
  }

  const totalPoints = await studentActionRepository.getTotalPoints(student.id);

  const planet = calculatePlanetState(totalPoints);

  return {
    studentId: student.id,
    totalPoints,
    planetState: planet.state,
    planetImage: planet.image
  };
}

async getRanking() {
  return studentActionRepository.getRanking();
}

}

export default new StudentActionService();