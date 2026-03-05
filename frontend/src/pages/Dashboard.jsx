import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import PlanetStatus from "../components/PlanetStatus";
import RankingList from "../components/RankingList";
import ActionHistory from "../components/ActionHistory";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [actions, setActions] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const audioRef = useRef(null);

  function playAudio(url) {
    if (!url) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(`http://localhost:3000${url}`);
    audioRef.current = audio;
    audio.play();
  }

  async function fetchActions() {
    try {
      const response = await api.get("/actions");
      setActions(response.data);
    } catch (error) {
      console.error("Erro ao buscar ações:", error);
    }
  }

  async function fetchHistory() {
    try {
      const response = await api.get("/student-actions/history");
      setHistory(response.data);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
    }
  }

  async function fetchPlanet() {
    try {
      const response = await api.get("/student-actions/score");
      setPlanet(response.data);
    } catch (error) {
      console.error("Erro ao buscar estado do planeta:", error);
    }
  }

  async function fetchRanking() {
    try {
      const response = await api.get("/student-actions/ranking");
      setRanking(response.data);
    } catch (error) {
      console.error("Erro ao buscar ranking:", error);
    }
  }

  async function executeAction(actionId, audioUrl) {
    try {
      await api.post("/student-actions", { actionId });

      if (audioUrl) {
        playAudio(audioUrl);
      }

      await fetchRanking();
      await fetchPlanet();
      await fetchHistory();
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao executar ação");
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchActions();
      await fetchRanking();
      await fetchPlanet();
      await fetchHistory();
      setLoading(false);
    }

    loadData();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">

        {/* BOTÕES LADO ESQUERDO */}
        <div className="left-controls">

          {role === "TEACHER" && (
            <button
              className="teacher-button"
              onClick={() => navigate("/teacher")}
            >
              Painel do Professor
            </button>
          )}

          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>

        </div>

        {/* TÍTULO CENTRAL */}
        <h1>🌍 Climate Guardians</h1>

        {/* NOME DO USUÁRIO */}
        {role === "TEACHER" && (
          <div className="user-badge teacher">
            👨‍🏫 {user?.name} (Professor)
          </div>
        )}

        {role === "STUDENT" && (
          <div className="user-badge student">
            👤 Olá, {user?.name} (Student)
          </div>
        )}
      </div>

      {/* LAYOUT PRINCIPAL */}
      <div className="main-layout">

        {/* ESQUERDA */}
        <div className="actions-column">
          {actions
            .filter((action) => action.type !== "NEGATIVE")
            .map((action) => (
              <button
                key={action.id}
                className="action-btn"
                onClick={() => {
                  if (role === "STUDENT") {
                    executeAction(action.id, action.audioUrl);
                  }
                }}
              >
                {action.title}
              </button>
            ))}
        </div>

        {/* CENTRO */}
        <div className="planet-column">
          <PlanetStatus planet={planet} />
        </div>

        {/* DIREITA */}
        <div className="actions-column">
          {actions
            .filter((action) => action.type === "NEGATIVE")
            .map((action) => (
              <button
                key={action.id}
                className="action-btn negative"
                onClick={() => executeAction(action.id, action.audioUrl)}
              >
                {action.title}
              </button>
            ))}
        </div>
      </div>

      {/* PARTE INFERIOR */}
      <div className="bottom-grid">
        <div className="section-card">
          <h2>🏆 Liga dos Guardiões</h2>
          <RankingList ranking={ranking} />
        </div>

        <div className="section-card">
          <h2>⭐ Suas Conquistas</h2>
          <ActionHistory history={history} playAudio={playAudio} />
        </div>
      </div>

    </div>
  );
}