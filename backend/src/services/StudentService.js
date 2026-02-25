import bcrypt from "bcrypt";
import studentRepository from "../repositories/student.repository.js";

class StudentService {
  async createStudent(data) {
    try {
      const { name, age, user } = data;
      const { name: userName, email, password } = user.create;

      // Criar usuário através do UserService
      const createdUser = await userService.createUser({
        name: userName,
        email,
        password,
        role: "STUDENT"
      });

      // Criar student usando apenas o userId
      const student = await studentRepository.create({
        name,
        age,
        userId: createdUser.id
      });

      return student;

    } catch (error) {
      throw error;
    }
  }
  async getAllStudents() {
    const students = await studentRepository.findAll();

    // Remover senha de todos
    return students.map((student) => {
      if (student.user?.password) {
        delete student.user.password;
      }
      return student;
    });
  }
  async searchStudents(query) {
    const students = await studentRepository.search(query);

    return students.map((student) => {
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
  async updateStudent(id, data) {
    const existingStudent = await studentRepository.findById(id);

    if (!existingStudent) {
      throw new Error("Student not found.");
    }

    const updatedData = { ...data };

    // Se vier atualização de usuário
    if (data.user?.update) {
      const { password } = data.user.update;

      if (password) {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        updatedData.user.update.password = passwordHash;
      }
    }

    const updatedStudent = await studentRepository.update(id, updatedData);

    if (updatedStudent.user?.password) {
      delete updatedStudent.user.password;
    }

    return updatedStudent;
  }

  async deleteStudent(id) {
    const existingStudent = await studentRepository.findById(id);

    if (!existingStudent) {
      throw new Error("Student not found.");
    }

    return studentRepository.delete(id);
  }
}

export default new StudentService();
