import bcrypt from "bcrypt";
import studentRepository from "../repositories/student.repository.js";

class StudentService {
  async createStudent(data) {
    try {
      const { name, age, user } = data;
      const { name: userName, email, password } = user.create;

      // 1. Hash da senha
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // 2. Montar objeto já correto pro Prisma
      const student = await studentRepository.create({
        name,
        age,
        user: {
          create: {
            name: userName,
            email,
            password: passwordHash,
            role: "STUDENT",
          },
        },
      });

      // 3. Nunca devolver senha
      if (student.user?.password) {
        delete student.user.password;
      }
      return student;

    } catch (error) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        throw new Error("Email já cadastrado.");
      }
      throw error;
    }
  }
   async getAllStudents() {
    const students = await studentRepository.findAll();

    // Remover senha de todos
    return students.map(student => {
      if (student.user?.password) {
        delete student.user.password;
      }
      return student;
    });
  }

  async getStudentById(id) {
    const student = await studentRepository.findById(id);

    if (!student) return null;

    if (student.user?.password) {
      delete student.user.password;
    }

    return student;
  }

}

export default new StudentService();
