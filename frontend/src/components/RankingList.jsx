export default function RankingList({ ranking }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>🏆 Global Ranking</h2>

      {ranking.map((student, index) => (
        <div key={student.studentId}>
          {index + 1}️⃣ {student.name} - {student.totalPoints} pts
        </div>
      ))}
    </div>
  );
}