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
      <h2>📜 Your Actions History ({history.length})</h2>

      {history.length === 0 && <p>No actions executed yet.</p>}

      {/* CONTAINER COM SCROLL */}
      <div
        style={{
          maxHeight: "350px",
          overflowY: "auto",
          paddingRight: "10px",
        }}
        className="history-scroll"
      >
        {history.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #e0e0e0",
              padding: "15px",
              borderRadius: "15px",
              marginBottom: "15px",
              background: "#f8f9fa",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              transition: "0.2s",
            }}
          >
            {item.action.imageUrl && (
              <img
                src={`http://localhost:3000${item.action.imageUrl}`}
                alt={item.action.title}
                style={{
                  width: "65px",
                  height: "65px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            )}

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                {item.action.title}
              </div>

              <div style={{ color: "#2b8a3e", fontWeight: "bold" }}>
                ⭐ +{item.action.points} pts
              </div>

              <div style={{ fontSize: "12px", color: "#666" }}>
                📅 {formatDate(item.createdAt)}
              </div>
            </div>

            {item.action.audioUrl && (
              <button
                onClick={() => playAudio(item.action.audioUrl)}
                style={{
                  background: "#4dabf7",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                🔊 Hear Again
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}