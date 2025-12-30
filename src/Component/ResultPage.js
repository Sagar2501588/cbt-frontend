import React from "react";
import { useNavigate } from "react-router-dom";

function ResultPage() {
  const navigate = useNavigate();
  const score = localStorage.getItem("last_score") || 0;
  const name = localStorage.getItem("student_name") || "Student";

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🎉 Exam Completed!</h1>
      <h2>{name}, your score is:</h2>
      <h1 style={{ fontSize: "60px", color: "green" }}>{score}</h1>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          fontSize: "18px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default ResultPage;
