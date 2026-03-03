export default function PlanetStatus({ planet }) {
  if (!planet) return null;

  return (
    <div
      style={{
        marginBottom: "40px",
        textAlign: "center",
        padding: "30px",
        background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
        borderRadius: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>🌍 Planet Status</h2>

      <img
        src={`http://localhost:3000${planet.planetImage}`}
        alt="Planet"
        style={{
          width: "280px",
          height: "280px",
          objectFit: "cover",
          borderRadius: "50%",
          boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
          transition: "transform 0.3s ease",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      />

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <p>
          <strong>State:</strong> {planet.planetState}
        </p>

        <p>
          <strong>Total Points:</strong> {planet.totalPoints}
        </p>
      </div>
    </div>
  );
}