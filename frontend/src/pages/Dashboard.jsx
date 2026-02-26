import { useEffect } from "react";
import api from "../services/api";

export default function Dashboard() {
  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await api.get("/students");
        console.log("STUDENTS:", response.data);
      } catch (error) {
        console.error("Erro ao buscar estudantes:", error);
      }
    }

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}