import prisma from "../prisma/index.js";

class StudentActionRepository {

  async create(data) {
    return prisma.studentAction.create({
      data,
      include: {
        action: true
      }
    });
  }

  async findByStudent(studentId) {
    return prisma.studentAction.findMany({
      where: { studentId },
      include: {
        action: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

}

export default new StudentActionRepository();