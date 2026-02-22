import studentService from "../services/StudentService.js";

class StudentController {

  async create(req, res) {
    try {
      const student = await studentService.createStudent(req.body);
      return res.status(201).json(student);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const students = await studentService.getAllStudents();
      return res.status(200).json(students);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async search(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const students = await studentService.searchStudents(query);

    return res.status(200).json(students);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

  async findById(req, res) {
    try {
      const id = Number(req.params.id);      

      if (isNaN(id)) {
        return res.status(404).json({ message: "Invalid ID format" });
      }
      const student = await studentService.getStudentById(id);
      
      if(!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      return res.status(200).json(student);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async update(req, res) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const updatedStudent = await studentService.updateStudent(id, req.body);

      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }

      return res.status(200).json(updatedStudent);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const deleteStudent = await studentService.deleteStudent(id);

      if (!deleteStudent) {
        return res.status(404).json({ message: "Student not found" });
      }

      return res.status(200).json({
        message: `Student ${deleteStudent.name} deleted successfully`
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

}

export default new StudentController();