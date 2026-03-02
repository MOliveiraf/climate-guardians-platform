export default function ActionHistory({ history, playAudio }) {
  function formatDate(date) {
    const d = new Date(date);

    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>📜 Your Actions History</h2>

      {history.length === 0 && <p>No actions executed yet.</p>}

      {history.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            background: "#7d6262",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src={`http://localhost:3000${item.action.imageUrl}`}
            alt={item.action.title}
            width="50"
          />

          <div style={{ fontWeight: "bold" }}>{item.action.title}</div>

          <div>⭐ +{item.action.points} pts</div>

          <div style={{ fontSize: "12px", color: "#666" }}>
            📅 {formatDate(item.createdAt)}
          </div>

          {/* 🔊 Botão para ouvir novamente */}
          {item.action.audioUrl && (
            <button
              style={{ marginLeft: "auto" }}
              onClick={() => playAudio(item.action.audioUrl)}
            >
              🔊 Hear Again
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
