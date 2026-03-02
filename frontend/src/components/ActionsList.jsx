export default function ActionsList({ actions, executeAction, playAudio }) {
  const handleClick = async (actionId) => {
    const result = await executeAction(actionId);

    if (result?.audioUrl) {
      playAudio(result.audioUrl);
    }
  };

  return (
    <div>
      <h2>🌱 Environmental Actions</h2>

      {actions.map((action) => (
        <div key={action.id} style={{ marginBottom: "10px" }}>
          <strong>
            {action.title} (+{action.points} points)
          </strong>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => handleClick(action.id)}
          >
            Execute
          </button>

          {action.audioUrl && (
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => playAudio(action.audioUrl)}
            >
              🔊 Hear Again
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
