import studentActionRepository from "../repositories/studentAction.repository.js";
import { calculatePlanetState } from "../utils/planetState.js";
import prisma from "../prisma/index.js";

class StudentActionService {
  async executeAction(userId, actionId) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student not found for this user.");
    }

    const action = await prisma.action.findUnique({
      where: { id: actionId },
    });

    if (!action) {
      throw new Error("Action not found.");
    }

    const studentAction = await studentActionRepository.create({
      studentId: student.id,
      actionId: action.id,
    });

    return {
      id: studentAction.id,
      executedAt: studentAction.createdAt,
      points: action.points,
      type: action.type,
      imageUrl: action.imageUrl,
      audioUrl: action.audioUrl,
    };
  }

  async getHistory(userId) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student not found.");
    }

    return studentActionRepository.findByStudent(student.id);
  }

  async getScore(userId) {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new Error("Student not found.");
    }

    const totalPoints = await studentActionRepository.getTotalPoints(
      student.id,
    );

    const planet = calculatePlanetState(totalPoints);

    return {
      studentId: student.id,
      totalPoints,
      planetState: planet.state,
      planetImage: planet.image,
    };
  }

  async getRanking() {
    return studentActionRepository.getRanking();
  }
}

export default new StudentActionService();
