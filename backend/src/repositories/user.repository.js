import prisma from "../prisma/index.js";

class UserRepository {
  baseSelect() {
    return {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    };
  }

  async create(data) {
    return prisma.user.create({
      data,
      select: this.baseSelect(),
    });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    return prisma.user.findUnique({
      where: { id },
      select: this.baseSelect(),
    });
  }

  async delete(id) {
    return prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserRepository();
