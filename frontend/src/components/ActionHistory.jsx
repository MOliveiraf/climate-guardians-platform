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
            border: "1px solid #e0e0e0",
            padding: "15px",
            borderRadius: "15px",
            marginBottom: "15px",
            background: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >          
          
          {item.action.imageUrl && (
            <img
              src={`http://localhost:3000${item.action.imageUrl}`}
              alt={item.action.title}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          )}
          
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", fontSize: "16px" }}>
              {item.action.title}
            </div>

            <div>⭐ +{item.action.points} pts</div>

            <div style={{ fontSize: "12px", color: "#666" }}>
              📅 {formatDate(item.createdAt)}
            </div>
          </div>
          
          {item.action.audioUrl && (
            <button onClick={() => playAudio(item.action.audioUrl)}>
              🔊 Hear Again
            </button>
          )}
        </div>
      ))}
    </div>
  );
}