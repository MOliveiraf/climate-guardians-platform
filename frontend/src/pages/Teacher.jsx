import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Teacher() {
  const navigate = useNavigate();

  const [actions, setActions] = useState([]);
  const [students, setStudents] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("POSITIVE");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(true);  

  async function fetchActions() {
    try {
      const response = await api.get("/actions");
      setActions(response.data);
    } catch (error) {
      console.error("Erro ao buscar actions:", error);
    }
  }

  async function fetchStudents() {
    try {
      const response = await api.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Erro ao buscar students:", error);
    }
  }

  useEffect(() => {
    async function load() {
      await fetchActions();
      await fetchStudents();
      setLoading(false);
    }
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();

    try {
      await api.post("/actions", {
        title,
        description,
        type,
        points: Number(points),
        imageUrl,
        audioUrl,
      });

      setTitle("");
      setDescription("");
      setType("POSITIVE");
      setPoints(0);
      setImageUrl("");
      setAudioUrl("");

      fetchActions();
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao criar action");
    }
  }

  async function handleDeleteAction(id) {
    try {
      await api.delete(`/actions/${id}`);
      fetchActions();
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao deletar action");
    }
  }

  async function handleDeleteStudent(id) {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao deletar estudante");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  if (loading) return <h2>Carregando...</h2>;

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
        <h1>👨‍🏫 Painel do Professor</h1>
        <div>
          <button onClick={() => navigate("/dashboard")} style={{ marginRight: "10px" }}>
            🔙 Dashboard
          </button>
          <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
        </div>
      </div>
      
      <h2>👩‍🎓 Lista de Estudantes</h2>
      {students.map((student) => (
        
        <div
          key={student.id}
          style={{
            border: "1px solid #342f2f",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <p><strong>Nome:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.user?.email}</p>
          <button onClick={() => handleDeleteStudent(student.id)}>
            ❌ Deletar Estudante
          </button>
        </div>
      ))}

      {/* CADASTRAR AÇÃO */}
      <h2 style={{ marginTop: "40px" }}>➕ Cadastrar Ação</h2>
      <form onSubmit={handleCreate} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Título da ação"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Pontos"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="URL da Imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="URL do Áudio"
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
          required
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="POSITIVE">POSITIVE</option>
          <option value="NEGATIVE">NEGATIVE</option>
          <option value="NEUTRAL">NEUTRAL</option>
        </select>

        <button type="submit" style={{ display: "block", marginTop: "10px" }}>
          Criar Action
        </button>
      </form>

      {/* LISTA DE ACTIONS COM SCROLL */}
      <h2>📋 Lista de Actions</h2>
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {actions.map((action) => (
          <div
            key={action.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              borderBottom: "1px solid #eee",
              paddingBottom: "5px",
            }}
          >
            <span>
              {action.title} ({action.type})
            </span>
            <button onClick={() => handleDeleteAction(action.id)}>
              🗑 Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}