export default function PlanetStatus({ planet }) {
  if (!planet) return null;

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>🌍 Planet Status</h2>

      <img
        src={`http://localhost:3000${planet.planetImage}`}
        alt="Planet"
        width="200"
      />

      <p>State: {planet.planetState}</p>
      <p>Total Points: {planet.totalPoints}</p>
    </div>
  );
}