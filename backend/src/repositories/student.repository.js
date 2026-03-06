import prisma from "../prisma/index.js";
class StudentRepository {
  baseInclude() {
    return {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      },
    };
  }
  async create(data) {
    return prisma.student.create({
      data,
      include: this.baseInclude(),
    });
  }

  async findById(id) {
    return prisma.student.findUnique({
      where: { id },
      include: this.baseInclude(),
    });
  }
  async findAll() {
    return prisma.student.findMany({
      include: this.baseInclude(),
    });
  }
  async update(id, data) {
    return prisma.student.update({
      where: { id },
      data,
      include: this.baseInclude(),
    });
  }

  async delete(id) {
    return prisma.student.delete({
      where: { id },
    });
  }

  async search(query) {
    return prisma.student.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            user: {
              email: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: this.baseInclude(),
    });
  }

  async deleteStudentActions(studentId) {
    return prisma.studentAction.deleteMany({
      where: { studentId },
    });
  }

  async deleteSessions(studentId) {
    return prisma.session.deleteMany({
      where: { studentId },
    });
  }
  async deleteStudentWithRelations(studentId) {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    return prisma.$transaction([
      prisma.studentAction.deleteMany({
        where: { studentId },
      }),

      prisma.session.deleteMany({
        where: { studentId },
      }),

      prisma.student.delete({
        where: { id: studentId },
      }),

      prisma.user.delete({
        where: { id: student.userId },
      }),
    ]);
  }
}

export default new StudentRepository();
