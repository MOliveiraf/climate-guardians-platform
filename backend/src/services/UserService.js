import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";

class UserService {

  async createUser(data) {
    try {
      const { name, email, password, role } = data;

      // Verificar se email já existe
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error("Email already registered.");
      }

      // Hash da senha
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = await userRepository.create({
        name,
        email,
        password: passwordHash,
        role
      });

      return user;

    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    return userRepository.findByEmail(email);
  }

  async getUserById(id) {
    return userRepository.findById(id);
  }

  async deleteUser(id) {
    const existingUser = await userRepository.findById(id);

    if (!existingUser) {
      throw new Error("User not found.");
    }

    return userRepository.delete(id);
  }
}

export default new UserService();