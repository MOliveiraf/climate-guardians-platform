import prisma from "../prisma/index.js";

class ActionRepository {
  async findAll() {
    return prisma.action.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async findById(id) {
    return prisma.action.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return prisma.action.create({
      data,
    });
  }

  async delete(id) {
    return prisma.action.delete({
      where: { id },
    });
  }
}

export default new ActionRepository();