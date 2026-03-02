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

  async getTotalPoints(studentId) {

  const actions = await prisma.studentAction.findMany({
    where: { studentId },
    include: {
      action: true
    }
  });

  const total = actions.reduce((sum, item) => {
    return sum + item.action.points;
  }, 0);

  return total;
}
async getRanking() {
  const ranking = await prisma.studentAction.findMany({
    include: {
      student: true,
      action: true
    }
  });

  const map = {};

  ranking.forEach((item) => {
    const studentId = item.studentId;

    if (!map[studentId]) {
      map[studentId] = {
        studentId,
        name: item.student.name,
        totalPoints: 0
      };
    }

    map[studentId].totalPoints += item.action.points;
  });

  return Object.values(map).sort((a, b) => b.totalPoints - a.totalPoints);
}


}

export default new StudentActionRepository();