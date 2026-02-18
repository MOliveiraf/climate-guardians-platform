import studentService from "./src/services/StudentService.js";

async function test() {
  const student = await studentService.createStudent({
    name: "João",
    age: 22,
    user: {
      create: {
        name: "Mike Oliveira",
        email: "mike-super@email.com",
        password: "123456"
      }
    }
  });

  console.log(student);
}

test();
