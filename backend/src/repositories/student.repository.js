import prisma from "../prisma/index.js";

class StudentRepository {

  async create(data) {
    return prisma.student.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          }
        }
      }
    });
  }

  async findById(id) {
    return prisma.student.findUnique({
      where: { id }
    });
  }

  async findAll() {
    return prisma.student.findMany();
  }

}

export default new StudentRepository();
