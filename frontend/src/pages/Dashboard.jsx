import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

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

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}