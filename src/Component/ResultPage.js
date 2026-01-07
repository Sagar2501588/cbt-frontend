import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const API_BASE = "https://cbt-backend-production-8bf2.up.railway.app";


  useEffect(() => {
    const exam_id = localStorage.getItem("exam_id");
    const student_id = localStorage.getItem("student_id");

    if (!exam_id || !student_id) {
      navigate("/", { replace: true });
      return;
    }

    fetch(`${API_BASE}/calculate-marks/${exam_id}/${student_id}`)
      .then((res) => res.json())
      .then((data) => {
        setScore(data.total_marks || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Score fetch error:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🎉 Exam Completed!</h1>

      <h2>Your score is:</h2>

      {loading ? (
        <h1 style={{ color: "gray" }}>Loading...</h1>
      ) : (
        <h1 style={{ color: "green", fontSize: "80px" }}>{score}</h1>
      )}

      <button
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          fontSize: "18px",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
