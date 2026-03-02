export default function ActionsList({ actions, onExecute }) {
  return (
    <div>
      <h2>🌱 Environmental Actions</h2>

      {actions.map((action) => (
        <div key={action.id} style={{ marginBottom: "10px" }}>
          <strong>{action.title}</strong> (+{action.points} points)

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => onExecute(action.id)}
          >
            Execute
          </button>
        </div>
      ))}
    </div>
  );
}