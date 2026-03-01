import studentActionRepository from "../repositories/studentAction.repository.js";
import studentRepository from "../repositories/student.repository.js";
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

}

export default new StudentActionService();