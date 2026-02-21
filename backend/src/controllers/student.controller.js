// import studentService from "../services/StudentService.js";

// class StudentController {
//   async create(req, res) {
//     try {
//       const student = await studentService.createStudent(req.body);
//       return res.status(201).json(student);
//     } catch (error) {
//       return res.status(400).json({ message: error.message });
//     }
//   }

//   async findAll(req, res)
// async findById(req, res)
// }

// export default new StudentController();



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

  async findById(req, res) {
    try {
      const { id } = req.params;
      const student = await studentService.getStudentById(id);

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      return res.status(200).json(student);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

}

export default new StudentController();