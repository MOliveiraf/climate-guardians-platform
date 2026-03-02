import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import PlanetStatus from "../components/PlanetStatus";
import ActionsList from "../components/ActionsList";
import RankingList from "../components/RankingList";
import ActionHistory from "../components/ActionHistory";

export default function Dashboard() {
  const navigate = useNavigate();

  const [actions, setActions] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

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

  async function executeAction(actionId) {
    try {
      const response = await api.post("/student-actions", {
        actionId,
      });

      const result = response.data;

      alert("Ação registrada com sucesso!");

       // 🔊 tocar áudio educativo
    if (result.audioUrl) {
      const audio = new Audio(`http://localhost:3000${result.audioUrl}`);
      audio.play();
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
    <div style={{ padding: "20px" }}>
      <h1>Climate Guardians Dashboard</h1>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <PlanetStatus planet={planet} />

      <hr />

      <ActionsList
        actions={actions}
        executeAction={executeAction}
      />

      <hr />

      <RankingList ranking={ranking} />
      <hr />

<ActionHistory history={history} />
    </div>
  );
}